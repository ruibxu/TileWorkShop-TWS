import React, { useState, useContext, useEffect, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Textarea, Text, Icon
} from '@chakra-ui/react'
import { Badge, Box, IconButton, Image, Flex, Spacer } from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown, FiEye } from 'react-icons/fi'
import { HiThumbUp, HiThumbDown } from 'react-icons/hi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { GoComment } from 'react-icons/go'
import CommentList from "./CommentList";
import GlobalCommentStoreContext from "../../../store/CommentStore";
import GlobalStoreContext from "../../../store/ProjectStore";
import AuthContext from "../../../auth";

import image6 from '../../../04_Qiqi_02newyear_receive.png'
import DeleteCommentAlert from "../../Modals/DeleteComment-Alert";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
function ItemCardBig(props) {
    const { auth } = useContext(AuthContext)
    const { store } = useContext(GlobalStoreContext)
    const { commentStore } = useContext(GlobalCommentStoreContext)
    const { data } = props
    const [newComment, setNewComment] = useState('')
    const showDeleteComment = useDisclosure()
    const cancelRef = useRef()

    const user_id = (auth.loggedIn) ? auth.user._id : 'not logged in'
    const owner_id = (data.access) ? data.access.owner_id : 'no owner'
    const isOwner = (user_id == owner_id)

    const community = (store.currentItem) ? store.currentItem.community : null
    //console.log(community.liked_Users)
    //console.log(user_id)
    const liked = (community) ? community.liked_Users.includes(user_id) : false
    const disliked = (community) ? community.disliked_Users.includes(user_id) : false
    const favorited = (community) ? community.favorited_Users.includes(user_id) : false
    const project_id = data._id

    const isPublic = (data.access) ? data.access.public : true
    const handleComment = () => {
        let commenting = newComment
        // setNewComment('')
        commentStore.createComment({
            user_id: auth.user._id,
            link_id: project_id,
            alert_user_id: data.access.owner_id,
            project_id: project_id,
            content: commenting
        })
    }
    useEffect(() => {
        if (project_id) {
            if (data.type == "tilemap") {
                store.getTileMapById(project_id)
            } else {
                store.getTileSetById(project_id)
            }
        }
    }, [data])
    useEffect(()=>{
        handleOnOpen()
    },[props.isOpen])
    const handleDeleteComment = (_id) => {
        commentStore.markCommentForDeletion(_id)
        showDeleteComment.onOpen()
    }
    const handleView = () => {
        //store.setCurrentItem(data)
        //props.onClose()
        props.redirect(`/${data.type}/${project_id}`)
    }

    const handleLike = (event, value) => {
        if (!auth.loggedIn) { return }
        let payload = null;
        if (value == 0) { payload = { new_liked_user: user_id } }
        if (value == 1) { payload = { new_disliked_user: user_id } }
        if (value == 2) { payload = { new_favorite_user: user_id } }
        if (data.type == "tilemap") {
            store.updateTileMapCommunity(project_id, payload)
        } else {
            store.updateTileSetCommunity(project_id, payload)
        }
    }
    const handleOnOpen = () => {
        if (data.type == "tilemap") {
            store.updateTileMapCommunity(project_id, { views: true })
        } else {
            store.updateTileSetCommunity(project_id, { views: true })
        }
    }
    const lastEdited = new Date(data.lastEdited)
    const year = lastEdited.getFullYear()
    const month = lastEdited.getMonth() + 1
    const day = lastEdited.getDate()
    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose} >
                <ModalOverlay />
                <ModalContent height="800px" maxWidth="1000px">
                    <ModalHeader>
                        <Flex alignItems='center'>
                            <Image minW={'100%'} borderRadius='lg' maxW={'100%'} height='200px' fit="none" src={(data.src) ? data.src : image6} />
                            <Flex gap={2} alignItems={'center'}  >
                                <IconButton id="big-buttons" bg='transparent' disabled={!auth.loggedIn} onClick={(event) => handleLike(event, 2)}
                                    icon={(favorited) ? <AiFillHeart className='md-icon' /> : <AiOutlineHeart className='md-icon' />} ></IconButton>
                                <IconButton id="big-buttons" bg='transparent' disabled={!auth.loggedIn} onClick={(event) => handleLike(event, 0)}
                                    icon={(liked) ? <HiThumbUp className='md-icon' /> : <FiThumbsUp className='md-icon' />} ></IconButton>
                                <IconButton id="big-buttons" bg='transparent' disabled={!auth.loggedIn} onClick={(event) => handleLike(event, 1)}
                                    icon={(disliked) ? <HiThumbDown className='md-icon' /> : <FiThumbsDown className='md-icon' />} ></IconButton>
                            </Flex>
                        </Flex>

                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflowY={'scroll'}>
                        <Flex className="item-counter" gap={4} alignItems='center'>
                            <FiEye bg='transparent' size={'10px'} />
                            <Text fontSize={12} opacity={0.5}> {(store.currentItem) ? `${store.currentItem.community.views}` : 0} </Text>
                            <FiThumbsUp bg='transparent' size={'10px'} />
                            <Text fontSize={12} opacity={0.5}> {(store.currentItem) ? `${store.currentItem.community.likes}` : 0} </Text>
                            <FiThumbsDown bg='transparent' size={'10px'} />
                            <Text fontSize={12} opacity={0.5}>{(store.currentItem) ? `${store.currentItem.community.dislikes}` : 0}</Text>
                            <GoComment bg='transparent' size={'10px'} />
                            <Text fontSize={12} opacity={0.5}>{(commentStore.currentCommentList.length) ? `${commentStore.currentCommentList.length}` : 0}</Text>
                        </Flex>
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
                                    {isPublic ? "Public" : "Private"}
                                </Box>
                                <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                                    {`Last Updated: ${year}-${month}-${day}`}
                                </Box>
                            </Box>
                        </Flex>
                        <Textarea name='comment' placeholder='Leave a comment...' fontStyle="italic"
                            onBlur={(event) => setNewComment(event.target.value)} disabled={!auth.loggedIn}
                        />
                        <Flex>
                            <Spacer />
                            <Button colorScheme='blue' onClick={handleComment} size='sm' disabled={!auth.loggedIn}>
                                Comment
                            </Button>
                        </Flex>
                        <CommentList comments={commentStore.currentCommentList} _id={project_id} data={data} handleDeleteComment={handleDeleteComment} project_id={project_id} />
                    </ModalBody>
                    <ModalFooter>
                        <Flex width={'100%'}>
                            <Button colorScheme='yellow' mr={3} onClick={handleView} isDisabled={(!auth.loggedIn)}>
                                View
                            </Button>
                            <Spacer />
                            <Button colorScheme='red' mr={3} onClick={props.openDeleteModal} visibility={(!isOwner) ? 'hidden' : ''}>
                                Delete
                            </Button>
                            <Button colorScheme='blue' onClick={() => props.onClose()}>
                                Close
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <DeleteCommentAlert onClose={showDeleteComment.onClose} isOpen={showDeleteComment.isOpen} cancelRef={cancelRef} />
        </div>
    )
}
export default ItemCardBig;