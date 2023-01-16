import {_apiClient} from "../helpers/globals";
import {CardsApi} from "../clients/pokecoin/src";
import {useQuery} from "@tanstack/react-query";
import React, {useEffect, useState} from "react";
import {Tabs, Tab, HStack, TabList, Spacer, Box, Text, Button, Spinner} from "@chakra-ui/react"
import CardGrid from "../components/ShowCards/CardGrid";
import InfiniteScroll from "react-infinite-scroll-component";

const cardApi = new CardsApi(_apiClient)

function ShowCardsPage() {
    const [tabIndex, setTabIndex] = useState(0)
    const [userCardsCountDict, setUserCardsCountDict] = useState(null);
    const [allCards, setAllCards] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);


    useQuery(['userCards'],
        async () => {
            return await cardApi.cardsUsercardsGet();
        }, {
            onSuccess: (data) => {
                const temp = {};
                data.forEach((obj) => {
                    temp[obj.cardId] = (temp[obj.cardId] || 0) + 1;
                });
                setUserCardsCountDict(temp);
            }
        }
    );

    useEffect(()=>{
        fetchMoreCards();
    },[]);



    const fetchMoreCards = () => {
        setTimeout(async () => {
            const resp = await cardApi.cardsGet({page: currentPage})
            const _allCards={}
            resp.cards.forEach((card) => {
                _allCards[card.id] = card;
            });
            let combined = {};
            setAllCards(Object.assign(combined,allCards,_allCards))
            setCurrentPage(prevPage => prevPage + 1);
            if (resp.cards.length === 0) {
                setHasMore(false);
            }
        },1500)}

    return (
        <div style={{margin: '10px 60px 60px 60px', position: 'relative'}}>
            {userCardsCountDict && allCards &&
                <Tabs variant='soft-rounded' colorScheme='blue' onChange={(index) => setTabIndex(index)}>
                    <HStack style={{margin: '0% 0% 2% 4%'}}>
                        <TabList gap={1}>
                            <Tab>All Cards</Tab>
                            <Tab>My Cards</Tab>
                            <Tab>Rare Cards</Tab>
                            <Tab>Uncommon Cards</Tab>
                            <Tab>Common Cards</Tab>
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


                    <InfiniteScroll
                        dataLength={Object.keys(allCards).length}
                        hasMore={hasMore}
                        next={fetchMoreCards}
                        loader={<Spinner iscentered='true' color='white'/>}
                    >
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
                    </InfiniteScroll>


                </Tabs>
            }
        </div>
    )
}

export default ShowCardsPage