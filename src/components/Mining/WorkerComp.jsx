import {
    Box, Button,
    Center,
    HStack, NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text
} from "@chakra-ui/react";
import React from 'react';

const maxThreads = window.navigator.hardwareConcurrency

const WorkerComp = React.memo(({workerAmount, setWorkerAmount}) => {
    const [workerNumber, setWorkerNumber] = React.useState(1)

    return (
        <Box width='200px' bg='#1f1f1f' borderWidth='2px' marginTop={3}
             borderColor='white' borderRadius='10' padding={'3'}>
            <Text marginBottom='5' color='white'>Set Amount of Workers</Text>
            <Center>
                <HStack paddingBottom={'2'}>
                    <NumberInput focusInputOnChange={false} defaultValue={workerAmount} min={1} max={maxThreads}
                                 width='20'
                                 onChange={(value) => setWorkerNumber(value)}>
                        <NumberInputField borderWidth='3px' bg='gray' color='white'>
                        </NumberInputField>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                    <Button colorScheme='blue' isDisabled={workerNumber === workerAmount}
                            onClick={() => setWorkerAmount(workerNumber)}>Apply</Button>
                </HStack>
            </Center>
        </Box>
    )
})

export default WorkerComp