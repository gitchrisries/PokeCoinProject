import {useStopwatch} from "react-timer-hook";
import {Text} from "@chakra-ui/react";
import React from 'react';

function Stopwatch() {
    const {minutes, seconds} = useStopwatch({autoStart: true})
    return (
        <Text as={'span'} color='white'>{minutes}:{(seconds < 10) && '0'}{seconds}</Text>
    )
}

export default Stopwatch