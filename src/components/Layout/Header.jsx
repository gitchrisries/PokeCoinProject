import {Burger, Header, Image, MediaQuery, Text, Box} from "@mantine/core";
import logo from "../../images/pokecoins_lable.png";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {WalletApi} from "../../clients/pokecoin/src";
import _apiClient from "../../helpers/globals";

const walletApi = new WalletApi(_apiClient)


export const HeaderBar=(props)=>{
    const {data: walletBalance} = useQuery(['walletBalance'],
        async () => {
            const response = await walletApi.walletBalanceGet()
            localStorage.setItem('walletBalance', response.amount)
            return response
        }
    )

    return(
        <Header height={{base: 70, md: 70}} p="lg">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                    <Burger
                        opened={props.opened}
                        onClick={() => props.setOpened((o) => !o)}
                        size="sm"
                        color={props.theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>

                <Image src={logo} alt='PokeCoins' c='white' width='150px'/>
                <Box width='200px' bg='#0398fc' style={{
                    textAlign: 'center',
                    borderRadius: 6,
                    paddingTop: 1,
                    marginLeft: 10
                }}>
                    <Text color='white' mt='6px' fw={600}>Wallet Balance: {walletBalance?.amount}</Text>
                </Box>
            </div>
            <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
            </div>
        </Header>
    )
}
