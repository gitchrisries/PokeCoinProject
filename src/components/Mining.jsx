import React, {useEffect, useRef} from 'react'
import {useStopwatch} from 'react-timer-hook';
import {
    Box,
    Button,
    Center, HStack, NumberDecrementStepper,
    NumberIncrementStepper, NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from '@chakra-ui/react'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {BlockchainApi} from "../clients/pokecoin/src";
import _apiClient from "../helpers/globals";
import runningGif from '../images/mining_running.gif'
import stoppedGif from '../images/mining_stopped.gif'

const blockchainApi = new BlockchainApi(_apiClient)
const maxThreads = window.navigator.hardwareConcurrency

const WorkerComp = React.memo(({workerAmount, setWorkerAmount}) => {
    const [workerNumber, setWorkerNumber] = React.useState(1)

    return (
        <Box width='200px' bg='#1f1f1f' borderWidth='2px' marginTop={3}
             borderColor='white' borderRadius='10' padding={'3'}>
            <Text marginBottom='5' color='white'>Set Amount of Workers</Text>
            <Center>
                <HStack paddingBottom={'2'}>
                    <NumberInput focusInputOnChange={false} defaultValue={workerAmount} min={1} max={maxThreads}
                                 width='20'
                                 onChange={(value) => setWorkerNumber(value)}>
                        <NumberInputField borderWidth='3px' bg='gray' color='white'>
                        </NumberInputField>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                    <Button colorScheme='blue' isDisabled={workerNumber === workerAmount}
                            onClick={() => setWorkerAmount(workerNumber)}>Apply</Button>
                </HStack>
            </Center>
        </Box>
    )
})

const Pikachu = React.memo(({miningStatus}) => {
    return (
        <Box borderColor='#1f1f1f' borderWidth='2px' width={200} bg='white' style={{
            textAlign: 'center',
            borderRadius: 10,
            padding: '10px 10px 10px 12px',
            margin: '10px 100px 5px 100px'
        }}>
            <img src={miningStatus ? runningGif : stoppedGif}
                 alt={miningStatus ? 'miningRunning' : 'miningStopped'}/>
        </Box>
    )
})

const MiningInfo = React.memo(({miningStatus, setMiningStatus, newHash}) => {

    function Stopwatch() {
        const {minutes, seconds} = useStopwatch({autoStart: true})
        return (
            miningStatus && <Text color='white'>Mining time: {minutes}:{(seconds < 10) && '0'}{seconds}</Text>
        )
    }

    return (
        <>
            <Box bg='#1f1f1f' borderWidth='2px' borderColor='white' style={{
                textAlign: 'center',
                borderRadius: 10,
                padding: 10,
                margin: '10px 100px 10px 100px',
            }}>
                <Text color='white'>Last hash found: {newHash}</Text>
                <Text color='white'>miningStatus: {miningStatus ? 'Running' : 'Stopped'}</Text>
                <Stopwatch/>
            </Box>
            <Center>
                <Button colorScheme={'blue'} onClick={() => setMiningStatus(!miningStatus)}>RUN/STOP</Button>
            </Center>
        </>
    )
})

function MiningPage() {
    const [miningStatus, setMiningStatus] = React.useState(true)
    const [workerAmount, setWorkerAmount] = React.useState(1)
    const queryClient = useQueryClient()
    const newHash = useRef('')
    const workerList = useRef(Array(workerAmount).fill(null))

    const {data: postedBlock, mutate} = useMutation(postBlock, {
        onSuccess: () => {
            queryClient.invalidateQueries(['walletBalance']).catch(console.log)
        }
    })

    async function postBlock(block) {
        if (miningStatus) return await blockchainApi.blockchainBlocksPost({body: block})
    }

    const {data: lastBlock} = useQuery(['lastBlock', postedBlock],
        async () => {
            return await blockchainApi.blockchainLastBlockGet()
        }
    )

    const {data: difficulty} = useQuery(['difficulty'],
        async () => {
            return await blockchainApi.blockchainCurrentDifficultyGet()
        }
    )

    async function runMining() {
        for (let i = 0; i < workerAmount; i++) {
            workerList.current[i].postMessage({previousHash: lastBlock.hash, difficulty})
            workerList.current[i].onmessage = (message) => {
                newHash.current = message.data.newHash
                mutate(message.data.newBlock)
            }
        }
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            setMiningStatus(false)
        } else {
            setMiningStatus(true)
        }
    })

    //terminate worker when component dismounts
    useEffect(() => {
        return () => workerList.current.forEach(worker => worker?.terminate())
    }, [])

    useEffect(() => {
        workerList.current.forEach(worker => worker?.terminate())
        if (miningStatus && lastBlock && difficulty) {
            for (let i = 0; i < workerAmount; i++) {
                workerList.current[i] = new Worker(new URL('../helpers/worker.js', import.meta.url))
            }
            runMining().catch(console.log)
        }
    }, [miningStatus, lastBlock, workerAmount, difficulty])

    return (
        <>
            <Center>
                <Pikachu miningStatus={miningStatus}/>
            </Center>
            <MiningInfo miningStatus={miningStatus} setMiningStatus={setMiningStatus} newHash={newHash.current}/>
            <Center>
                <WorkerComp workerAmount={workerAmount} setWorkerAmount={setWorkerAmount}/>
            </Center>
        </>
    )
}

export default MiningPage