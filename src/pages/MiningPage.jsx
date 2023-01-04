import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Button, Center, Text} from "@chakra-ui/react";
import {useContext, useEffect, useRef, useState} from "react";
import _apiClient from "../helpers/globals";
import Pikachu from "../components/Mining/Pikachu";
import MiningInfo from "../components/Mining/MiningInfo";
import WorkerComp from "../components/Mining/WorkerComp";
import {BlockchainApi} from "../clients/pokecoin/src";

const blockchainApi = new BlockchainApi(_apiClient)

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

    function runMining() {
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
    }, [miningStatus, lastBlock, workerAmount, difficulty])

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