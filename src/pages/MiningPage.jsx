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
    Text, useToast
} from "@chakra-ui/react";
import React, {memo, useContext, useEffect, useRef, useState} from "react";
import {_apiClient} from "../helpers/globals";
import {BlockchainApi} from "../clients/pokecoin/src";
import runningGif from "../assets/mining_running.gif";
import stoppedGif from "../assets/mining_stopped.gif";
import Stopwatch from "../components/Stopwatch";
import {LoggedContext} from "../contexts/LoggedContext";

const blockchainApi = new BlockchainApi(_apiClient)
const maxThreads = window.navigator.hardwareConcurrency

const WorkerComp = memo(({workerAmount, setWorkerAmount}) => {
    const [workerNumber, setWorkerNumber] = React.useState(1)

    return (
        <Box width='200px' bg='#1f1f1f' borderWidth='2px' marginTop={3}
             borderColor={'whiteAlpha.400'} borderRadius='10' padding={'3'}>
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

const Pikachu = memo(({miningStatus}) => {
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

const MiningInfo = memo(({miningStatus, lastBlock, lastSuccess}) => {
    return (
        <Box bg='#1f1f1f' borderWidth='2px' borderColor={'whiteAlpha.400'} style={{
            textAlign: 'center',
            borderRadius: 10,
            padding: '10px 0px 10px 0px',
            margin: '10px 100px 10px 100px',
        }}>
            {miningStatus &&
                <>
                    {lastSuccess ? <Text color={'#00cc51'} fontWeight={'semibold'}>Last block successfully mined
                            at {lastSuccess}</Text>
                        : <Text color={'#ffffff'} fontWeight={'semibold'}>No block mined yet</Text>
                    }
                    <Box bg={'#464646'} mt={'1.5vh'} p={'5px'}>
                        <Text color='white'>Last hash: {lastBlock?.hash}</Text>
                        <Text color='white'>Found by user {lastBlock?.foundByUser.username}</Text>
                    </Box>
                </>
            }
            <Text mt={lastBlock && miningStatus && '1.5vh'} color='white'>Mining
                status: {miningStatus ? 'Running' : 'Stopped'}</Text>
            {miningStatus && <Text as={'span'} color={'white'}>Mining time: {<Stopwatch/>}</Text>}
        </Box>
    )
})

function MiningPage() {
    const [miningStatus, setMiningStatus] = useState(true)
    const [workerAmount, setWorkerAmount] = useState(1)
    const queryClient = useQueryClient()
    const toast = useToast()
    const lastSuccess = useRef('')
    const workerList = useRef(Array(workerAmount).fill(null))
    const {loggedIn} = useContext(LoggedContext);

    const {data: postedBlock, mutate} = useMutation(postBlock, {
        onSuccess: () => {
            lastSuccess.current = (new Date()).toLocaleTimeString()
            queryClient.refetchQueries(['walletBalance']).catch(console.error)
            toast(
                {
                    title: 'Success',
                    description: 'New block mined',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                }
            )
        }, onError: () => {
            toast(
                {
                    title: 'Error',
                    description: 'Ups, posted block not valid. Maybe you were too slow?',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                }
            )
        },
        enabled: loggedIn
    })

    async function postBlock(block) {
        if (miningStatus) return await blockchainApi.blockchainBlocksPost({body: block})
    }

    const {data: lastBlock, error: lastBlockError} = useQuery(['lastBlock', postedBlock, workerAmount, miningStatus],
        async () => {
            return await blockchainApi.blockchainLastBlockGet()
        }, {
            enabled: loggedIn
        }
    )

    const {data: difficulty, error: difficultyError} = useQuery(['difficulty'],
        async () => {
            return await blockchainApi.blockchainCurrentDifficultyGet()
        }, {
            enabled: loggedIn
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
        if (miningStatus && lastBlock && difficulty && loggedIn) {
            for (let i = 0; i < workerAmount; i++) {
                workerList.current[i] = new Worker(new URL('../helpers/worker.js', import.meta.url))
            }
            runMining()
        }
    }, [lastBlock, difficulty, loggedIn])

    if (difficultyError || lastBlockError) {
        return (
            <Center mt={'20vh'}>
                <Text fontWeight={'semibold'} color={'white'}>{difficultyError?.body.message || lastBlockError?.body.message}</Text>
                <Text fontWeight={'semibold'} color={'white'}>Try reloading the page</Text>
            </Center>
        )
    }

    if (!loggedIn) {
        return (
            <Center mt={'20vh'}>
                <Text fontWeight={'semibold'} color={'white'}>You need to be logged in to access this page</Text>
            </Center>
        )
    }

    return (
        <>
            <Center>
                <Pikachu miningStatus={miningStatus}/>
            </Center>
            <MiningInfo miningStatus={miningStatus} lastSuccess={lastSuccess.current} lastBlock={lastBlock}/>
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