import React, {useState, createContext, useContext} from "react";
import { Box, Input, HStack, VStack, InputGroup, InputLeftAddon, Button } from '@chakra-ui/react';
import ApiClient from "../clients/pokecoin/src/ApiClient";
import {UsersApi} from "../clients/pokecoin/src";

const url = 'http://localhost:3000'
const UserContext = createContext({});

function RegisterLoginButton({path, name}) {
    const opts = {'body': useContext(UserContext)};
    /*const handleRegister = React.useCallback(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        }
        fetch(`${url}${path}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    });*/
    const callback1 = (error,data,response) => {
        console.log('resp: '+response.text);
        console.log('data: '+data.username);
        console.log('error: '+error);
    };
    const handleRegister = () => {
        const apiClient = new ApiClient(url);
        console.log(new UsersApi(apiClient).authRegisterPost(opts,callback1));
    };
    return (
        <Button onClick={handleRegister}>{`${name}`}</Button>
    );
}

function Login() {

    const [loginData, setloginData] = useState({username: '', password: ''});
    const onChangeUserName = React.useCallback((e) => {
        setloginData({...loginData, username: e.target.value});
    })
    const onChangePassword = React.useCallback((e) => {
        setloginData({...loginData, password: e.target.value});
    })

    return (
        <UserContext.Provider value={loginData}>
            <VStack spacing={8} align='left' ml={'5'}>
                <Box>
                    <h2 align='left'>Login</h2>
                </Box>
                <InputGroup>
                    <InputLeftAddon children='Username' width='5%'/>
                    <Input type='text' value={loginData.username} onChange={onChangeUserName}/>
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon children='Password' width='5%'/>
                    <Input type='password' value={loginData.password} onChange={onChangePassword}/>
                </InputGroup>
                <HStack>
                    <RegisterLoginButton path={'/auth/login'} name={'Login'}/>
                    <RegisterLoginButton path={'/auth/register'} name={'Register'}/>
                </HStack>
            </VStack>
        </UserContext.Provider>
    );
}

export default Login;
