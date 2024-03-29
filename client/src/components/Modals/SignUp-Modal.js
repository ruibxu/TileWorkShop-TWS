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
    FormLabel,
  } from '@chakra-ui/react'
import { useContext } from 'react';
//import { GlobalStoreContext } from '../store'
import AuthContext from '../../auth'

const SignUpModal = (props) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPasswordVerify, setShowPasswordVerify] = React.useState(false)

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordVerify, setPasswordVerify] = React.useState("");

    const handleClick = () => setShowPassword(!showPassword)
    const handleClickVerify = () => setShowPasswordVerify(!showPasswordVerify)

    const { auth } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        auth.registerUser({
            username: username,
            email: email,
            password: password,
            passwordVerify: passwordVerify
        });

        
        props.onClose()
    };

    const handleClose = () => {
        props.onClose()
        setUsername('')
        setEmail('')
        setPassword('')
        setPasswordVerify('')
    }

    const handleAccountExist = () =>{
        handleClose()
        props.openLogin()
    }

    return(<Modal isOpen={props.isOpen} onClose={handleClose}>
    <ModalOverlay />
    <ModalContent maxW='500px' onSubmit={handleSubmit}>
        <ModalHeader>Create Account</ModalHeader>
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
                    <Input size='md' borderColor={'purple'}  onChange={(event) => { setEmail(event.target.value) }}/>
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
                <FormControl>
                <FormLabel>Verify Password:</FormLabel>
                    <InputGroup size='md'>
                    <Input borderColor={'purple'}
                        type={showPasswordVerify ? 'text' : 'password'}
                        placeholder='Enter password'
                        onChange={(event) => { setPasswordVerify(event.target.value) }}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClickVerify}>
                            {showPasswordVerify ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                </FormControl>
            </Stack>
            <Button variant='link' onClick={handleAccountExist}>
                <Text color="blue.500">Already have an Account?</Text>
            </Button>
        </ModalBody>
        <Divider borderColor={'purple'}/>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit} minW={425}>
                Create Account
            </Button>
        </ModalFooter>
    </ModalContent>
    </Modal>
    )
}

export default SignUpModal;