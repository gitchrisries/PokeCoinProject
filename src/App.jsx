import {useState} from 'react';
import {NavBar} from './components/Layout/NavBar'
import {HeaderBar} from "./components/Layout/Header";
import {
    AppShell,
    useMantineTheme,
} from '@mantine/core';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'
import Mining from "./components/Mining";
import Login from "./components/Login";
import BuyPackagePage from "./components/BuyPackagePage";
import React from "react";


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
                navbar={<NavBar opened={opened}/>}
                header={<HeaderBar opened={opened} setOpened={setOpened} theme={theme}/>}>
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