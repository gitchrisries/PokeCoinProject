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
import {useMutation} from "@tanstack/react-query";
import {_apiClient, feedbackStr} from "../../helpers/globals";
import {UsersApi} from "../../clients/pokecoin/src";
import {useContext, useEffect, useState} from "react";
import {HiOutlineKey, HiUser, HiOutlineEye, HiOutlineEyeOff} from "react-icons/hi"
import SuccessModalContent from "./SuccessModalContent";
import {LoggedContext} from "../../contexts/LoggedContext";

const userApi = new UsersApi(_apiClient)

function LoginRegisterModal({isOpen, onClose, printedOption, successModalInfo, successTexButton}) {
    const {setLoggedIn} = useContext(LoggedContext)
    const [requestSuccess, setRequestSuccess] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const passwordEmpty = password === ''
    const usernameEmpty = username === ''

    const {mutate: login, isLoading, error} = useMutation(printedOption==='Register' ? tryRegister : tryLogin, {
        onSuccess: (resp) => {
            if(resp.token) {
                localStorage.setItem('token', resp.token)
                _apiClient.authentications['token'].apiKey = localStorage.getItem('token');
                setLoggedIn(true);
            }
            setRequestSuccess(true)
        }
    })

    async function tryLogin() {
        return await userApi.authLoginPost({body: {username, password}})
    }

    async function tryRegister() {
        return await userApi.authRegisterPost({body: {username, password}})
    }

    function handleSubmit(e) {
        e.preventDefault()
        login()
    }

    useEffect(() => {
        if (!isOpen) {
            setUsername('')
            setPassword('')
        }
    }, [isOpen])

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg={"blackAlpha.700"}/>
            <ModalContent bg={"#172646"}>
                <ModalCloseButton _hover={{bg: 'whiteAlpha.200'}} color={'white'}/>
                {requestSuccess && <SuccessModalContent onClose={onClose} successInfo={`${successModalInfo} ${username}`} textButton={successTexButton} header={`${printedOption} successfull`}/>}
                {!requestSuccess &&
                    <>
                        <ModalHeader textAlign={'center'} fontWeight={'bold'} fontSize={'1.7rem'}
                                     color={'white'}>{printedOption}</ModalHeader>
                        {error &&
                            <Box bg={"#1e1e1e"} borderRadius={'0.4rem'}
                                 style={{margin: '0rem 1.5rem 0rem 1.5rem', textAlign: 'center'}}
                                 borderColor={"#E53E3E"} borderWidth={'2px'} padding={'0.5rem'}>
                                <Text color={'white'}>{printedOption} failed.</Text>
                                <Text color={'white'}>{error?.body?.message || feedbackStr.unknownError}.</Text>
                            </Box>
                        }
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <ModalBody pb={4}>
                                <FormControl isInvalid={usernameEmpty} isRequired>
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
                                <FormControl mt={4} isInvalid={passwordEmpty} isRequired>
                                    <FormLabel color={'white'}>Password</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'
                                                          children={<HiOutlineKey color='white'/>}/>
                                        <InputRightElement pointerEvents={'auto'}
                                                           _hover={{bg: 'whiteAlpha.200', cursor: 'pointer'}}
                                                           onClick={() => setShowPassword(!showPassword)}
                                                           children={!showPassword ? <HiOutlineEyeOff color='white'/>
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
                            <ModalFooter justifyContent={'center'}>
                                <Button width={'100%'} isDisabled={usernameEmpty || passwordEmpty} isLoading={isLoading}
                                        type={'submit'} colorScheme='blue' mb={4}>{printedOption}</Button>
                            </ModalFooter>
                        </form>
                    </>
                }
            </ModalContent>
        </Modal>
    )
}

export default LoginRegisterModal