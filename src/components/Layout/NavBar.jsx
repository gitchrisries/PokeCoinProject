import {Button, Navbar} from "@mantine/core";
import {Link, useLocation} from "react-router-dom";
import { TbCoin, TbHammer} from "react-icons/tb";
import React, {useEffect, useState} from "react";

export const NavBar=(opened)=>{
    const location = useLocation();
    const [activeButton, setActiveButton] = useState(null)

    useEffect(() => {
        const pathname = location.pathname;

        if(pathname === '/mining'){
            setActiveButton('button1')
        }else if(pathname === '/buying'){
            setActiveButton('button2')
        }else if(pathname === '/cards'){
            setActiveButton('button3')
        }

    }, [location]);


    return(
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 150, lg: 200}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button disabled={activeButton==='button1'} style={{marginBottom: '20px', justifyContent: 'space-between'}} onClick={()=> setActiveButton('button1')} component={Link}
                        variant="link" to='/mining'><TbHammer/> Mining</Button>
                <Button disabled={activeButton==='button2'} style={{marginBottom: '20px'}} component={Link} variant="link" to='/buying' onClick={()=> setActiveButton('button2')}><TbCoin
                    style={{color: 'yellow'}}/>Buy Cards!</Button>
                <Button disabled={activeButton==='button3'} style={{marginBottom: '20px'}} component={Link} variant="link" to='/cards' onClick={()=> setActiveButton('button3')}>Show Cards</Button>
            </div>
        </Navbar>
    )
}