import { useDisclosure } from "@chakra-ui/react";
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button
} from '@chakra-ui/react'
import image from '../../2kfVc.png';
import { Badge, Box, IconButton, Image, Flex, Spacer } from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
function ItemCardBig(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data } = props
    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent height="500px" maxWidth="1000px">
                    <ModalHeader>
                        <Flex alignItems='center'>
                            <Image minW={'100%'} borderRadius='lg' maxW={'100%'} height='200px' fit="none" src={image} marginRight={0}/>
                        </Flex>
                        <Flex gap={2} alignItems={'center'} width='0px' id = "big-buttons">
                            <IconButton bg='transparent' icon={<AiOutlineHeart className='md-icon' />} ></IconButton>
                            <IconButton bg='transparent' icon={<FiThumbsUp className='md-icon' />} ></IconButton>
                            <IconButton bg='transparent' icon={<FiThumbsDown className='md-icon' />} ></IconButton>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {data.owner}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={props.openDeleteModal}>Delete</Button>
                        <Button colorScheme='blue' onClick={() => props.onClose()}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
export default ItemCardBig;