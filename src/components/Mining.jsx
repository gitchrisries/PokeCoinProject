import React, {useEffect, useRef} from 'react'
import {useStopwatch} from 'react-timer-hook';
import {Box, Button, Center, Text} from '@chakra-ui/react'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {BlockchainApi} from "../clients/pokecoin/src";
import _apiClient from "../helpers/globals";
import runningGif from '../images/mining_running.gif'
import stoppedGif from '../images/mining_stopped.gif'

const blockchainApi = new BlockchainApi(_apiClient)

function MiningPage() {
    const [miningStatus, setMiningStatus] = React.useState(true)
    const queryClient = useQueryClient()
    const newHash = useRef('')
    const [workerAmount, setWorkerAmount] = React.useState(8)
    const workers = useRef([])

    for (let i = 0; i < workerAmount; i++) {
        workers.current.push(null)
    }

    const {data: postedBlock, mutate} = useMutation(postBlock,
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['walletBalance']).catch(console.log)
            }
        })

    async function postBlock(block) {
        if (miningStatus) return await blockchainApi.blockchainBlocksPost({body: block})
    }

    const {data: lastBlock} = useQuery(['lastBlock', postedBlock],
        async () => {
            return await blockchainApi.blockchainLastBlockGet();
        }
    )

    //TODO: Get Difficulty
    async function runMining() {
        for (let i = 0; i < workerAmount; i++) {
            workers.current[i].postMessage({previousHash: lastBlock.hash, difficulty: 6, string: `${i}abc${i}`})
            workers.current[i].onmessage = (message) => {
                newHash.current = message.data.newHash
                mutate(message.data.newBlock)
            }
        }
    }

    // document.addEventListener('visibilitychange', function () {
    //     if (document.hidden) {
    //         setMiningStatus(false)
    //     } else {
    //         setMiningStatus(true)
    //     }
    // })

    //terminate worker when component dismounts
    useEffect(() => {
        return () => {
            for (let i = 0; i < workerAmount; i++) {
                workers.current[i]?.terminate()
            }
        }
    }, [])

    useEffect(() => {
        for (let i = 0; i < workerAmount; i++) {
            workers.current[i]?.terminate()
        }
        if (miningStatus && lastBlock) {
            for (let i = 0; i < workerAmount; i++) {
                workers.current[i] = new Worker(new URL('../helpers/worker.js', import.meta.url))
            }
            runMining().catch(console.log)
        }
    }, [miningStatus, lastBlock])

    function Stopwatch() {
        const {minutes, seconds} = useStopwatch({autoStart: true})
        return (
            miningStatus && <Text color='white'>Mining time: {minutes}:{(seconds < 10) && '0'}{seconds}</Text>
        )
    }

    return (
        <div style={{textAlign: 'center'}}>
            <Center>
                <Box borderColor='#1f1f1f' borderWidth='2px' width={200} bg='white' style={{
                    textAlign: 'center',
                    borderRadius: 10,
                    padding: '10px 10px 10px 12px',
                    margin: '10px 100px 5px 100px'
                }}>
                    <img src={miningStatus ? runningGif : stoppedGif}
                         alt={miningStatus ? 'miningRunning' : 'miningStopped'}/>
                </Box>
            </Center>
            <Box bg='#1f1f1f' borderWidth='2px' borderColor='white' style={{
                textAlign: 'center',
                borderRadius: 10,
                padding: 10,
                margin: '10px 100px 10px 100px'
            }}>
                <Text color='white'>Last hash found: {newHash.current}</Text>
                <Text color='white'>{miningStatus ? <p>miningStatus: Running</p> : <p>miningStatus: Stopped</p>}</Text>
                <Stopwatch/>
            </Box>
            <Button colorScheme={'blue'} onClick={() => setMiningStatus(!miningStatus)}>RUN/STOP</Button>
        </div>
    );
}

export default MiningPage;
