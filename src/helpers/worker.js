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
    let nonce = 0
    let timestamp = Date.now()
    const max = Number.MAX_SAFE_INTEGER
    let newBlock = ''
    let newHash = ''

    //console.log('Previous Hash in Worker: ',previousHash)

    while (nonce <= max) {
        nonce++

        newBlock = {
            previousHash,
            timestamp,
            data: 'ABC',
            nonce
        }

        if (nonce === max) {
            nonce = 0
            timestamp = Date.now()
        }

        newHash = calculateHash(newBlock)

        if (newHash.startsWith(Array(difficulty).fill(0).join(''))) {
            postMessage({newBlock, newHash})
            return
        }
    }
}