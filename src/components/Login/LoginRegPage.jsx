import React, {useState, useEffect ,createContext, useContext} from "react";
import {Box, Input, HStack,VStack,InputGroup,InputLeftAddon,Button,useToast} from '@chakra-ui/react';
import {UsersApi} from "../../clients/pokecoin/src";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import _apiClient from "../../helpers/globals";

const userApi = new UsersApi(_apiClient);

const useLoginUser = (userData) => {
    const queryClient = useQueryClient();

    return useMutation(
        ['login'],
        async (userData) => {
            return await userApi.authLoginPost({'body': userData});
        },
        {
            onSuccess: (data) => {
                localStorage.setItem('token', data.token);
                _apiClient.authentications['token'].apiKey = localStorage.getItem('token');
                queryClient.invalidateQueries(['auth']).catch(console.log);
                queryClient.invalidateQueries(['walletBalance']).catch(console.log);
            },
        }
    );
};

const useRegisterUser = (userData) => {
    return useMutation(
        ['register'],
        async (userData) => {
            return await userApi.authRegisterPost({'body': userData});
        }
    );
};

function RegisterLoginButton({name, mutateFunction, userdata}) {

    const toast = useToast({})
    const toastIdRef = React.useRef(toast)
    const {mutate: usemutate, error, isSuccess} = mutateFunction;

    const handleClick = () => {
        if (userdata.username !== '' && userdata.password !== '') {
            usemutate(userdata)
        }
    }

    useEffect(() => {
        if (error) {
            toastIdRef.current = toast({
                description: error.body.message,
                status: 'error',
                duration: 1000,
                isClosable: true
            })
        }
        if (isSuccess) {
            toastIdRef.current = toast({description: `${name} was successful`, duration: 1000, isClosable: true})
        }
    }, [isSuccess,error]);

    return (
        <Button onClick={handleClick}>{`${name}`}</Button>
    );
}

function LoginRegister() {

    const [loginData, setLoginData] = useState({username: '', password: ''});

    const setUserData = React.useCallback((username, pw) => {
        setLoginData({...loginData, username: username, password: pw});
    }, [loginData])

    return (
        <VStack spacing={8} align='left' ml={'5'}>
            <InputGroup>
                <InputLeftAddon children='Username'/>
                <Input type='text' color='white' value={loginData.username}
                       onChange={(e) => setUserData(e.target.value, loginData.password)}/>
            </InputGroup>
            <InputGroup>
                <InputLeftAddon children='Password'/>
                <Input type='password' color='white' value={loginData.password}
                       onChange={(e) => setUserData(loginData.username, e.target.value)}/>
            </InputGroup>
            <HStack>
                <RegisterLoginButton name={'Login'} mutateFunction={useLoginUser()} userdata={loginData}/>
                <RegisterLoginButton name={'Register'} mutateFunction={useRegisterUser()} userdata={loginData}/>
            </HStack>
        </VStack>
    );
}

export default LoginRegister;
