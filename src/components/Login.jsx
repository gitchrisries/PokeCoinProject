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
import ApiClient from "../clients/pokecoin/src/ApiClient";
import {UsersApi} from "../clients/pokecoin/src";
//import {UserContext} from "../contexts/UserContext";
import {useMutation} from "@tanstack/react-query";
import _apiClient from "../helpers/globals";

const UserContext = createContext({});

const loginUser = async (userData) => {
    const opts = {'body': userData};
    return await new UsersApi(_apiClient).authLoginPost(opts);
};

const useLoginUser = (userData) => {
    return useMutation(
        ['login'],
        (data) => loginUser(data, userData),
        {
            onSuccess: (data) => {
                localStorage.setItem('token', data.token);
                _apiClient.authentications['token'].apiKey = localStorage.getItem('token');
                console.log(data.token)
            },
        }
    );
};

const registerUser = async (userData) => {
    const opts = {'body': userData};
    return await new UsersApi(_apiClient).authRegisterPost(opts);
};

const useRegisterUser = (userData) => {
    return useMutation(
        ['register'],
        async (data) => await registerUser(data, userData)
    );
};

function RegisterLoginButton({name, mutateFunction}) {
    const userdata = useContext(UserContext);
    const toast = useToast({})
    const toastIdRef = React.useRef(toast)
    const {mutate: usemutate, error, isSuccess} = mutateFunction;

    const handleClick = () => {
        if (userdata.username !== '' && userdata.password !== '') {
            usemutate(userdata)
        }
        if(error){
            toast.closeAll()
            toastIdRef.current = toast({ description: error.body.message, status:'error', duration: 1000, isClosable: true})
        }
        if(isSuccess){
            toast.closeAll()
            toastIdRef.current = toast({ description: `${name} was successful`, duration: 1000, isClosable: true})
        }
    }

    return (
        <Button onClick={handleClick}>{`${name}`}</Button>
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
                    <InputLeftAddon children='Username'/>
                    <Input type='text' color='white' value={loginData.username} onChange={onChangeUserName}/>
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon children='Password'/>
                    <Input type='password' color='white' value={loginData.password} onChange={onChangePassword}/>
                </InputGroup>
                <HStack>
                    <RegisterLoginButton name={'Login'} mutateFunction={useLoginUser()}/>
                    <RegisterLoginButton name={'Register'} mutateFunction={useRegisterUser()}/>
                </HStack>
            </VStack>
        </UserContext.Provider>
    );
}

export default Login;
