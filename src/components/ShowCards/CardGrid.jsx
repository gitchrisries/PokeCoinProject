import {Grid, GridItem, Text} from "@chakra-ui/react";


function CardGrid ({allCards}) {

    return (
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
            {Object.keys(allCards).map(id => {
                    return <GridItem w='100%' h='100%' key={id}>
                        <img src={allCards[id].imageUrl} alt={id}/>
                        <Text color={'white'}>{allCards[id].name}</Text>
                    </GridItem>
                })}
        </Grid>
    )
}

export default CardGrid