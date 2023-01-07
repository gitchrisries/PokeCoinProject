import {useStopwatch} from "react-timer-hook";
import {Box, Text} from "@chakra-ui/react";
import React from 'react';


const MiningInfo = React.memo(({miningStatus, newHash}) => {
    function Stopwatch() {
        const {minutes, seconds} = useStopwatch({autoStart: true})
        return (
            miningStatus && <Text color='white'>Mining time: {minutes}:{(seconds < 10) && '0'}{seconds}</Text>
        )
    }

    return (
        <Box bg='#1f1f1f' borderWidth='2px' borderColor='white' style={{
            textAlign: 'center',
            borderRadius: 10,
            padding: 10,
            margin: '10px 100px 10px 100px',
        }}>
            <Text color='white'>Last hash found: {newHash}</Text>
            <Text color='white'>miningStatus: {miningStatus ? 'Running' : 'Stopped'}</Text>
            <Stopwatch/>
        </Box>
    )
})

export default MiningInfo