import {Button, Navbar} from "@mantine/core";
import {Link} from "react-router-dom";
import {TbBrandGravatar, TbCoin, TbHammer} from "react-icons/tb";
import React, {useState} from "react";


export const NavBar=(props)=>{
    const [activeButton, setActiveButton] = useState(null)

    return(
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!props.opened} width={{sm: 150, lg: 200}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button disabled={activeButton==='button1'} style={{marginBottom: '20px', justifyContent: 'space-between'}} onClick={()=> setActiveButton('button1')} component={Link}
                        variant="link" to='/mining'><TbHammer/> Mining</Button>
                <Button disabled={activeButton==='button2'} style={{marginBottom: '20px'}} component={Link} variant="link" to='/buying' onClick={()=> setActiveButton('button2')}><TbCoin
                    style={{color: 'yellow'}}/>Buy Cards!</Button>
                <Button disabled={activeButton==='button3'} style={{marginBottom: '20px'}} component={Link} variant="link" to='/cards' onClick={()=> setActiveButton('button3')}>Show Cards</Button>
                <Button disabled={activeButton==='button4'} style={{marginBottom: '20px'}} component={Link} variant="link"
                        to='/login' onClick={()=> setActiveButton('button4')}><TbBrandGravatar style={{color: 'red'}}/>Logout</Button>
            </div>
        </Navbar>
    )
}
