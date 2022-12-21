import { useState } from 'react';
import { TbHammer,TbCoin,TbBrandGravatar } from "react-icons/tb";
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
import logo from './images/pokecoins_lable.png'
import BuyPackagePage from "./components/BuyPackagePage";

localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNocmlzIiwiaWF0IjoxNjcxNjM1OTA0LCJleHAiOjE2NzE3MjIzMDR9.RJVvFmmTaFLepEU__KMFdMJQ7L2WzWOv5003fVXesKQ')

const apiClient = new ApiClient("http://localhost:3000/")
let token = apiClient.authentications['token']
token.apiKey = localStorage.getItem('token')
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
                                <Button style={{marginBottom: '20px', justifyContent: 'space-between'}} component={Link} variant="link" to='/mining'><TbHammer /> Mining</Button>
                                <Button style={{marginBottom: '20px'}} component={Link} variant="link" to='/buying'><TbCoin style={{color:'yellow'}}/>Buy Cards!</Button>
                                <Button style={{marginBottom: '20px'}} component={Link} variant="link" to='/login'><TbBrandGravatar style={{color:'red'}}/>Logout</Button>
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

                                <Image src={logo} alt='PokeCoins' c='white' width='150px'/>
                                <div style={{background:'green', borderRadius:'5px'}}>
                                    <Text mt='6px' fw={600}>Balance: {walletBalance?.amount}</Text>
                                </div>
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