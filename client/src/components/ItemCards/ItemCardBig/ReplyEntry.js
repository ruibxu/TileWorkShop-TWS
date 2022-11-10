import React, {useState, useContext} from "react";
import { Badge, Box, IconButton, Image, Flex, Spacer, Text, Button, Textarea} from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrFormDown, GrFormUp} from 'react-icons/gr'
import AuthContext from "../../../auth";
import GlobalCommentStoreContext from "../../../store/CommentStore";

const ReplyEntry = (props) => {
    const { auth } = useContext(AuthContext)
    const { commentStore } = useContext(GlobalCommentStoreContext)
    const { info, comment_id } = props
    const [edit, toggleEdit] = useState(false)
    const [content, setContent] = useState(info.content)
    const [reply, toggleReply] = useState(false)
    const [replyText, setReplyText] = useState(`@${info.owner.username}`)

    const user_id = (!auth.loggedin)?auth.user._id:''
    const reply_id = info._id

    let newContent = content

    const handleEditContent = () =>{
        //some backend stuff
        //------------------
        setContent(newContent)
        toggleEdit()
    }

    const handleCancelEdit = () => {
        toggleEdit()
    }

    const handleSaveReply = () => {
        commentStore.createComment({
            user_id:auth.user._id,
            link_id:comment_id,
            alert_user_id:(replyText.includes(`@${info.owner.username}`))?info.owner._id:comment_id,
            content: replyText
        })
        toggleReply()
    }

    const handleCancelReply = () => {
        toggleReply()
    }

    return(
        <Box width={'100%'} className="comment"  paddingLeft={3}>
            {(!edit)?(<><Flex>
                <Text fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1} >
                    {info.owner.username}
                </Text>
                <Spacer/>
                <Text fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1} opacity={0.3}>
                    {info.LastEdited}
                </Text>
            </Flex>
            <Text>{content}</Text>
            <Flex paddingLeft={3} gap={5}>
                <Flex>
                    <Flex  alignItems='center' gap={2}>
                        <Text className="comment-counts" fontSize={12} opacity={0.6}>{`${info.community.likes}`}</Text>
                        <IconButton icon={<FiThumbsUp size={'10px'}/>} size={'10px'}/>
                        <Text className="comment-counts" fontSize={12} opacity={0.6}>{`${info.community.dislikes}`}</Text>
                        <IconButton icon={<FiThumbsDown size={'10px'}/>} size={'10px'}/>
                    </Flex>
                    <Button size='10px' fontSize={13} bg='transparent'opacity={0.6} variant='link'
                        onClick={toggleReply}
                    >REPLY</Button>
                </Flex>
                <Spacer/>
                {(user_id == info.user_id)?<Flex alignItems='center' gap={2}>
                    <Button size='10px' fontSize={13} bg='transparent'opacity={0.6} variant='link'
                    onClick={()=>toggleEdit(true)}
                    >EDIT</Button>
                    <Button size='10px' fontSize={13} bg='transparent'opacity={0.6} variant='link'>
                        DELETE
                    </Button>
                </Flex>:(<></>)}
            </Flex>
            {/* reply related */}
            {(reply)?<>
            <Textarea name='comment' defaultValue={replyText} fontStyle="italic" 
                onBlur={(event)=>setReplyText(event.target.value)} placeholder='Leave a reply...'
            />
            <Flex gap={3}>
                <Spacer/>
                <Button colorScheme='red' onClick={handleCancelReply} size='sm'>
                    Cancel
                </Button>
                <Button colorScheme='blue' onClick={handleSaveReply} size='sm'>
                    Reply
                </Button>
            </Flex>
            </>:<></>}
            {/* reply related ends */}
            </>):(<>
            <Textarea name='comment' fontStyle="italic" 
                onBlur={(event)=>{newContent = event.target.value}} defaultValue={newContent}
            />
            <Flex gap={3}>
                <Spacer/>
                <Button colorScheme='red' onClick={handleCancelEdit} size='sm'>
                    Cancel
                </Button>
                <Button colorScheme='blue' onClick={handleEditContent} size='sm'>
                    Save
                </Button>
            </Flex></>)}
        </Box>
    )
}

export default ReplyEntry;