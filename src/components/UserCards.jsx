import _apiClient from "../helpers/globals";
import {CardsApi} from "../clients/pokecoin/src";
import {useQueries, useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {Flex, Table, Tr, Td, Tbody} from "@chakra-ui/react"

const cardApi = new CardsApi(_apiClient)

function CardRow({cardId, name}) {
    return (
        <Tr color={'white'}>
            <Td>{cardId}</Td>
            <Td>{name}</Td>
        </Tr>
    );
}

function UserCards() {
    const [userCards, setUserCards] = useState([])
    const queryClient = useQueryClient()

    const {isLoading, error, data} = useQuery(['usercards'],
        async () => {
            const response = await cardApi.cardsUsercardsGet();
            setUserCards(response.map((card) => {
                return {cardId: card.cardId}
            }))
            //console.log(response);
            return response;
        })

    const cardQueries = useQueries({
        queries: userCards.map(card => {
            return {
                queryKey: ['cardById', card.cardId],
                queryFn: () => async() => {
                    const response = await cardApi.cardsCardIdGet(card.cardId);
                    console.log(response)
                    return response;
                }
            }
        })
    });

    console.log(cardQueries)

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <Flex direction="column" w="100%">
            <Table>
                <Tbody>
                    {userCards.map((row) => {
                        return (
                            <CardRow
                                cardId={row.cardId}
                                key={row.cardId}
                                name={row.name}
                            />
                        )
                    })}</Tbody>
            </Table>
        </Flex>
    );
}

export default UserCards;