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
import { useContext } from 'react';
//import { GlobalStoreContext } from '../store'
import AuthContext from '../../auth'

const ChangePasswordModal = (props) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPasswordVerify, setShowPasswordVerify] = React.useState(false)
    const handleClick = () => setShowPassword(!showPassword)
    const handleClickVerify = () => setShowPasswordVerify(!showPasswordVerify)

    const [password, setPassword] = React.useState("");
    const [passwordVerify, setPasswordVerify] = React.useState("");

    const { auth } = useContext(AuthContext);
    //const { store } = useContext(GlobalStoreContext)
    //console.log((auth.user)?auth.user._id:'')

    const handleUpdate = (event) => {
        event.preventDefault();
        console.log(props.user_id)
        auth.changePassword({
            id: props.user_id,
            password: password,
            passwordVerify: passwordVerify
        }, props.request)
        props.onClose()
    }

    return(<Modal isOpen={props.isOpen} onClose={props.onClose}>
    <ModalOverlay />
    <ModalContent maxW='500px'>
        <ModalHeader>Insert New Password</ModalHeader>
        <ModalCloseButton />
        <Divider borderColor={'purple'}/>
        <ModalBody>
            <Stack spacing={2}>
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
        </ModalBody>
        <Divider borderColor={'purple'}/>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleUpdate} minW={425}>
                Change Password
            </Button>
        </ModalFooter>
    </ModalContent>
    </Modal>
    )
}

export default ChangePasswordModal;