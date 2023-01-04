import _apiClient from "../helpers/globals";
import {CardsApi} from "../clients/pokecoin/src";
import {useQueries, useQuery, useQueryClient} from "@tanstack/react-query";
import React,{useState} from "react";
import {Tabs, Tab, HStack, TabList, Spacer, Box} from "@chakra-ui/react"
import CardGrid from "../components/ShowCards/CardGrid";

const cardApi = new CardsApi(_apiClient)

function ShowCardsPage() {
    const [userCardsCountDict, setUserCardsCountDict] = useState(null)
    const [allCards, setAllCards] = useState(null)

    useQuery(['userCards'],
        async () => {
            return await cardApi.cardsUsercardsGet();
        }, {
            onSuccess: (data) => {
                const temp = {}
                data.forEach((obj) => {
                    temp[obj.cardId] = (temp[obj.cardId] || 0) + 1
                })
                setUserCardsCountDict(temp)
            }
        }
    )

    //Was ist daran besser als mehrere useQuery?
    //Sollen wir davon ausgehen, dass wir die Pageanzahl wissen?
    const allCardsQueries = useQueries({
        queries: [
            {
                queryKey: ['cards', 0], queryFn: async () => {
                    return await cardApi.cardsGet({page: 0})
                }
            },
            {
                queryKey: ['cards', 1], queryFn: async () => {
                    return await cardApi.cardsGet({page: 1})
                }
            },
            {
                queryKey: ['cards', 2], queryFn: async () => {
                    return await cardApi.cardsGet({page: 2})
                }
            }
        ]
    })

    if (allCardsQueries.every(resp => !resp.isLoading) && !allCards) {
        const _allCards = {}
        allCardsQueries.forEach(resp => resp.data.cards.forEach((card => _allCards[card.id] = card)))
        setAllCards(_allCards)
    }

    return (
            <div style={{margin: '10px 60px 60px 60px', position: 'relative'}}>
                {userCardsCountDict && allCards &&
                    <Tabs variant='soft-rounded' colorScheme='blue'>
                        <HStack style={{margin: '0% 0% 2% 4%'}}>
                            <TabList gap={1}>
                                <Tab>All Cards</Tab>
                            </TabList>
                            <Spacer/>
                            <Box padding='3px' width='200px' bg='#0398fc' style={{
                                textAlign: 'center',
                                borderRadius: 6,
                                color: 'white'
                            }}>
                                Owned Cards: {Object.keys(userCardsCountDict).length}/{Object.keys(allCards).length}
                            </Box>
                        </HStack>
                        <div style={{margin: '4%'}}>
                                <CardGrid allCards={allCards} userCards={userCardsCountDict}
                                          filtered={Object.keys(allCards)}/>

                        </div>
                    </Tabs>
                }
            </div>
    )
}

export default ShowCardsPage;