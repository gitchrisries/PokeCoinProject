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
import React, {useEffect, useRef, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CardsApi} from "../clients/pokecoin/src";
import {_apiClient} from "../helpers/globals";
import {rarityColor} from "../helpers/globals";
import {Select} from '@mantine/core';

const cardApi = new CardsApi(_apiClient)

const CardPackSelect = ({selectedPackage, setSelectedPackage, selectData}) => {
    return (
        <Box borderRadius='lg' color='white' bg='#224173FF' p={2} borderWidth='2px' marginTop={5}>
            <Select style={{color: 'white', fontWeight: 'bold'}} placeholder='Pick Card Pack' data={selectData}
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
        onError: () => {
            toast({
                title: 'Error',
                description: `Error buying package(s)`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
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
                position: 'bottom-right'
            })
            return
        }
        setNewCards([])
        for (let i = 0; i < amount.current; i++) {
            mutate(selectedPackage)
        }
    }

    return (
        <>
            <VStack spacing={'2rem'}>
                <CardPackSelect selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage}
                                selectData={selectData}/>
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
                        <Button isDisabled={!selectedPackage} colorScheme={'blue'} onClick={() => handleClick()}>
                            Buy Package(s)
                        </Button>
                    </HStack>
                </Box>
                {newCards.length !== 0 &&
                    <Box style={{margin: '3% 5% 0% 5%'}} padding='1%' borderWidth={2} borderColor={'white'}
                         borderRadius='lg'>
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