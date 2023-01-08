import {
    ModalContent,
    ModalOverlay,
    Button,
    Modal,
    FormControl,
    FormLabel,
    Input,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroup,
    Text,
    FormHelperText,
    FormErrorMessage,
    Box,
    InputLeftElement, ModalCloseButton, InputRightElement
} from "@chakra-ui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {_apiClient} from "../helpers/globals";
import {UsersApi} from "../clients/pokecoin/src";
import {useEffect, useRef, useState} from "react";
import {HiOutlineKey, HiUser, HiOutlineEye, HiOutlineEyeOff} from "react-icons/hi"

const userApi = new UsersApi(_apiClient)

function SuccessModalContent({onClose, username}) {
    return (
        <>
            <ModalHeader textAlign={'center'} fontWeight={'bold'} fontSize={'1.7rem'}
                         color={'white'}>Successfully logged in!</ModalHeader>
            <ModalBody textAlign={'center'} pb={6}>
                <Text color={'white'}>You are logged in as {username}.</Text>
            </ModalBody>
            <ModalFooter justifyContent={'center'}>
                <Button width={'100%'} onClick={onClose} colorScheme='blue' mb={4}>Let's mine!</Button>
            </ModalFooter>
        </>
    )
}

function LoginModal2({isOpen, onClose, buttonName, option}) {
    const [logInSuccess, setLogInSuccess] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [logInError, setLogInError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const queryClient = useQueryClient()
    const passwordEmpty = password === ''
    const usernameEmpty = username === ''
    const errorCodes = {UserNotFoundError: 'User not found.', PasswordIncorrectError: 'Password not correct. Try again.',
        UserAlreadyExistsError: 'User already exists. Please choose another name'}
    const mutateFunction = option==='register' ? tryRegister : option==='login' ? tryLogin : tryChangePassword;

    const {mutate: login, isLoading} = useMutation(mutateFunction, {
        onSuccess: (resp) => {
            localStorage.setItem('token', resp.token)
            _apiClient.authentications['token'].apiKey = localStorage.getItem('token');
            queryClient.fetchQuery({queryKey: ['auth']}).catch(console.log)
            setLogInSuccess(true)
        },
        onError: (error) => {
            console.log(error);
            if (error.status === 400) {
                setLogInError(errorCodes[error.body.code])
            }
            //warum statusabfrage?? entsprechender error code wird gesendet
            if (error.status === 500) {
                setLogInError('Unexpected server error. Try again.')
            }
        }
    })

    async function tryLogin() {
        return await userApi.authLoginPost({body: {username, password}})
    }

    async function tryRegister() {
        return await userApi.authRegisterPost({body: {username, password}})
    }

    async function tryChangePassword() {
        return await userApi.authChangePasswordPost({body: {password: username, newPassword: password}})
    }

    function handleSubmit(e) {
        e.preventDefault()
        login()
    }

    useEffect(() => {
        if (!isOpen) {
            setLogInError('')
            setUsername('')
            setPassword('')
        }
    }, [isOpen])

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg={"blackAlpha.700"}/>
            <ModalContent bg={"#172646"}>
                <ModalCloseButton _hover={{bg: 'whiteAlpha.200'}} color={'white'}/>
                {logInSuccess && <SuccessModalContent onClose={onClose} username={username}/>}
                {!logInSuccess &&
                    <>
                        <ModalHeader textAlign={'center'} fontWeight={'bold'} fontSize={'1.7rem'}
                                     color={'white'}>{buttonName}</ModalHeader>
                        {logInError &&
                            <Box bg={"#1e1e1e"} borderRadius={'0.4rem'}
                                 style={{margin: '0rem 1.5rem 0rem 1.5rem', textAlign: 'center'}}
                                 borderColor={"#E53E3E"} borderWidth={'2px'} padding={'0.5rem'}>
                                <Text color={'white'}>{buttonName} failed.</Text>
                                <Text color={'white'}>{logInError}</Text>
                            </Box>
                        }
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <ModalBody pb={4}>
                                <FormControl isInvalid={usernameEmpty}>
                                    <FormLabel color={'white'}>Username</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'
                                                          children={<HiUser color='white'/>}/>
                                        <Input autoFocus variant={'filled'} backgroundColor={"#313131"}
                                               _hover={{borderWidth: '2px', borderColor: 'gray'}}
                                               _focus={{bg: "#1e1e1e"}} color={'white'}
                                               onChange={(e) => setUsername(e.target.value)}/>
                                    </InputGroup>
                                    {!usernameEmpty ? (<FormHelperText>Enter Username.</FormHelperText>)
                                        : (<FormErrorMessage>Username is required.</FormErrorMessage>)}
                                </FormControl>
                                <FormControl mt={4} isInvalid={passwordEmpty}>
                                    <FormLabel color={'white'}>Password</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'
                                                          children={<HiOutlineKey color='white'/>}/>
                                        <InputRightElement pointerEvents={'auto'}
                                                           _hover={{bg: 'whiteAlpha.200', cursor: 'pointer'}}
                                                           onClick={() => setShowPassword(!showPassword)}
                                                           children={showPassword ? <HiOutlineEyeOff color='white'/>
                                                               : <HiOutlineEye color='white'/>}/>
                                        <Input variant={'filled'} backgroundColor={"#313131"}
                                               _hover={{borderWidth: '2px', borderColor: 'gray'}}
                                               _focus={{bg: "#1e1e1e"}} color={'white'}
                                               type={showPassword ? 'text' : 'password'}
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </InputGroup>
                                    {!passwordEmpty ? (<FormHelperText>Enter Password.</FormHelperText>)
                                        : (<FormErrorMessage>Password is required.</FormErrorMessage>)}
                                </FormControl>
                            </ModalBody>
                            <ModalFooter justifyContent={'space-around'}>
                                <Button width={'100%'} isDisabled={usernameEmpty || passwordEmpty} isLoading={isLoading}
                                        type={'submit'} colorScheme='blue' mb={4}>{buttonName}</Button>
                            </ModalFooter>
                        </form>
                    </>
                }
            </ModalContent>
        </Modal>
    )
}

export default LoginModal2