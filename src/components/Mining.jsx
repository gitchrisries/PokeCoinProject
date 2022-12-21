import React, {useEffect, useRef} from 'react'
import {useStopwatch} from 'react-timer-hook';
import {Box, Button} from '@chakra-ui/react'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {BlockchainApi} from "../clients/pokecoin/src";
import _apiClient from "../helpers/globals";

const blockchainApi = new BlockchainApi(_apiClient)
let worker = null

function MiningPage() {
    const [miningStatus, setMiningStatus] = React.useState(true)
    const queryClient = useQueryClient()
    //Updated manchmal nicht nach tab-wechsel ??
    const newHash = useRef('')

    const {data: postedBlock, mutate} = useMutation(postBlock,
        {onSuccess: () => {
        queryClient.invalidateQueries(['walletBalance']).catch(console.log)
    }})

    async function postBlock(block) {
        if (miningStatus) return await blockchainApi.blockchainBlocksPost({body: block})
    }

    const {data: lastBlock} = useQuery(['lastBlock', postedBlock],
        async () => {
            return await blockchainApi.blockchainLastBlockGet();
        }
    )

    async function runMining() {
        worker.postMessage({previousHash: lastBlock.hash, difficulty: 4})

        worker.onmessage = (message) => {
            newHash.current = message.data.newHash
            mutate(message.data.newBlock)
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
        return () => worker?.terminate()
    }, [])

    useEffect(() => {
        worker?.terminate()
        if (miningStatus && lastBlock) {
            worker = new Worker(new URL('../helpers/worker.js', import.meta.url));
            runMining().catch(console.log)
        }
    }, [miningStatus, lastBlock])

    function Stopwatch() {
        const {seconds} = useStopwatch({autoStart: true});
        //TODO: Resettet nach 60 sec
        return (
            <div style={{fontSize: '20px', marginBottom: 5}}>
                Mining time: {miningStatus && seconds + 's'}
            </div>
        )
    }

    return (
        <div style={{textAlign: 'center'}}>
            <Box bg={'lightgray'} border='4px' borderColor='darkgray' style={{
                textAlign: 'center',
                borderRadius: 10,
                padding: 10,
                margin: '0px 400px 10px 400px'
            }}>
                <div>
                    {<p>Last hash found: {newHash.current}</p>}
                    {miningStatus ? <p>miningStatus: Running</p> : <p>miningStatus: Stopped</p>}
                    <Stopwatch/>
                </div>
            </Box>
            <Button colorScheme={'blue'} onClick={() => setMiningStatus(!miningStatus)}>RUN/STOP</Button>
        </div>
    );
}

export default MiningPage;
