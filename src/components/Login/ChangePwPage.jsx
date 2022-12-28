import {Box, HStack, Input, InputGroup, InputLeftAddon, Tag, VStack, Button, Heading} from "@chakra-ui/react";
import React,{useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UsersApi} from "../../clients/pokecoin/src";
import _apiClient from "../../helpers/globals";

const userApi = new UsersApi(_apiClient);

function ChangePassword(){
    const queryClient = useQueryClient();
    const[openChange, setOpenChange] = useState(false);
    const [passwordData, setPasswordData] = useState({password:'', newPassword:''});

    const setPasswData = React.useCallback((oldPw, newPw) => {
        setPasswordData({...passwordData, password: oldPw, newPassword: newPw});
    }, [passwordData])

    const {mutate:changePw} = useMutation(
        ['passwordChange'],
        async (passwordData) => {
            return await userApi.authChangePasswordPost({'body': passwordData});
        }
    ,{
        onSuccess: (data) => {
            localStorage.setItem('token', '');
            _apiClient.authentications['token'].apiKey = '';
            queryClient.invalidateQueries(['auth']).catch(console.log)
        },
    });

    return(
        !openChange ?
            <>
            <Heading color={'white'}>You are logged in!</Heading><br/>
            <Tag bg={'blue'} size='lg' onClick={() => setOpenChange(true)}>
                Change Password?
            </Tag>
            </> :
            <VStack spacing={8} align='left' ml={'5'}>
                <InputGroup>
                    <InputLeftAddon children='Current Password'/>
                    <Input type='password' value={passwordData.password} onChange={(e) => setPasswData(e.target.value, passwordData.newPassword)}/>
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon children='New Password'/>
                    <Input type='password' value={passwordData.newPassword} onChange={(e) => setPasswData(passwordData.password, e.target.value)}/>
                </InputGroup>
                <HStack>
                    <Button onClick={() => changePw(passwordData)}>Change Password</Button>
                </HStack>
            </VStack>
    );
}

export default ChangePassword;