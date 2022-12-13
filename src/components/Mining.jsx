import React, {useEffect} from 'react'
import {useStopwatch} from 'react-timer-hook';


async function getLastBlock() {
    try {
        return (await fetch('http://localhost:3000/blockchain/lastBlock')).json()
    } catch (error) {
        console.log(error)
    }
}

async function postNewBlock(block) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNocmlzIiwiaWF0IjoxNjcwODkzMDYzLCJleHAiOjE2NzA5Nzk0NjN9.vt7Dj_ADOjhQYP370AmMSEtMrkaRVouhPuPfKFZBuDo"

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(block)
    }

    console.log('block:', JSON.stringify(block))

    try {
        return await fetch('http://localhost:3000/blockchain/blocks', requestOptions)
    } catch (error) {
        console.log(error)
    }
}

async function getWalletBalance() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNocmlzIiwiaWF0IjoxNjcwODkzMDYzLCJleHAiOjE2NzA5Nzk0NjN9.vt7Dj_ADOjhQYP370AmMSEtMrkaRVouhPuPfKFZBuDo"

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

    async function runMining() {
        const _prevHash = (await getLastBlock()).hash
        worker.postMessage({previousHash: _prevHash, difficulty: 5})

        worker.onmessage = (message) => {
            if (!miningStatus) return
            postNewBlock(message.data.newBlock).then(() => {
                setNewHash(message.data.newHash)
            })
        }
    }

    const startMining = async () => {
        await runMining()
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
        if (miningStatus) {
            worker = new Worker(new URL('../helpers/worker.js', import.meta.url));
            startMining().catch(console.log)
        }
    }, [worker, miningStatus])

    function MyStopwatch() {
        const {seconds} = useStopwatch({autoStart: true});

        return (
            <div style={{fontSize: '20px', marginBottom: 5}}>
                Last hash {miningStatus && seconds}s ago
            </div>
        )
    }

    return (
        <div style={{textAlign: 'center'}}>
            <div style={{
                textAlign: 'center',
                borderRadius: 10,
                backgroundColor: 'gray',
                padding: 10,
                margin: '100px 500px 10px 500px'
            }}>
                <WalletBalance/>
                {newHash && <p>New hash found: {newHash}</p>}
                {miningStatus ? <p>miningStatus: True</p> : <p>miningStatus: False</p>}
                <MyStopwatch/>
            </div>
            <div>
                <button onClick={() => setMiningStatus(!miningStatus)}>RUN/STOP</button>
            </div>
        </div>
    );
}

export default MiningPage;
