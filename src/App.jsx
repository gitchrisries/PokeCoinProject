import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
} from '@mantine/core';
import {ApiClient, WalletApi} from "./clients/pokecoin/src";
import {useQuery} from "@tanstack/react-query";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes
} from 'react-router-dom'
import Mining from "./components/Mining";
import Login from "./components/Login";
import BuyPackagePage from "./components/BuyPackagePage";

const apiClient = new ApiClient("http://localhost:3000/")
let token = apiClient.authentications['token']
token.apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhhbnMiLCJpYXQiOjE2NzE1NTE1MzEsImV4cCI6MTY3MTYzNzkzMX0.WILLQAh7CmWLDhMEZ-eumb8jKTFEbCacnzP7ja43Mzw'
const walletApi = new WalletApi(apiClient)

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
        <div>
        <Router>
            <AppShell
                styles={{
                    main: {
                        background: theme.colorScheme === 'light' ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                navbar={
                    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 150, lg: 200 }}>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <Text style={{paddingBottom: '20px'}} c='white' align='center' component={Link} variant="link" to='/mining'>Mining</Text>
                            <Text style={{paddingBottom: '20px'}} c='white' align='center' component={Link} variant="link" to='/buying'>Buy Cards!</Text>
                            <Text style={{paddingBottom: '20px'}} c='white' align='center' component={Link} variant="link" to='/login'>Logout</Text>
                        </div>
                    </Navbar>
                }

                header={
                    <Header height={{ base: 50, md: 70 }} p="md">
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                />
                            </MediaQuery>

                            <Text c='white'>PokeCoins</Text>
                            <Text c='white'>Balance: {walletBalance?.amount} Coins</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        </div>
                    </Header>
                }
            >
                <Routes>
                    <Route path='/mining' element={<Mining/>}/>
                    <Route path='/buying' element={<BuyPackagePage/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>

            </AppShell>
        </Router>
            <Mining/>
        </div>
    );
}

export default App