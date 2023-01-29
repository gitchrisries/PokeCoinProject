import {_apiClient} from "../helpers/globals";
import {CardsApi} from "../clients/pokecoin/src";
import {useQuery} from "@tanstack/react-query";
import React, {useContext, useRef, useState} from "react";
import {Tabs, Tab, HStack, TabList, Spacer, Box, Spinner, Center, Text} from "@chakra-ui/react"
import CardGrid from "../components/ShowCards/CardGrid";
import {LoggedContext} from "../contexts/LoggedContext";

const cardApi = new CardsApi(_apiClient)

function ShowCardsPage() {
    const [userCardsCountDict, setUserCardsCountDict] = useState(null)
    const [allCards, setAllCards] = useState({})
    const [tabIndex, setTabIndex] = useState(0)
    const [allCardsLoading, setAllCardsLoading] = useState(true)
    const pageNumber = useRef(0)
    const {loggedIn} = useContext(LoggedContext);

    const {isLoading: userCardsLoading, error: userCardsError} = useQuery(['userCards'],
        async () => {
            return await cardApi.cardsUsercardsGet();
        }, {
            onSuccess: (data) => {
                const temp = {}
                data.forEach((obj) => {
                    temp[obj.cardId] = (temp[obj.cardId] || 0) + 1
                })
                setUserCardsCountDict(temp)
            },
            enabled: loggedIn
        }
    )

    const {error: allCardsError} = useQuery(['allCards', pageNumber.current],
        async () => {
            return await cardApi.cardsGet({page: pageNumber.current});
        }, {
            onSuccess: (data) => {
                if (data.cards.length === 0) {
                    setAllCardsLoading(false)
                    return
                }
                const temp = {}
                data.cards.forEach((card) => {
                    temp[card.id] = card;
                });
                setAllCards({...allCards, ...temp})
                pageNumber.current += 1
            },
            enabled: loggedIn
        }
    )

    if (!loggedIn) {
        return (
            <Center mt={'20vh'}>
                <Text fontWeight={'semibold'} color={'white'}>You need to be logged in to access this page</Text>
            </Center>
        )
    }

    if (allCardsError || userCardsError) {
        return (
            <Center mt={'20vh'}>
                <Text fontWeight={'semibold'}
                      color={'white'}>{allCardsError.body.message || userCardsError.body.message}</Text>
                <Text fontWeight={'semibold'} color={'white'}>Try reloading the page</Text>
            </Center>
        )
    }

    if (allCardsLoading || userCardsLoading) {
        return (
            <Center mt={'37vh'}>
                <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
            </Center>
        )
    }

    return (
        <div style={{margin: '10px 60px 60px 60px', position: 'relative'}}>
            {userCardsCountDict && allCards &&
                <Tabs variant='soft-rounded' colorScheme='blue' onChange={(index) => setTabIndex(index)}>
                    <HStack style={{margin: '0% 0% 2% 4%'}}>
                        <TabList gap={1}>
                            {["All Cards", "My Cards", "Rare Cards", "Uncommon Cards", "Common Cards"].map((tab, index) => (
                                <Tab key={index} _hover={{bg: 'blue.100', color: '#20252f'}}
                                     color={'whiteAlpha.700'}>{tab}</Tab>
                            ))}
                        </TabList>
                        <Spacer/>
                        <Box padding='3px' width='200px' bg='blue.700' borderWidth='2px' borderColor='whiteAlpha.400'
                             style={{textAlign: 'center', borderRadius: 6, color: 'white'}}>
                            Owned Cards: <b>{Object.keys(userCardsCountDict).length}/{Object.keys(allCards).length}</b>
                        </Box>
                    </HStack>
                    <div style={{margin: '4%'}}>
                        {tabIndex === 0 &&
                            <CardGrid allCards={allCards} userCards={userCardsCountDict}
                                      filtered={Object.keys(allCards)}/>
                        }
                        {tabIndex === 1 &&
                            <CardGrid userCards={userCardsCountDict} allCards={allCards}
                                      filtered={Object.keys(allCards).filter(id => id in userCardsCountDict)}/>
                        }
                        {tabIndex === 2 &&
                            <CardGrid userCards={userCardsCountDict} allCards={allCards}
                                      filtered={Object.keys(allCards).filter(id => allCards[id].rarity === 'Rare')}/>
                        }
                        {tabIndex === 3 &&
                            <CardGrid userCards={userCardsCountDict} allCards={allCards}
                                      filtered={Object.keys(allCards).filter(id => allCards[id].rarity === 'Uncommon')}/>
                        }
                        {tabIndex === 4 &&
                            <CardGrid userCards={userCardsCountDict} allCards={allCards}
                                      filtered={Object.keys(allCards).filter(id => allCards[id].rarity === 'Common')}/>
                        }
                    </div>
                </Tabs>
            }
        </div>
    )
}

export default ShowCardsPage;