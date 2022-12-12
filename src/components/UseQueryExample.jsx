import { useQuery } from "@tanstack/react-query";
import CardsApi from "../clients/pokecoin/src/api/CardsApi";
import ApiClient from "../clients/pokecoin/src/ApiClient";

function UseQueryExample() {
    const { isLoading, isError, error, data } = useQuery(
        ["cards"],
        async () => {
            const apiClient = new ApiClient("https://webeng.mi.hs-rm.de");
            const cardsApi = new CardsApi(apiClient);
            const response = await cardsApi.cardsGet();
            return JSON.parse(response.text);
        },
        { refetchOnWindowFocus: false }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        console.log(error);
        return <div>error</div>;
    }

    return (
        <div>
            {data.cards && data.cards.map((card) => <p key={card.id}>{card.name}</p>)}
        </div>
    );
}

export default UseQueryExample;
