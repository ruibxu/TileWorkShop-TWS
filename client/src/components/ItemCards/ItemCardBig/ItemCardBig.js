import { useDisclosure } from "@chakra-ui/react";
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Textarea
} from '@chakra-ui/react'
import image from '../../../2kfVc.png';
import { Badge, Box, IconButton, Image, Flex, Spacer } from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
function ItemCardBig(props) {
    const { data } = props
    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent height="800px" maxWidth="1000px">
                    <ModalHeader>
                        <Flex alignItems='center'>
                            <Image minW={'100%'} borderRadius='lg' maxW={'100%'} height='200px' fit="none" src={image} />
                            <Flex gap={2} alignItems={'center'}  >
                                <IconButton id="big-buttons" bg='transparent' icon={<AiOutlineHeart className='md-icon' />} ></IconButton>
                                <IconButton id="big-buttons" bg='transparent' icon={<FiThumbsUp className='md-icon' />} ></IconButton>
                                <IconButton id="big-buttons" bg='transparent' icon={<FiThumbsDown className='md-icon' />} ></IconButton>
                            </Flex>
                        </Flex>

                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflowY={'scroll'}>
                        <Flex>
                            <Box minW='50%'>
                                <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                                    {(data.name) ? data.name : 'Untitled'}
                                </Box>
                                <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                                    {"By: " + ((data.owner) ? data.owner : 'Unnamed')}
                                </Box>
                            </Box>
                            <Box minW='50%' align="right">
                                <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                                    {"Public"}
                                </Box>
                                <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                                    {"Last Updated: 10/30/22"}
                                </Box>
                            </Box>
                        </Flex>
                        <Textarea placeholder='Leave a comment...' fontStyle="italic" />
                        <Box >
                            Comments:
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box>
                            <Box>
                                LOL THIS MAP TRASH
                            </Box><Box>
                                LOL THIS MAP TRASH
                            </Box><Box>
                                LOL THIS MAP TRASH
                            </Box><Box>
                                LOL THIS MAP TRASH
                            </Box><Box>
                                LOL THIS MAP TRASH
                            </Box><Box>
                                LOL THIS MAP TRASH
                            </Box><Box>
                                LOL THIS MAP TRASH
                            </Box><Box>
                                LOL THIS MAP TRASH
                            </Box><Box>
                                LOL THIS MAP TRASH
                            </Box>
                        </Box>
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