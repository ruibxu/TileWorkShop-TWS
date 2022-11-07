import React, { useContext,useState} from 'react'
import AuthContext from '../../auth'
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
    FormHelperText
  } from '@chakra-ui/react'

const UpdateAccountModal = (props) => {
    const {auth}   = useContext(AuthContext);
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPasswordVerify, setShowPasswordVerify] = React.useState(false)
    const handleClick = () => setShowPassword(!showPassword)
    const handleClickVerify = () => setShowPasswordVerify(!showPasswordVerify)

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordVerify, setPasswordVerify] = React.useState("");

    const handleClose = () => {
        props.onClose()
        setUsername('')
        setPassword('')
        setPasswordVerify('')
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        auth.updateAccount({
            username: username,
            password: password,
            passwordVerify: passwordVerify
        })
        props.onClose()
    }

    return(<Modal isOpen={props.isOpen} onClose={handleClose}>
    <ModalOverlay />
    <ModalContent maxW='500px'>
        <ModalHeader>Update Account:</ModalHeader>
        <ModalCloseButton />
        <Divider borderColor={'purple'}/>
        <ModalBody>
            <Stack spacing={2}>
                <FormControl>
                    <FormLabel>Username:</FormLabel>
                    <Input size='md' borderColor={'purple'} onChange={(event) => { setUsername(event.target.value) }}/>
                    <FormHelperText>Leave Empty for no change</FormHelperText>
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
                    <FormHelperText>Leave Empty for no change</FormHelperText>
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
                    <FormHelperText>Leave Empty for no change</FormHelperText>
                </FormControl>
            </Stack>
        </ModalBody>
        <Divider borderColor={'purple'}/>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleUpdate} minW={425}>
                Update Account
            </Button>
        </ModalFooter>
    </ModalContent>
    </Modal>
    )
}

export default UpdateAccountModal;