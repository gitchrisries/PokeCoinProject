import {Box} from "@chakra-ui/react";
import runningGif from "../../assets/mining_running.gif";
import stoppedGif from "../../assets/mining_stopped.gif";
import React from 'react';

const Pikachu = React.memo(({miningStatus}) => {
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

export default Pikachu