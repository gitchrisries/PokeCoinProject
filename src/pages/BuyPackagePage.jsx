import {
    Box,
    Button,
    HStack,
    NumberDecrementStepper, NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text, useToast, VStack, Portal, Center, Grid, GridItem, Img
} from "@chakra-ui/react";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CardsApi} from "../clients/pokecoin/src";
import {_apiClient} from "../helpers/globals";
import {rarityColor} from "../helpers/globals";
import {Select} from '@mantine/core';
import {LoggedContext} from "../contexts/LoggedContext";

const cardApi = new CardsApi(_apiClient)

const CardPackSelect = ({selectedPackage, setSelectedPackage, selectData}) => {
    return (
        <Box borderRadius='lg' color='white' bg={'#1f1f1f'} borderColor={'whiteAlpha.400'}
             p={2} borderWidth='2px' marginTop={5}>
            <Select fw={600} placeholder='Pick Card Pack' data={selectData}
                    value={selectedPackage} onChange={setSelectedPackage}/>
        </Box>
    )
}

function NewCardsGrid({newCards}) {
    return (
        newCards.map((card, index) => {
            return <GridItem key={index + card.id + Date.now()}>
                <Box borderWidth={4} borderRadius='lg' borderColor={rarityColor[card.rarity]}>
                    <Img src={card.imageUrl} alt={card.id} borderRadius='3.8'/>
                </Box>
            </GridItem>
        })
    )
}

function BuyPackagePage() {
    const amount = useRef(1)
    const queryClient = useQueryClient()
    const [selectData, setSelectData] = useState([])
    const [selectedPackage, setSelectedPackage] = useState('')
    const toast = useToast()
    const [newCards, setNewCards] = useState([])
    const {loggedIn} = useContext(LoggedContext);

    const {error: packageGetError} = useQuery(['package'],
        async () => {
            return await cardApi.cardsPackagesGet()
        }, {
            onSuccess: (data) => {
                setSelectData(data.map((name) => {
                    return {value: name, label: name}
                }))
            },
            enabled: loggedIn
        }
    )

    const {data: packageCost, error: packageCostError} = useQuery(['packageCost'],
        async () => {
            return await cardApi.cardsPackagesCurrentPackageCostGet()
        }, {
            enabled: loggedIn
        }
    )

    const {mutate, isLoading} = useMutation(buyPackage, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['walletBalance']).catch(console.log)
            setNewCards(prev => prev.concat(data.cards))
            toast({
                title: 'Success',
                description: `1 package bought!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            })
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.body.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            })
        },
        enabled: loggedIn
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
                position: 'bottom-right'
            })
            return
        }
        setNewCards([])
        for (let i = 0; i < amount.current; i++) {
            mutate(selectedPackage)
        }
    }

    if (packageGetError || packageCostError) {
        return (
            <Center mt={'20vh'}>
                <Text fontWeight={'semibold'}
                      color={'white'}>{packageCostError.body.message || packageGetError.body.message}</Text>
                <Text fontWeight={'semibold'} color={'white'}>Try reloading the page</Text>
            </Center>
        )
    }

    if (!loggedIn) {
        return (
            <Center mt={'20vh'}>
                <Text fontWeight={'semibold'} color={'white'}>You need to be logged in to access this page</Text>
            </Center>
        )
    }

    return (
        <>
            <VStack spacing={'2rem'}>
                <CardPackSelect selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage}
                                selectData={selectData}/>
                <Box borderRadius='lg' borderColor={'whiteAlpha.400'} color='white' bg={'#1f1f1f'} p={2}
                     borderWidth='2px'>
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
                        <Button isLoading={isLoading} isDisabled={!selectedPackage} colorScheme={'blue'}
                                onClick={() => handleClick()}>
                            Buy Package(s)
                        </Button>
                    </HStack>
                </Box>
                {newCards.length !== 0 &&
                    <Box style={{margin: '3% 5% 0% 5%'}} padding='1%' borderWidth={2} borderColor={'whiteAlpha.400'}
                         borderRadius='lg' bg={'#1f1f1f'}>
                        <Center marginBottom='1.5%'>
                            <Text fontWeight={'bold'} color={'white'}>New Cards</Text>
                        </Center>
                        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                            <NewCardsGrid newCards={newCards}/>
                        </Grid>
                    </Box>
                }
            </VStack>
        </>
    )
}

export default BuyPackagePage