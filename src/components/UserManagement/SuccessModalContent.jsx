import {Button, ModalBody, ModalFooter, ModalHeader, Text} from "@chakra-ui/react";


function SuccessModalContent({onClose, successInfo, textButton, header}) {
    return (
        <>
            <ModalHeader textAlign={'center'} fontWeight={'bold'} fontSize={'1.7rem'}
                         color={'white'}>{header}</ModalHeader>
            <ModalBody textAlign={'center'} pb={6}>
                <Text color={'white'}>{successInfo}.</Text>
            </ModalBody>
            <ModalFooter justifyContent={'center'}>
                <Button width={'100%'} onClick={onClose} colorScheme='blue' mb={4}>{textButton}</Button>
            </ModalFooter>
        </>
    )
}

export default SuccessModalContent;