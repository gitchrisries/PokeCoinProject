import {
    Box,
    Button,
    HStack,
    NumberDecrementStepper, NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text, useToast, VStack
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CardsApi} from "../clients/pokecoin/src";
import _apiClient from "../helpers/globals";
import {Select} from '@mantine/core';

const cardApi = new CardsApi(_apiClient)

function BuyPackagePage() {
    const amount = useRef(1)
    const queryClient = useQueryClient()
    const [selectData, setSelectData] = useState([])
    const [selectedPackage, setSelectedPackage] = useState('')
    const toast = useToast()

    useQuery(['package'],
        async () => {
            return await cardApi.cardsPackagesGet()
        }, {
            onSuccess: (data) => {
                setSelectData(data.map((name) => {
                    return {value: name, label: name}
                }))
            }
        }
    )

    const {data: packageCost} = useQuery(['packageCost'],
        async () => {
            return await cardApi.cardsPackagesCurrentPackageCostGet()
        }
    )

    const {mutate} = useMutation(buyPackage, {
        onSuccess: () => {
            queryClient.invalidateQueries(['walletBalance']).catch(console.log)
            toast({
                title: 'Success',
                description: `1 package bought!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        },
        onError: () => {
            toast({
                title: 'Error',
                description: `Error buying package(s)`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    })

    async function buyPackage(packageName) {
        return await cardApi.cardsPackagesCardPackNameBuyDefaultPackageGet(packageName)
    }

    function handleClick() {
        if ((amount.current * packageCost) > localStorage.getItem('walletBalance')) {
            toast({
                title: 'Could not buy package(s)',
                description: `Not enough Coins!`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        for (let i = 0; i < amount.current; i++) {
            mutate(selectedPackage)
        }
    }

    return (
        <VStack spacing={30}>
            <Box borderRadius='lg' color='white' bg='#224173FF' p={2} borderWidth='2px' marginTop={5}>
                <Select style={{color: 'white', fontWeight: 'bold'}} placeholder='Pick Card Pack' data={selectData}
                        value={selectedPackage} onChange={setSelectedPackage}/>
            </Box>
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
                    <Button colorScheme={'blue'} onClick={() => handleClick()}>
                        Buy Package(s)
                    </Button>
                </HStack>
            </Box>
        </VStack>
    )
}

export default BuyPackagePage