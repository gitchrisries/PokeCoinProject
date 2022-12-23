import {useState} from 'react';
import {TbHammer, TbCoin, TbBrandGravatar} from "react-icons/tb";
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme, Image,
    Button
} from '@mantine/core';
import {WalletApi} from "./clients/pokecoin/src";
import {useQuery} from "@tanstack/react-query";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes
} from 'react-router-dom'
import Mining from "./components/Mining";
import Login from "./components/Login";
import logo from './images/pokecoins_lable.png'
import BuyPackagePage from "./components/BuyPackagePage";
import React from "react";
import _apiClient from "./helpers/globals";
import {Box} from "@chakra-ui/react";

const walletApi = new WalletApi(_apiClient)

function App() {
    const {data: walletBalance} = useQuery(['walletBalance'],
        async () => {
            const response = await walletApi.walletBalanceGet()
            localStorage.setItem('walletBalance', response.amount)
            return response
        }
    )

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <Router>
            <AppShell
                styles={{
                    main: {
                        background: theme.colorScheme === 'dark' ? '#20252f' : theme.colors.gray[0],
                    },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                navbar={
                    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 150, lg: 200}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Button style={{marginBottom: '20px', justifyContent: 'space-between'}} component={Link}
                                    variant="link" to='/mining'><TbHammer/> Mining</Button>
                            <Button style={{marginBottom: '20px'}} component={Link} variant="link" to='/buying'><TbCoin
                                style={{color: 'yellow'}}/>Buy Cards!</Button>
                            <Button style={{marginBottom: '20px'}} component={Link} variant="link"
                                    to='/login'><TbBrandGravatar style={{color: 'red'}}/>Logout</Button>
                        </div>
                    </Navbar>
                }

                header={
                    <Header height={{base: 50, md: 70}} p="md">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
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
                }>
                <Routes>
                    <Route path='/mining' element={<Mining/>}/>
                    <Route path='/buying' element={<BuyPackagePage/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </AppShell>
        </Router>
    );
}

export default App