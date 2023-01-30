import {Burger, Header, Image, MediaQuery, Text, Box, Flex} from "@mantine/core";
import logo from "../../assets/pokecoins_lable.png";
import React from "react";
import {LoggedContext} from "../../contexts/LoggedContext";
import {useQuery} from "@tanstack/react-query";
import {WalletApi} from "../../clients/pokecoin/src";
import {_apiClient, feedbackStr} from "../../helpers/globals";
import UserFunctions from "../UserManagement/UserFunctions";

const walletApi = new WalletApi(_apiClient)


export const HeaderBar = (props) => {
    const {loggedIn} = React.useContext(LoggedContext);

    const {data: walletBalance, error: walletBalanceError, isLoading} = useQuery(['walletBalance'],
        async () => {
            const response = await walletApi.walletBalanceGet()
            localStorage.setItem('walletBalance', response.amount)
            return response
        }, {
            enabled: loggedIn || false
        }
    )

    return (
        <Header height={{base: 70, md: 70}} p="md">
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                    <Burger
                        opened={props.opened}
                        onClick={() => props.setOpened((o) => !o)}
                        size="sm"
                        color={props.theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>

                <Image style={{justifySelf: 'flex-start', marginRight: 'auto'}} src={logo} alt='PokeCoins' c='white'
                       width='150px'/>
                {loggedIn &&
                    <Flex pl={'0.8vw'} pr={'0.8vw'} style={{marginLeft: 'auto'}}>
                        <Text style={{margin: 'auto'}} fw={600} color='white'>
                            {isLoading && 'Loading...'}</Text>
                        <Text style={{margin: 'auto'}} fw={600} color='white'>
                            {walletBalanceError && walletBalanceError?.body?.message || feedbackStr.unknownError}</Text>
                        <Text style={{margin: 'auto'}} fw={600} color='white'>
                            {walletBalance && `Wallet Balance: ${walletBalance.amount}`}</Text>
                    </Flex>
                }
                <Box ml={'1vw'}><UserFunctions/></Box>
            </div>
            <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
            </div>
        </Header>
    )
}