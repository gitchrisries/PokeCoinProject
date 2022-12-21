import {
    Box,
    Button,
    HStack,
    NumberDecrementStepper, NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper, ScaleFade,
    Text, useDisclosure, VStack
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ApiClient from "../clients/pokecoin/src/ApiClient";
import {CardsApi} from "../clients/pokecoin/src";


const apiClient = new ApiClient("http://localhost:3000/")
let token = apiClient.authentications['token']
token.apiKey = localStorage.getItem('token')

const cardApi = new CardsApi(apiClient)


function BuyPackagePage() {
    const amount = useRef(1)
    const message = {success: `Success! ${amount.current} Package(s) bought.`, error: 'Failed. Not enough Coins.'}
    const queryClient = useQueryClient()
    const {isOpen, onToggle} = useDisclosure()
    const [isError ,setIsError] = useState(false)

    //Nur einmal?
    const {data: availablePackages} = useQuery(['package'],
        async () => {
            return await cardApi.cardsPackagesGet() //Array
        })

    //Error catchen?
    const {mutate} = useMutation(buyPackage, {
        onSuccess: () => {
            queryClient.invalidateQueries(['walletBalance']).catch(console.log)
            setIsError(false)
            onToggle()
        },
        onError: () => {
            onToggle()
        }
    })

    async function buyPackage(packageName) {
        return await cardApi.cardsPackagesCardPackNameBuyDefaultPackageGet(packageName)
    }

    function handleClick() {
        if ((amount.current * 25) > localStorage.getItem('walletBalance')) {
            setIsError(true)
            onToggle()
            return
        }
        for (let i = 0; i < amount.current; i++) {
            mutate(availablePackages[0])
        }
    }

    useEffect(() => {
        if (isOpen) {
            let timer1 = setTimeout(() => onToggle(), 1000)

            return () => {
                clearTimeout(timer1)
            };
        }
    }, [isOpen])


    return (
        <>
            <VStack spacing={100}>
                <Box borderRadius='lg' color='white' bg='#224173FF' p={2} borderWidth='2px'>
                    <HStack>
                        <Text color='whitesmoke' fontWeight='bold'>Amount</Text>
                        <NumberInput focusInputOnChange={false} defaultValue={1} min={1} max={10} width='20'
                                     onChange={(value) => amount.current = value}>
                            <NumberInputField borderWidth='3px' bg='gray' color='whitesmoke'>
                            </NumberInputField>
                            <NumberInputStepper>
                                <NumberIncrementStepper/>
                                <NumberDecrementStepper/>
                            </NumberInputStepper>
                        </NumberInput>
                        <Button isDisabled={isOpen} colorScheme={'blue'} onClick={() => handleClick()}>Buy
                            Package(s)</Button>
                    </HStack>
                </Box>
                <ScaleFade initialScale={0.9} in={isOpen} transition={{enter: {duration: 0.6}, exit: {duration: 0.4}}}>
                    <Box borderRadius='lg' color='white' bg= {isError ? 'red' : 'teal'} p={2} borderWidth='2px'>
                        <Text fontWeight='bold'>{isError ? message.error : message.success}</Text>
                    </Box>
                </ScaleFade>
            </VStack>
        </>
    )
}

export default BuyPackagePage