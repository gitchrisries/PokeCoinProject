import {useState} from 'react';
import {
    AppShell,
    useMantineTheme,
} from '@mantine/core';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'

import {NavBar} from "./components/Layout/NavBar";

import BuyPackagePage from "./pages/BuyPackagePage";
import React from "react";
import ShowCardsPage from "./pages/ShowCardsPage";
import MiningPage from "./pages/MiningPage";
import LoginModal from "./components/LoginModal";
import {HeaderBar} from "./components/Layout/Header";


function App() {


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
                    <NavBar opened={opened}/>
                }

                header={
                    <HeaderBar opened={opened} setOpened={setOpened} theme={theme}/>
                }>
                <Routes>
                    <Route path='/mining' element={<MiningPage/>}/>
                    <Route path='/buying' element={<BuyPackagePage/>}/>
                    <Route path='/cards' element={<ShowCardsPage/>}/>
                    <Route path='/login' element={<LoginModal/>}/>
                </Routes>
            </AppShell>
        </Router>
    );
}

export default App