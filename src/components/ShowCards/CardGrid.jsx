import {
    Grid,
    GridItem,
    Img,
    LinkBox,
    LinkOverlay, Popover,
    PopoverArrow, PopoverBody, PopoverCloseButton,
    PopoverContent, PopoverHeader,
    PopoverTrigger,
    Text
} from "@chakra-ui/react";
import CardDetails from "./CardDetails";
import {rarityColor} from "../../helpers/globals";


function CardGrid({allCards, userCards}) {

    return (
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
            {Object.keys(allCards).map(id => {
                return <GridItem w='100%' h='100%' key={id}>
                    <Popover placement={'right-start'} preventOverflow={false} isLazy={true}>
                        <PopoverTrigger>
                            <LinkBox maxW={'240'} borderWidth={4} borderRadius='lg'
                                     borderColor={rarityColor[allCards[id].rarity]}>
                                <LinkOverlay href='javascript:void(0)'>
                                    <Img src={allCards[id].imageUrl} alt={id} borderRadius='3.8'/>
                                </LinkOverlay>
                            </LinkBox>
                        </PopoverTrigger>
                        <PopoverContent bg={'blue.900'} borderWidth={3}>
                            <PopoverArrow/>
                            <PopoverCloseButton color={'white'}/>
                            <PopoverHeader bg={'blue.500'} style={{color: 'white'}} borderTopRadius={'3.5'}>
                                Card Details
                            </PopoverHeader>
                            <PopoverBody style={{color: 'white'}}>
                                <CardDetails pokemon={allCards[id]}/>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    {userCards && id in userCards &&
                        <Text color={'white'}>{`Owned ${userCards[id]} time(s)`}</Text>}
                    {userCards && !(id in userCards) && <Text color={'red.300'}>Not owned</Text>}
                </GridItem>
            })}
        </Grid>
    )
}

export default CardGrid