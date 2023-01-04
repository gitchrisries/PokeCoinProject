import {Text} from "@chakra-ui/react"

function CardDetails({pokemon}) {
    //TODO: parse details
    return (
        <Text>{JSON.stringify(pokemon)}</Text>
    )
}
export default CardDetails