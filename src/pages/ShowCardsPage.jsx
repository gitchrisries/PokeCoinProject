import {_apiClient} from "../helpers/globals";
import {CardsApi} from "../clients/pokecoin/src";
import {useQuery} from "@tanstack/react-query";
import React, {useEffect, useState} from "react";
import {Tabs, Tab, HStack, TabList, Spacer, Box, Text} from "@chakra-ui/react"
import CardGrid from "../components/ShowCards/CardGrid";
import InfiniteScroll from "react-infinite-scroll-component";

const cardApi = new CardsApi(_apiClient)

function ShowCardsPage() {
    const [tabIndex, setTabIndex] = useState(0)
    const [userCardsCountDict, setUserCardsCountDict] = useState(null);
    const [allCards, setAllCards] = useState([]);
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

 
/*    const fetchMoreCards = () => {
            console.log("Test")
            setTimeout(async ()=> {
            const _allCards = {};
            const resp = await cardApi.cardsGet({page: currentPage})
            resp.data.cards.forEach((card) => {
                _allCards[card.id] = card;
            });
            setAllCards(lastCards => [...lastCards, ..._allCards]);
            setCurrentPage(prevPage => prevPage + 1);
            if (resp.data.cards.length === 0) {
                setHasMore(false);
            }

        }, 1000);
    }*/

    const fetchMoreCards = async() => {
        console.log("Test")
        /*setTimeout(async ()=> {*/
            // const _allCards = {};
            // const resp = await cardApi.cardsGet({page: currentPage}).then(()=> {
            //     resp.cards.forEach((card) => {
            //         _allCards[card.id] = card;
            //     });
            //     setAllCards(_allCards);
            //     console.log(resp.cards)
            //     setCurrentPage(currentPage + 1);
            //     if (resp.cards.length === 0) {
            //         setHasMore(false);
            //     }
            // })
       /* }, 1000);*/
    }

/*    const Fetcher = () => {
        setTimeout(async ()=>{
            const _allCards = {}
            const resp = await cardApi.cardsGet({page:currentPage})
            resp.cards.forEach((card) => {
                _allCards[card.id] = card;
                setCurrentPage(currentPage+1)
            })
                setAllCards([...allCards, _allCards])
                if(resp.cards.length===0) return;
                console.log(allCards)
        },1000)


    }*/






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
                                next={fetchMoreCards}
                                hasMore={hasMore}
                                loader={<Text color='white'>Loading...</Text>}
                            >


                       {allCards.map(card=>{
                           <Text color='white'>{card}</Text>
                       })}

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