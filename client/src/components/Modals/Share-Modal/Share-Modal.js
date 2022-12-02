import React, { useState} from 'react'
import ShareList from './ShareList'
import { GrAdd } from "react-icons/gr"
import { SHARE_ROLE } from '../../../translator-client/sort-options';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Divider,
    FormControl,
    Flex,
    Spacer,
    IconButton
  } from '@chakra-ui/react'

const ShareModal = (props) => {
    const {currentStore} = props
    const [share, setShare] = useState()
    const [search, setSearch] = useState('')

    const handleClose = () => {
        props.onClose()
    }
    
    const handleShare = () => {
        currentStore.updatePublic()
        props.setPublic(!props.isPublic)
    }

    const handleAddUser = () => {
        console.log(search)
        currentStore.addAccess(search, SHARE_ROLE.VIEWER)
    }

    return(<Modal isOpen={props.isOpen} onClose={handleClose}>
    <ModalOverlay />
    <ModalContent maxW='600px' height='500px'>
        <ModalHeader>{`Share "${currentStore.name}"`}</ModalHeader>
        <ModalCloseButton />
        <Divider borderColor={'purple'}/>
        <ModalBody>
            <FormControl>
                <InputGroup size='md'>
                    <Input borderColor={'purple'}
                        type='text' variant='flushed'
                        placeholder='Add People' defaultValue={search}
                        onBlur={(e) => setSearch(e.target.value)}
                    />
                    <InputRightElement>
                        <IconButton icon={<GrAdd/>} h='1.75rem' size='sm'
                        onClick={handleAddUser}
                        />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <ShareList list={props.list} currentStore={currentStore}/>
        </ModalBody>
        <Divider borderColor={'purple'}/>
        <ModalFooter>
            <Flex>
                <Button colorScheme={(props.isPublic)?"green":"red"} mr={3} onClick={handleShare} minW={260}>
                    {(props.isPublic)?"Public":"Private"}
                </Button>
                <Spacer/>
                <Button colorScheme='blue' mr={3} onClick={handleClose} minW={260}>
                    Done
                </Button>
            </Flex>
        </ModalFooter>
    </ModalContent>
    </Modal>
    )
}

export default ShareModal;