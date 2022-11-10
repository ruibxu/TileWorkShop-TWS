import React, {useState, useContext, useEffect} from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Textarea, Text, Icon
} from '@chakra-ui/react'
import { Badge, Box, IconButton, Image, Flex, Spacer } from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { GoComment } from 'react-icons/go'
import CommentList from "./CommentList";
import GlobalCommentStoreContext from "../../../store/CommentStore";
import AuthContext from "../../../auth";

import image6 from '../../../04_Qiqi_02newyear_receive.png'
function ItemCardBig(props) {
    const { auth } = useContext(AuthContext)
    const { commentStore } = useContext(GlobalCommentStoreContext)
    const { data } = props
    const [ newComment, setNewComment ] = useState('')

    const isPublic = (data.access)?data.access.public:true

    useEffect(()=>{
        if(data){
            console.log(data._id)
            commentStore.getCommentsByLink(data._id)
        }
    }, [data, commentStore.currentComment])
    console.log(commentStore.currentCommentList)

    const handleComment = () => {
        commentStore.createComment({
            user_id:auth.user._id,
            link_id:data._id,
            alert_user_id:data.access.owner_id,
            content: newComment
        })
        console.log(newComment)
    }

    const lastEdited = new Date(data.lastEdited)
    const year = lastEdited.getFullYear()
    const month = lastEdited.getMonth()+1
    const day = lastEdited.getDate()

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent height="800px" maxWidth="1000px">
                    <ModalHeader>
                        <Flex alignItems='center'>
                            <Image minW={'100%'} borderRadius='lg' maxW={'100%'} height='200px' fit="none" src={(data.src)?data.src:image6} />
                            <Flex gap={2} alignItems={'center'}  >
                                <IconButton id="big-buttons" bg='transparent' icon={<AiOutlineHeart className='md-icon' />} ></IconButton>
                                <IconButton id="big-buttons" bg='transparent' icon={<FiThumbsUp className='md-icon' />} ></IconButton>
                                <IconButton id="big-buttons" bg='transparent' icon={<FiThumbsDown className='md-icon' />} ></IconButton>
                            </Flex>
                            <Flex className="item-counter" gap={4} alignItems='center'>
                                <Text fontSize={12} opacity={0.5}>{`412347`}</Text>
                                <FiThumbsUp bg='transparent' size={'10px'} />
                                <Text fontSize={12} opacity={0.5}>{`14124`}</Text>
                                <FiThumbsDown bg='transparent' size={'10px'} />
                                <Text fontSize={12} opacity={0.5}>{`69420`}</Text>
                                <GoComment bg='transparent' size={'10px'} />
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
                                    {"By: " + ((data.owner) ? data.owner.username : 'Unnamed')}
                                </Box>
                            </Box>
                            <Box minW='50%' align="right">
                                <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                                    {isPublic?"Public":"Private"}
                                </Box>
                                <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                                    {`Last Updated: ${year}-${month}-${day}`}
                                </Box>
                            </Box>
                        </Flex>
                        <Textarea name='comment' placeholder='Leave a comment...' fontStyle="italic" 
                            onBlur={(event)=>setNewComment(event.target.value)}
                        />
                        <Flex>
                            <Spacer/>
                            <Button colorScheme='blue' onClick={handleComment} size='sm'>
                                Comment
                            </Button>
                        </Flex>
                        <CommentList comments={commentStore.currentCommentList} _id={data._id} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='yellow' mr={3} onClick={() => props.onClose()}>
                            View
                        </Button>
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