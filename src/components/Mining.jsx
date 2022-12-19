import React, {useEffect} from 'react'
import {useStopwatch} from 'react-timer-hook';
import {Box, Button} from '@chakra-ui/react'
import {useMutation, useQuery} from "@tanstack/react-query";
import ApiClient from "../clients/pokecoin/src/ApiClient";
import {BlockchainApi, WalletApi} from "../clients/pokecoin/src";


const apiClient = new ApiClient("http://localhost:3000/")
let token = apiClient.authentications['token']
token.apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNocmlzIiwiaWF0IjoxNjcxNDU3NTE0LCJleHAiOjE2NzE1NDM5MTR9.dj1wDmDgBlLV9UwfeKdz_g7_zABhSL0kMGF3kRAquuQ'

const blockchainApi = new BlockchainApi(apiClient);
const walletApi = new WalletApi(apiClient);

let worker = null

function MiningPage() {
    const [miningStatus, setMiningStatus] = React.useState(true)

    const {data: postedBlock, mutate} = useMutation(postNewBlock)
    async function postNewBlock (block) {
        return await blockchainApi.blockchainBlocksPost({body: block})
    }

    const {data: lastBlock} = useQuery(['lastBlock', postedBlock],
        async () => {
            return await blockchainApi.blockchainLastBlockGet();
        }
    )

    useQuery(['walletBalance', postedBlock],
        async () => {
            const response = await walletApi.walletBalanceGet()
            localStorage.setItem('walletBalance', response.amount)
            return response
        }
    )

    async function runMining() {
        const _prevHash = lastBlock.hash
        worker.postMessage({previousHash: _prevHash, difficulty: 4})

        worker.onmessage = (message) => {
            if (!miningStatus) return
            localStorage.setItem('newHash', message.data.newHash)
            mutate(message.data.newBlock)
        }
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            setMiningStatus(false)
        } else {
            setMiningStatus(true)
        }
    });

    useEffect(() => {
        worker?.terminate()
        if (miningStatus && lastBlock) {
            worker = new Worker(new URL('../helpers/worker.js', import.meta.url));
            runMining().catch(console.log)
        }
    }, [miningStatus, lastBlock])

    function Stopwatch() {
        const {seconds} = useStopwatch({autoStart: true});

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
                margin: '100px 400px 10px 400px'
            }}>
                <div>
                    Wallet Balance: {localStorage.getItem('walletBalance')}
                    {<p>Last hash found: {localStorage.getItem('newHash')}</p>}
                    {miningStatus ? <p>miningStatus: Running</p> : <p>miningStatus: Stopped</p>}
                    <Stopwatch/>
                </div>
            </Box>
            <Button colorScheme={'blue'} onClick={() => setMiningStatus(!miningStatus)}>RUN/STOP</Button>
        </div>
    );
}

export default MiningPage;
