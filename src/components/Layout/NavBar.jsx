import {Button, Navbar} from "@mantine/core";
import {Link, useLocation} from "react-router-dom";
import {TbCoin, TbHammer} from "react-icons/tb";
import React, {useEffect, useState} from "react";

export const NavBar = (opened) => {
    const location = useLocation();
    const [activeButton, setActiveButton] = useState(null)

    useEffect(() => {
        const pathname = location.pathname;

        if (pathname === '/mining') {
            setActiveButton('button1')
        } else if (pathname === '/buying') {
            setActiveButton('button2')
        } else if (pathname === '/cards') {
            setActiveButton('button3')
        }
    }, [location]);


    return (
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 150, lg: 200}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button bg={activeButton === 'button1' ? 'blue' : 'transparent'}
                        style={{marginBottom: '20px', justifyContent: 'space-between'}}
                        onClick={() => setActiveButton('button1')} component={Link}
                        variant="link" to='/mining'><TbHammer/>Mining</Button>
                <Button bg={activeButton === 'button2' ? 'blue' : 'transparent'}
                        _hover={{bg: 'gray'}} _active={{bg: 'gray'}} _focus={{bg: 'gray'}}
                        style={{marginBottom: '20px'}} component={Link}
                        variant="link" to='/buying' onClick={() => setActiveButton('button2')}><TbCoin
                    style={{color: 'yellow'}}/>Buy Cards</Button>
                <Button bg={activeButton === 'button3' ? 'g' : 'transparent'}
                        _hover={{bg: 'gray'}} _active={{bg: 'gray'}} _focus={{bg: 'gray'}}
                        style={{marginBottom: '20px'}} component={Link}
                        variant="link" to='/cards' onClick={() => setActiveButton('button3')}>Show Cards</Button>
            </div>
        </Navbar>
    )
}