import {Text} from "@chakra-ui/react"

function CardDetails({pokemon}) {
    return (
        <div style={{maxHeight: '315px', overflowY: 'scroll', paddingRight: '10px'}}>
            {Object.keys(pokemon).map((key) => {
                if (key === 'attacks') {
                    return (
                        <div key={key + pokemon.id}>
                            <Text fontSize={'12'} fontWeight={'bold'}>Attacks</Text>
                            <hr style={{border: '0', borderTop: '2px solid white', margin: '2px 0px 2px 0px'}}/>
                            {pokemon[key].map((attack) => {
                                return (
                                    <>
                                        <Text fontSize={'10'} fontWeight={'bold'}>{attack.name}</Text>
                                        <Text fontSize={'10'} as={'span'}>cost: </Text>
                                        {attack.cost.map(cost => {
                                            return <Text fontSize={'10'} as={'span'}>{cost}, </Text>
                                        })}
                                        <Text fontSize={'10'}>Converted Energy Cost: {attack.convertedEnergyCost}</Text>
                                        <Text fontSize={'10'}>Damage: {attack.damage}</Text>
                                        <Text fontSize={'10'}>Text: {attack.text}</Text>
                                    </>
                                )
                            })}
                            <hr style={{border: '0', borderTop: '2px solid white', margin: '2px 0px 2px 0px'}}/>
                        </div>
                    )
                } else if (key === 'ability') {
                    return (
                        <div key={key + pokemon.id}>
                            <Text fontSize={'12'} fontWeight={'bold'}>Ability</Text>
                            <hr style={{border: '0', borderTop: '2px solid white', margin: '2px 0px 2px 0px'}}/>
                            <Text fontSize={'10'}>Name: {pokemon[key].name}</Text>
                            <Text fontSize={'10'}>Text: {pokemon[key].text}</Text>
                            <Text fontSize={'10'}>Type: {pokemon[key].type}</Text>
                            <hr style={{border: '0', borderTop: '2px solid white', margin: '2px 0px 2px 0px'}}/>
                        </div>
                    )
                } else if (key === 'retreatCost') {
                    return (
                        <div key={key + pokemon.id}>
                            <Text as={'span'} fontSize={'12'} fontWeight={'bold'}>Retreat Cost: </Text>
                            {pokemon[key].map(cost => {
                                return <Text as={'span'} fontSize={'10'}>{cost}, </Text>
                            })}
                            <br/>
                        </div>
                    )
                } else if (key === 'types') {
                    return (
                        <div key={key + pokemon.id}>
                            <Text as={'span'} fontSize={'12'} fontWeight={'bold'}>Types: </Text>
                            {pokemon[key].map(type => {
                                return <Text as={'span'} fontSize={'10'}>{type}, </Text>
                            })}
                            <hr style={{border: '0', borderTop: '2px solid white', margin: '2px 0px 2px 0px'}}/>
                        </div>
                    )
                } else if (key === 'weaknesses') {
                    return (
                        <div key={key + pokemon.id}>
                            <Text fontSize={''} fontWeight={'bold'}>Weaknesses</Text>
                            <hr style={{border: '0', borderTop: '2px solid white', margin: '2px 0px 2px 0px'}}/>
                            {pokemon[key].map(weakness => {
                                return (
                                    <>
                                        <Text fontSize={'10'}>Type: {weakness.type} ({weakness.value})</Text>
                                    </>
                                )
                            })}
                            <hr style={{border: '0', borderTop: '2px solid white', margin: '2px 0px 2px 0px'}}/>
                        </div>
                    )
                } else {
                    let infoName = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
                    return <Text key={key + pokemon.id} fontSize={'12'}><b>{infoName}:</b> {pokemon[key]}</Text>
                }
            })
            }
        </div>
    )
}
export default CardDetails