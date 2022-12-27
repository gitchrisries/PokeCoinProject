import _apiClient from "../helpers/globals";
import {CardsApi} from "../clients/pokecoin/src";
import {useQueries, useQuery, useQueryClient} from "@tanstack/react-query";
import React,{useState} from "react";
import {Grid,GridItem,Text} from "@chakra-ui/react"

const cardApi = new CardsApi(_apiClient)

function UserCards() {
    const [uniqueUserCards, setUniqueUserCards] = useState(null)
    const allCards = React.useRef({})

    const {data: userCards} = useQuery(['userCards'],
        async () => {
            return await cardApi.cardsUsercardsGet();
        }, {
            onSuccess: () => {
                const _cardCountDict = {}
                userCards?.forEach((obj) => {
                    _cardCountDict[obj.cardId] = (_cardCountDict[obj.cardId] || 0) + 1
                })
                setUniqueUserCards(_cardCountDict)
            }
        }
    )

    //Was ist daran besser als mehrere useQuery?
    //Sollen wir davon ausgehen, dass wir die Pageanzahl wissen?
    const allCardsQueries = useQueries({
        queries: [
            {
                queryKey: ['cards', 0], queryFn: async () => {
                    const response = await cardApi.cardsGet({page:0})
                    response.cards.forEach(card => allCards.current[card.id] = card)
                    return response
                }
            },
            {
                queryKey: ['cards', 1], queryFn: async () => {
                    const response = await cardApi.cardsGet({page:1})
                    response.cards.forEach(card => allCards.current[card.id] = card)
                    return response
                }
            },
            {
                queryKey: ['cards', 2], queryFn: async () => {
                    const response = await cardApi.cardsGet({page:2})
                    response.cards.forEach(card => allCards.current[card.id] = card)
                    return response
                }
            }
        ]
    })

    return (
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
            {uniqueUserCards && allCardsQueries.every(resp => resp.status === 'success') &&
                Object.entries(uniqueUserCards).map((entry) => {
                    //entry[0] = cardId, entry[1] = amount
                    return <GridItem w='100%' h='100%' key={entry[0]}>
                        <img src={allCards.current[entry[0]].imageUrl} alt={entry[0]}/>
                        <Text color={'white'}>{allCards.current[entry[0]].name}</Text>
                        <Text color={'white'}>Amount: {entry[1]}</Text>
                    </GridItem>
                })}
        </Grid>
    );
}

export default UserCards;