import React, {useState, createContext, useContext} from "react";
import { Box, Input, HStack, VStack, InputGroup, InputLeftAddon, Button } from '@chakra-ui/react';
import ApiClient from "../clients/pokecoin/src/ApiClient";
import {UsersApi} from "../clients/pokecoin/src";
//import {UserContext} from "../contexts/UserContext";
import {useMutation} from "@tanstack/react-query";

const url = 'http://localhost:3000'
const UserContext = createContext({});

const loginUser = async (userData) => {
    const opts = {'body': userData};
    const response = await new UsersApi(new ApiClient(`${url}`)).authLoginPost(opts);
    return response;
};

const useLoginUser = (userData) => {
    return useMutation(
        ['login'],
        (data) => loginUser(data, userData),
        {
            onSuccess: (data) => {console.log(data)},
        }
    );
};

function RegisterLoginButton({name}) {
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

    });
    const callback1 = (error,data,response) => {
        console.log('resp: '+response.text);
        console.log('data: '+data.username);
        console.log('error: '+error);
    };
    const mutation= useMutation(async() => {
        const response = await new UsersApi(new ApiClient(`${url}`)).authLoginPost(opts);
        return response.data;
    }, {
        onSuccess: (data) => {
            //localStorage.setItem('token', data.token);
            console.log(data)
        }
    });
    console.log(mutation);
    if(mutation.error){
        console.log(mutation.error.message);
    }
    const handleRegister = () => {
        const apiClient = new ApiClient(url);
        console.log(new UsersApi(apiClient).authRegisterPost(opts,callback1));
    };*/
    const userdata = useContext(UserContext);
    const { mutate: login} = useLoginUser();
    return (
        <Button onClick={() => {if(userdata.username!=='' && userdata.password!=='') {login(userdata)}}}>{`${name}`}</Button>
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
                    <RegisterLoginButton name={'Login'}/>
                    <RegisterLoginButton name={'Register'}/>
                </HStack>
            </VStack>
        </UserContext.Provider>
    );
}

export default Login;
