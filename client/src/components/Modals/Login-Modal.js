import React, { useState } from 'react'

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

const LoginModal = (props) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleClick = () => setShowPassword(!showPassword)
    const handleForgetPassword = () => {
        props.onClose()
        props.openForgetPasswordModal()
    }

    const handleLogin = (event) => {
        console.log(
            {
                "email:": email,
                "password:": password
            }
        )
        props.setLogin(event)
        props.onClose()
    }


    return (<Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent maxW='500px'>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <Divider borderColor={'purple'} />
            <ModalBody>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Email:</FormLabel>
                        <Input size='md' borderColor={'purple'} type='email'
                            onChange={(event) => { setEmail(event.target.value) }} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password:</FormLabel>
                        <InputGroup size='md'>
                            <Input borderColor={'purple'}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter password'
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button variant='link' width={'120px'} onClick={handleForgetPassword}>
                        <Text color="blue.500">Forgot Password</Text>
                    </Button>
                </Stack>
            </ModalBody>
            <Divider borderColor={'purple'} />
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleLogin} minW={425}>
                    Login
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}

export default LoginModal;