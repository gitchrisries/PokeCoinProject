import {
    Grid,
    GridItem,
    Img,
    LinkBox,
    LinkOverlay, Popover,
    PopoverArrow, PopoverBody, PopoverCloseButton,
    PopoverContent, PopoverHeader,
    PopoverTrigger,
    Text, Skeleton, Center, Spinner, Box
} from "@chakra-ui/react";
import CardDetails from "./CardDetails";
import {rarityColor} from "../../helpers/globals";
import {useEffect, useRef, useState} from "react";
import fallBack from "../../assets/card_placeholder.jpg"


function GridSkeleton({allCards, userCards, id}) {
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <Skeleton maxW={'230px'} borderRadius='lg' startColor={"#1b2944"} endColor={"#ffffff"} isLoaded={imgLoaded}>
            <GridItem w={'100%'} h={'100%'}>
                <Popover placement={'right-start'} preventOverflow={false} isLazy={true}>
                    <PopoverTrigger>
                        <LinkBox maxW={'230px'} borderWidth={4} borderRadius='lg'
                                 borderColor={rarityColor[allCards[id].rarity]}>
                            <LinkOverlay href='javascript:void(0)'>
                                <Img loading={'lazy'} fallback={fallBack}
                                     onLoad={() => setImgLoaded(true)} src={allCards[id].imageUrl} alt={id}
                                     borderRadius='3.8'/>
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
        </Skeleton>
    )
}

function CardGrid({allCards, userCards, filtered}) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (isLoading ?
            <Center marginTop={250}>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Center> :
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {filtered.map(id => {
                    return <GridSkeleton key={id} id={id} userCards={userCards} allCards={allCards}/>
                })}
            </Grid>
    )
}

export default CardGrid