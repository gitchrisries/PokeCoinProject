import SHA256 from 'crypto-js/sha256';

const calculateHash = (block) => {
    const information = (
        block.previousHash +
        block.timestamp.toString() +
        block.data +
        block.nonce.toString()
    )
    return SHA256(information).toString()
}

onmessage = ({data: {previousHash, difficulty}}) => {
    let timestamp = Date.now()
    let newBlock = ''
    let newHash = ''

    for (let nonce = 0; nonce <= Number.MAX_SAFE_INTEGER; nonce++) {
        newBlock = {
            previousHash,
            timestamp,
            data: (Math.random() + 1).toString(36).substring(7),
            nonce
        }

        if (nonce === 200000) {
            postMessage('getNewLastBlock')
            return
        }

        newHash = calculateHash(newBlock)
        if (newHash.startsWith(Array(difficulty).fill(0).join(''))) {
            postMessage({newBlock, newHash})
            return
        }

    }
}
