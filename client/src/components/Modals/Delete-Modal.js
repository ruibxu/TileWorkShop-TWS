import React, { useState, useContext} from 'react'
import GlobalStoreContext from '../../store/ProjectStore';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Spacer,
    Divider,
    Center,
    Box,
    Text
  } from '@chakra-ui/react'

const DeleteModal = (props) => {
    const { store } = useContext(GlobalStoreContext);

    const handleDelete = () => {
        props.closeItemCard()
        store.deleteItem()
        props.onClose()
    }



    return(<Modal isOpen={props.isOpen} onClose={props.onClose}>
    <ModalOverlay />
    <ModalContent maxW='500px' height='350px'>
        <ModalHeader>Delete</ModalHeader>
        <ModalCloseButton />
        <Divider borderColor={'purple'}/>
        <ModalBody>
            <Center minW={'100%'} minH={'92%'}>
                <Box>
                    <Box><Text className='delete-modal-text' color='purple'>Are you sure you want to delete:</Text></Box>
                    <Center><Text className='delete-modal-text' color='red'>{props.name?props.name:'Untitled'}</Text></Center>
                </Box>
            </Center>
            <Text className='delete-helper-text'>Note: This action CANNOT be undone</Text>
        </ModalBody>
        <Divider borderColor={'purple'}/>
        <ModalFooter>
            <Flex width='100%' minW='100%'>
                <Button colorScheme='red' mr={3} onClick={handleDelete} minW={220}>
                    Delete
                </Button>
                <Spacer/>
                <Button colorScheme='blue' mr={3} onClick={props.onClose} minW={220}>
                    Cancel
                </Button>
            </Flex>
        </ModalFooter>
    </ModalContent>
    </Modal>
    )
}

export default DeleteModal;