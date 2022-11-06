import React, { useState} from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    Divider,
    FormControl,
    FormLabel
  } from '@chakra-ui/react'

const ForgetPasswordModal = (props) => {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleClose = () => {
        props.onClose()
        setEmail('')
        setUsername('')
    }

    return(<Modal isOpen={props.isOpen} onClose={handleClose}>
    <ModalOverlay />
    <ModalContent maxW='500px'>
        <ModalHeader>Forgot Password</ModalHeader>
        <ModalCloseButton />
        <Divider borderColor={'purple'}/>
        <ModalBody>
            <Stack spacing={2}>
                <FormControl>
                    <FormLabel>Username:</FormLabel>
                    <Input size='md' borderColor={'purple'} onChange={(event) => { setUsername(event.target.value) }}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Email:</FormLabel>
                    <Input size='md' borderColor={'purple'} onChange={(event) => { setEmail(event.target.value) }}/>
                </FormControl>
            </Stack>
        </ModalBody>
        <Divider borderColor={'purple'}/>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClose} minW={425}>
                Submit
            </Button>
        </ModalFooter>
    </ModalContent>
    </Modal>
    )
}

export default ForgetPasswordModal;