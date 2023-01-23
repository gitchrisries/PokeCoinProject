import React, {useContext} from "react";
import {LoggedContext} from "../../contexts/LoggedContext";
import {useDisclosure, HStack, MenuButton, MenuList, Menu, MenuItem, MenuDivider, Avatar} from "@chakra-ui/react";
import LoginRegisterModal from "./LoginRegisterModal";
import PasswordModal from "./PasswordModal";
import {_apiClient} from "../../helpers/globals";
import {UnlockIcon, RepeatIcon, AddIcon, CloseIcon} from "@chakra-ui/icons";


function UserFunctions() {
    const {loggedIn, setLoggedIn} = useContext(LoggedContext)
    const {isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin} = useDisclosure()
    const {isOpen: isOpenReg, onOpen: onOpenReg, onClose: onCloseReg} = useDisclosure()
    const {isOpen: isOpenPw, onOpen: onOpenPw, onClose: onClosePw} = useDisclosure()

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('token')
        _apiClient.authentications['token'].apiKey = '';
    }

    return (
        <>
            <Menu>
                <MenuButton as={Avatar} bg='#0398fc'>
                </MenuButton>
                <MenuList>
                    {!loggedIn ? <>
                        <MenuItem icon={<UnlockIcon/>} onClick={onOpenLogin}>Login</MenuItem>
                        <MenuItem icon={<AddIcon/>} onClick={onOpenReg}>Register</MenuItem>
                    </> : <>
                        <MenuItem bg='#0398fc' icon={<RepeatIcon/>} onClick={onOpenPw}>Change Password</MenuItem>
                        <MenuDivider/>
                        <MenuItem icon={<CloseIcon/>} onClick={handleLogout}>Logout</MenuItem>
                    </>}
                </MenuList>
            </Menu>
            {isOpenLogin &&
                <LoginRegisterModal isOpen={isOpenLogin} onClose={onCloseLogin} printedOption={'Login'} successModalInfo={'You are logged in as'} successTexButton={"Let's mine!"}/>}
            {isOpenReg &&
                <LoginRegisterModal isOpen={isOpenReg} onClose={onCloseReg} printedOption={'Register'} successModalInfo={'You are registered as'} successTexButton={'Back to website'}/>}
            {isOpenPw &&
                <PasswordModal isOpen={isOpenPw} onClose={onClosePw} buttonName={'Change Password'}
                               option={'changePassword'}/>}
        </>
    );
}

export default UserFunctions