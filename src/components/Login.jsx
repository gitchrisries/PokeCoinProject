import React, {useState, createContext, useContext} from "react";
import {
    Box,
    Input,
    HStack,
    VStack,
    InputGroup,
    InputLeftAddon,
    Button,
    Text,
    ScaleFade,
    useDisclosure, useToast,
} from '@chakra-ui/react';
import {UsersApi} from "../clients/pokecoin/src";
import _apiClient from "../helpers/globals";
import LoginRegister from "./Login/LoginRegPage";
import {useQuery} from "@tanstack/react-query";
import ChangePassword from "./Login/ChangePwPage";

const userApi = new UsersApi(_apiClient)


function Login() {

    const [loggedIn,setLoggedIn] = useState(false);

    useQuery(['auth'],
        async () => {
            return await userApi.authMeGet()
        }, {
            onSuccess: () => setLoggedIn(true)
        }
    )

    return (
        loggedIn ? <ChangePassword/> :
                <LoginRegister/>
    );
}

export default Login;
