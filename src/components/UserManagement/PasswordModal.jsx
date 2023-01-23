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
import {_apiClient} from "../../helpers/globals";
import {UsersApi} from "../../clients/pokecoin/src";
import {useEffect, useState} from "react";
import {HiOutlineKey, HiOutlineEye, HiOutlineEyeOff} from "react-icons/hi"
import SuccessModalContent from "./SuccessModalContent";

const userApi = new UsersApi(_apiClient)

function PasswordModal({isOpen, onClose}) {

    const [pwChangeSuccess, setPwChangeSuccess] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [requestError, setRequestError] = useState('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const newPasswordEmpty = newPassword === ''
    const oldPasswordEmpty = oldPassword === ''

    const {mutate: changePassword, isLoading} = useMutation(tryChangePassword, {
        onSuccess: (resp) => {
            setPwChangeSuccess(true)
        },
        onError: (error) => {
            if(error.body?.message){
                setRequestError(error.body.message)
            }
            else{
                setRequestError('An unexpected error occured. Please try again!')
            }
        }
    })

    async function tryChangePassword() {
        return await userApi.authChangePasswordPost({body: {password: oldPassword, newPassword: newPassword}})
    }

    function handleSubmit(e) {
        e.preventDefault()
        changePassword()
    }

    useEffect(() => {
        if (!isOpen) {
            setRequestError('')
            setOldPassword('')
            setNewPassword('')
        }
    }, [isOpen])

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg={"blackAlpha.700"}/>
            <ModalContent bg={"#172646"}>
                <ModalCloseButton _hover={{bg: 'whiteAlpha.200'}} color={'white'}/>
                {pwChangeSuccess && <SuccessModalContent onClose={onClose} successInfo={'New password is valid immediately'} textButton={'Back to website'} header={'Password changed!'}/>}
                {!pwChangeSuccess &&
                    <>
                        <ModalHeader textAlign={'center'} fontWeight={'bold'} fontSize={'1.7rem'}
                                     color={'white'}>Change Password</ModalHeader>
                        {requestError &&
                            <Box bg={"#1e1e1e"} borderRadius={'0.4rem'}
                                 style={{margin: '0rem 1.5rem 0rem 1.5rem', textAlign: 'center'}}
                                 borderColor={"#E53E3E"} borderWidth={'2px'} padding={'0.5rem'}>
                                <Text color={'white'}>Change Password failed.</Text>
                                <Text color={'white'}>{requestError}</Text>
                            </Box>
                        }
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <ModalBody pb={4}>
                                <FormControl isInvalid={oldPasswordEmpty} isRequired>
                                    <FormLabel color={'white'}>Current password</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'
                                                          children={<HiOutlineKey color='white'/>}/>
                                        <InputRightElement pointerEvents={'auto'}
                                                           _hover={{bg: 'whiteAlpha.200', cursor: 'pointer'}}
                                                           onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                           children={!showCurrentPassword ? <HiOutlineEyeOff color='white'/>
                                                               : <HiOutlineEye color='white'/>}/>
                                        <Input autoFocus variant={'filled'} backgroundColor={"#313131"}
                                               _hover={{borderWidth: '2px', borderColor: 'gray'}}
                                               _focus={{bg: "#1e1e1e"}} color={'white'}
                                               type={showCurrentPassword ? 'text' : 'password'}
                                               onChange={(e) => setOldPassword(e.target.value)}/>
                                    </InputGroup>
                                    {!oldPasswordEmpty ? (<FormHelperText>Enter current Password.</FormHelperText>)
                                        : (<FormErrorMessage>Current password is required.</FormErrorMessage>)}
                                </FormControl>
                                <FormControl mt={4} isInvalid={newPasswordEmpty} isRequired>
                                    <FormLabel color={'white'}>New password</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'
                                                          children={<HiOutlineKey color='white'/>}/>
                                        <InputRightElement pointerEvents={'auto'}
                                                           _hover={{bg: 'whiteAlpha.200', cursor: 'pointer'}}
                                                           onClick={() => setShowNewPassword(!showNewPassword)}
                                                           children={!showNewPassword ? <HiOutlineEyeOff color='white'/>
                                                               : <HiOutlineEye color='white'/>}/>
                                        <Input variant={'filled'} backgroundColor={"#313131"}
                                               _hover={{borderWidth: '2px', borderColor: 'gray'}}
                                               _focus={{bg: "#1e1e1e"}} color={'white'}
                                               type={showNewPassword ? 'text' : 'password'}
                                               onChange={(e) => setNewPassword(e.target.value)}/>
                                    </InputGroup>
                                    {!newPasswordEmpty ? (<FormHelperText>Enter new password.</FormHelperText>)
                                        : (<FormErrorMessage>Password is required.</FormErrorMessage>)}
                                </FormControl>
                            </ModalBody>
                            <ModalFooter justifyContent={'center'}>
                                <Button width={'100%'} isDisabled={oldPasswordEmpty || newPasswordEmpty} isLoading={isLoading}
                                        type={'submit'} colorScheme='blue' mb={4}>Change Password</Button>
                            </ModalFooter>
                        </form>
                    </>
                }
            </ModalContent>
        </Modal>
    )
}

export default PasswordModal