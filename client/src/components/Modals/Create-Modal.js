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
    Divider,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Flex,
    NumberInput,
    NumberInputField,
    Spacer
  } from '@chakra-ui/react'

const CreateModal = (props) => {
    const [createType, setCreateType] = useState('TileSet')



    return(<Modal isOpen={props.isOpen} onClose={props.onClose}>
    <ModalOverlay />
    <ModalContent maxW='500px'>
        <ModalHeader>{`Create ${createType}:`}</ModalHeader>
        <ModalCloseButton />
        <Divider borderColor={'purple'}/>
        <ModalBody>
            <RadioGroup onChange={setCreateType} value={createType}>
                <Stack direction='row' gap={3}>
                    <Radio value='TileSet' size='lg'>TileSet</Radio>
                    <Radio value='TileMap' size='lg'>TileMap</Radio>
                </Stack>
            </RadioGroup>
            <Stack spacing={2}>
                <FormControl>
                    <FormLabel>Input Project Name:</FormLabel>
                    <Input size='md' borderColor={'purple'}/>
                </FormControl>
            </Stack>
            <Flex>
                <FormControl mr={5}>
                    <FormLabel>Height:</FormLabel>
                    <NumberInput>
                        <NumberInputField size='md' borderColor={'purple'}/>
                    </NumberInput>
                </FormControl>
                <Spacer/>
                <FormControl ml={5}>
                    <FormLabel>Width:</FormLabel>
                    <NumberInput>
                        <NumberInputField size='md' borderColor={'purple'}/>
                    </NumberInput>
                </FormControl>
            </Flex>
        </ModalBody>
        <Divider borderColor={'purple'}/>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={props.onClose} minW={425}>
                Create
            </Button>
        </ModalFooter>
    </ModalContent>
    </Modal>
    )
}

export default CreateModal;