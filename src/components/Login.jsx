import React, {useState, createContext, useContext} from "react";
import {Box, Input, HStack, VStack, InputGroup, InputLeftAddon, Button} from '@chakra-ui/react'

const url = 'http://localhost:3000'
const UserContext = createContext({});

function RegisterLoginButton({path,name}) {
    const loginData = useContext(UserContext);
    const handleRegister = React.useCallback(() => {
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
            <VStack spacing={10} align='left'>
                <Box>
                    <h2 align='left'>Login</h2>
                </Box>
                <InputGroup>
                    <InputLeftAddon children='Username' width='35%'/>
                    <Input type='text' value={loginData.username} onChange={onChangeUserName}/>
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon children='Password' width='35%'/>
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