import React, {useContext} from "react";
import {LoggedContext} from "../contexts/LoggedContext";
import {useDisclosure, HStack, MenuButton, MenuList, Menu, MenuItem, MenuDivider, Avatar} from "@chakra-ui/react";
import {Button} from "@mantine/core";
import LoginModal2 from "./LoginModal2";
import {UsersApi} from "../clients/pokecoin/src";
import {_apiClient} from "../helpers/globals";
import {UnlockIcon, RepeatIcon, AddIcon, CloseIcon} from "@chakra-ui/icons";

const userApi = new UsersApi(_apiClient)

function UserFunctions(){
    const {loggedIn} = useContext(LoggedContext)
    const {isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin} = useDisclosure()
    const {isOpen: isOpenReg, onOpen: onOpenReg, onClose: onCloseReg} = useDisclosure()
    const {isOpen: isOpenPw, onOpen: onOpenPw, onClose: onClosePw} = useDisclosure()

    return(
        <Menu>
            <MenuButton as={Avatar} bg='#0398fc' >
            </MenuButton>
            <MenuList >
                {!loggedIn  ? <>
                <MenuItem icon={<UnlockIcon/>} onClick={onOpenLogin}>Login</MenuItem>
                <MenuItem icon={<AddIcon/>} onClick={onOpenReg}>Register</MenuItem>
                </> : <>
                <MenuItem bg='#0398fc' icon={<RepeatIcon/>} onClick={onOpenPw}>Change Password</MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<CloseIcon/>}>Logout</MenuItem>
                </>}
                {isOpenLogin && <LoginModal2 isOpen={isOpenLogin} onClose={onCloseLogin} buttonName={'Login'} option={'login'}/>}
                {isOpenReg && <LoginModal2 isOpen={isOpenReg} onClose={onCloseReg} buttonName={'Register'} option={'register'}/>}
                {isOpenPw && <LoginModal2 isOpen={isOpenPw} onClose={onClosePw} buttonName={'Change Password'} option={'changePassword'}/>}
            </MenuList>
        </Menu>
    );
}

export default UserFunctions