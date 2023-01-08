import React, {useContext} from "react";
import {LoggedContext} from "../contexts/LoggedContext";
import {useDisclosure, HStack} from "@chakra-ui/react";
import {Button} from "@mantine/core";
import LoginModal2 from "./LoginModal2";
import {UsersApi} from "../clients/pokecoin/src";
import {_apiClient} from "../helpers/globals";

const userApi = new UsersApi(_apiClient)

function UserFunctions(){
    const {loggedIn} = useContext(LoggedContext)
    const {isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin} = useDisclosure()
    const {isOpen: isOpenReg, onOpen: onOpenReg, onClose: onCloseReg} = useDisclosure()
    const {isOpen: isOpenPw, onOpen: onOpenPw, onClose: onClosePw} = useDisclosure()

    return(
        <HStack>
            {!loggedIn && <><Button onClick={onOpenLogin}>Login</Button> <Button onClick={onOpenReg}>Register</Button></>}
            {loggedIn && <Button onClick={onOpenPw}>Change Password</Button>}
            {isOpenLogin && <LoginModal2 isOpen={isOpenLogin} onClose={onCloseLogin} buttonName={'Login'} option={'login'}/>}
            {isOpenReg && <LoginModal2 isOpen={isOpenReg} onClose={onCloseReg} buttonName={'Register'} option={'register'}/>}
            {isOpenPw && <LoginModal2 isOpen={isOpenPw} onClose={onClosePw} buttonName={'Change Password'} option={'changePassword'}/>}
        </HStack>
    );
}

export default UserFunctions