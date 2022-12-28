import React, {useState, createContext, useContext} from "react";
import {Heading} from '@chakra-ui/react';
import {UsersApi} from "../clients/pokecoin/src";
import _apiClient from "../helpers/globals";
import LoginRegister from "./Login/LoginRegPage";
import {useQuery} from "@tanstack/react-query";
import ChangePassword from "./Login/ChangePwPage";
import {LoggedContext} from "../contexts/LoggedContext";


function Login() {

    const {loggedIn, isLoading} = React.useContext(LoggedContext)

    return (
        <>
        {loggedIn && !isLoading && <ChangePassword/>}
            {isLoading && <Heading color={'white'}>Loading...</Heading>}
            {!loggedIn && !isLoading &&<LoginRegister/>}
        </>
    );
}

export default Login;
