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

const SignUpModal = (props) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPasswordVerify, setShowPasswordVerify] = React.useState(false)
    const handleClick = () => setShowPassword(!showPassword)
    const handleClickVerify = () => setShowPasswordVerify(!showPasswordVerify)


    return(<Modal isOpen={props.isOpen} onClose={props.onClose}>
    <ModalOverlay />
    <ModalContent maxW='500px'>
        <ModalHeader>Create Account</ModalHeader>
        <ModalCloseButton />
        <Divider borderColor={'purple'}/>
        <ModalBody>
            <Stack spacing={2}>
                <FormControl>
                    <FormLabel>Username:</FormLabel>
                    <Input size='md' borderColor={'purple'}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Email:</FormLabel>
                    <Input size='md' borderColor={'purple'}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Password:</FormLabel>
                    <InputGroup size='md'>
                    <Input borderColor={'purple'}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
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
            <Button colorScheme='blue' mr={3} onClick={props.onClose} minW={425}>
                Create Account
            </Button>
        </ModalFooter>
    </ModalContent>
    </Modal>
    )
}

export default SignUpModal;