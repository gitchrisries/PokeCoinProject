import React, {useEffect} from 'react'
import {useStopwatch} from 'react-timer-hook';
import {Box, Button} from '@chakra-ui/react'
import {useQuery} from "@tanstack/react-query";
import ApiClient from "../clients/pokecoin/src/ApiClient";
import CardsApi from "../clients/pokecoin/src/api/CardsApi";
import {BlockchainApi} from "../clients/pokecoin/src";


async function postNewBlock(block) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNocmlzIiwiaWF0IjoxNjcxNDQwOTgyLCJleHAiOjE2NzE1MjczODJ9.1_erFw6bSCNk8DM9rc4lC1NPhX3Fl2A5IVppQvjbVK0"

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(block)
    }

    //console.log('block:', JSON.stringify(block))

    try {
        return await fetch('http://localhost:3000/blockchain/blocks', requestOptions)
    } catch (error) {
        console.log(error)
    }
}

async function getWalletBalance() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhhbnMiLCJpYXQiOjE2NzE1NTE1MzEsImV4cCI6MTY3MTYzNzkzMX0.WILLQAh7CmWLDhMEZ-eumb8jKTFEbCacnzP7ja43Mzw"

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }

    try {
        return (await fetch('http://localhost:3000/wallet/balance', requestOptions)).json()
    } catch (error) {
        console.log(error)
    }
}

function WalletBalance() {
    const [walletBalance, setWalletBalance] = React.useState(0)

    async function getBalance() {
        let newBalance = (await getWalletBalance()).amount
        setWalletBalance(newBalance)
    }

    getBalance().catch(console.log)

    return (
        <div>Wallet Balance: {walletBalance}</div>
    )
}


let worker = null

function MiningPage() {
    const [newHash, setNewHash] = React.useState('')
    const [miningStatus, setMiningStatus] = React.useState(true)

    const {data} = useQuery(['lastBlock', newHash],
        async () => {
            const apiClient = new ApiClient("http://localhost:3000/");
            const blockchainApi = new BlockchainApi(apiClient);
            const response = await blockchainApi.blockchainLastBlockGet();
            return response
        }
    )


    async function runMining() {
        const _prevHash = data.hash
        worker.postMessage({previousHash: _prevHash, difficulty: 6})

        worker.onmessage = (message) => {
            if (!miningStatus) return
            postNewBlock(message.data.newBlock).then(() => {
                setNewHash(message.data.newHash)
            })
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
        if (miningStatus && data) {
            worker = new Worker(new URL('../helpers/worker.js', import.meta.url));
            runMining().catch(console.log)
        }
    }, [miningStatus, data])

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
                    <WalletBalance/>
                    {newHash && <p>Last hash found: {newHash}</p>}
                    {miningStatus ? <p>miningStatus: Running</p> : <p>miningStatus: Stopped</p>}
                    <Stopwatch/>
                </div>
            </Box>
            <Button colorScheme={'blue'} onClick={() => setMiningStatus(!miningStatus)}>RUN/STOP</Button>
        </div>
    );
}

export default MiningPage;
