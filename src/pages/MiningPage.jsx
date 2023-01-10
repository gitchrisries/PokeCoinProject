import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    Box,
    Button,
    Center,
    HStack, NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import {_apiClient} from "../helpers/globals";
import {BlockchainApi} from "../clients/pokecoin/src";
import runningGif from "../assets/mining_running.gif";
import stoppedGif from "../assets/mining_stopped.gif";
import Stopwatch from "../components/Stopwatch";

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

const MiningInfo = React.memo(({miningStatus, newHash}) => {
    return (
        <Box bg='#1f1f1f' borderWidth='2px' borderColor='white' style={{
            textAlign: 'center',
            borderRadius: 10,
            padding: 10,
            margin: '10px 100px 10px 100px',
        }}>
            <Text color='white'>Last hash found: {newHash}</Text>
            <Text color='white'>Mining status: {miningStatus ? 'Running' : 'Stopped'}</Text>
            {miningStatus && <Text as={'span'} color={'white'}>Mining time: {<Stopwatch/>}</Text>}
        </Box>
    )
})

function MiningPage() {
    const [miningStatus, setMiningStatus] = useState(true)
    const [workerAmount, setWorkerAmount] = useState(1)
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

    const {data: lastBlock} = useQuery(['lastBlock', postedBlock, workerAmount, miningStatus],
        async () => {
            return await blockchainApi.blockchainLastBlockGet()
        }
    )

    const {data: difficulty} = useQuery(['difficulty'],
        async () => {
            return await blockchainApi.blockchainCurrentDifficultyGet()
        }
    )

    function runMining() {
        for (let i = 0; i < workerAmount; i++) {
            workerList.current[i].postMessage({previousHash: lastBlock.hash, difficulty})
            workerList.current[i].onmessage = (message) => {
                if (message.data === 'getNewLastBlock') {
                    queryClient.invalidateQueries(['lastBlock']).catch(console.error)
                    return
                }
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

    // terminate worker when component dismounts
    useEffect(() => {
        return () => workerList.current.forEach(worker => worker?.terminate())
    }, [])

    useEffect(() => {
        workerList.current.forEach(worker => worker?.terminate())
        if (miningStatus && lastBlock && difficulty) {
            for (let i = 0; i < workerAmount; i++) {
                workerList.current[i] = new Worker(new URL('../helpers/worker.js', import.meta.url))
            }
            runMining()
        }
    }, [lastBlock, difficulty])

    return (
        <>
            <Center>
                <Pikachu miningStatus={miningStatus}/>
            </Center>
            <MiningInfo miningStatus={miningStatus} setMiningStatus={setMiningStatus} newHash={newHash.current}/>
            <Center>
                <Button colorScheme={'blue'} onClick={() => setMiningStatus(!miningStatus)}>RUN/STOP</Button>
            </Center>
            <Center>
                <WorkerComp workerAmount={workerAmount} setWorkerAmount={setWorkerAmount}/>
            </Center>
        </>
    )
}

export default MiningPage