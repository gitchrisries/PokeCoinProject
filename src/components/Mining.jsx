import React, {useEffect} from 'react'

async function getPreviousHash() {
    try {
        const response = await fetch('http://localhost:3000/blockchain/lastBlock')
        return await response.json()
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
        const response = await fetch('http://localhost:3000/blockchain/blocks', requestOptions)
        return response
    } catch (error) {
        console.log(error)
    }
}


let worker = null

function Mining() {
    const [newHash, setNewHash] = React.useState('')
    worker?.terminate()
    worker = new Worker(new URL('../helpers/worker.js', import.meta.url));

    async function runMining(prevHash) {
        worker.onmessage = async (message) => {
            let time = (new Date()).toLocaleTimeString()
            console.log(`New Hash found: (${time}) `, message.data.newHash)
            const prom = new Promise(async (resolve, reject) => {
                postNewBlock(message.data.newBlock).then(
                    (response) => {
                        resolve(response)
                    },
                    (error) => {
                        reject(error)
                    },
                )
            });
            await prom
            setNewHash(message.data.newHash)
        }
        worker.postMessage({previousHash: prevHash, difficulty: 5})
    }

    const startMining = async () => {
        const _prevHash = await getPreviousHash().then(json => json.hash)
        runMining(_prevHash).catch(console.log)
    }

    useEffect(() => {
        startMining().catch(console.log)
    },[worker])


    return (
        <div>
            <p>New Hash found: {newHash}</p>
        </div>
    )
}

function MiningPage() {
    return (
        <div className="App"
             style={{textAlign: 'center', borderRadius: 10, backgroundColor: 'gray', padding: 2, margin: 5}}>
            {Mining()}
        </div>
    );
}

export default MiningPage;
