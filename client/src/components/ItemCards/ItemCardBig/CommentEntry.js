import React, {useState, useContext, useEffect} from "react";
import { Badge, Box, IconButton, Image, Flex, Spacer, Text, Button, Divider, Textarea} from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrFormDown, GrFormUp} from 'react-icons/gr'
import ReplyList from "./ReplyList";
import AuthContext from "../../../auth";
import GlobalCommentStoreContext from "../../../store/CommentStore";

const CommentEntry = (props) => {
    const { auth } = useContext(AuthContext)
    const { commentStore } = useContext(GlobalCommentStoreContext)
    const { data, info, replies} = props
    const [viewReplies, toggleViewReplies] = useState(false)
    const [edit, toggleEdit] = useState(false)
    const [content, setContent] = useState(info.content)
    const [reply, toggleReply] = useState(false)
    const [replyText, setReplyText] = useState('')

    const count = (replies)?replies.length:0
    const user_id = (auth.loggedIn)?auth.user._id:''
    const comment_id = info._id

    const reply_string = (count == 1)?'1 reply':`${count} replies`

    let newContent = content
    console.log(content)
    const handleEditContent = () =>{
        setContent(newContent)
        //some backend stuff
        commentStore.updateComment(comment_id, {
            user_id: user_id,
            content: newContent
        })
        //------------------
        //setContent(newContent)
        toggleEdit()
    }

    const handleCancelEdit = () => {
        toggleEdit()
    }

    const handleSaveReply = () => {
        commentStore.createComment({
            user_id:auth.user._id,
            link_id:comment_id,
            alert_user_id:info.owner._id,
            content: replyText
        })
        toggleReply()
    }

    const handleCancelReply = () => {
        toggleReply()
    }

    return(
        <Box width={'100%'} className="comment">
            {(!edit)?(<><Flex>
                <Text fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1} >
                    {info.owner.username}
                </Text>
                <Spacer/>
                <Flex>
                    <Text fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1} opacity={0.3}>
                        {info.lastEdited}
                    </Text>
                </Flex>
            </Flex>
            <Text>{content}</Text>
            <Flex paddingLeft={3} gap={5}>
                <Flex>
                    <Flex  alignItems='center' gap={2} mr={2}>
                    <Text className="comment-counts" fontSize={12} opacity={0.6}>{`${info.community.likes}`}</Text>
                    <IconButton icon={<FiThumbsUp size={'10px'}/>} size={'10px'} disabled={!auth.loggedIn}/>
                    <Text className="comment-counts" fontSize={12} opacity={0.6}>{`${info.community.dislikes}`}</Text>
                    <IconButton icon={<FiThumbsDown size={'10px'}/>} size={'10px'} disabled={!auth.loggedIn}/>
                    </Flex>
                    <Button size='10px' fontSize={13} bg='transparent'opacity={0.6} variant='link'
                        onClick={toggleReply} disabled={!auth.loggedIn}
                        >REPLY</Button>
                </Flex>
                <Spacer/>
                {(user_id == info.user_id)?(<Flex alignItems='center' gap={2}>
                    <Button size='10px' fontSize={13} bg='transparent'opacity={0.6} variant='link'
                    onClick={()=>toggleEdit(true)}>
                        EDIT
                    </Button>
                    <Button size='10px' fontSize={13} bg='transparent'opacity={0.6} variant='link'>
                        DELETE
                        </Button>
                </Flex>):(<></>)}
            </Flex>
            {/* reply related */}
            {(reply)?<>
            <Textarea name='comment' placeholder='Leave a reply...' fontStyle="italic" 
                onBlur={(event)=>setReplyText(event.target.value)} defaultValue={replyText}
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
            {(count)?
                (<Button leftIcon={(viewReplies)?<GrFormUp color='purple'/>:(<GrFormDown color='purple'/>)} size='10px' fontSize={13} 
                    bg='transparent' variant='link' color='purple' paddingLeft={3} onClick={()=>toggleViewReplies(!viewReplies)}>
                    {reply_string}
                </Button>):
            (<></>)}
            {(viewReplies)?
                (<ReplyList replies={replies} comment_id={comment_id}/>):(<></>)
            }
            <Divider/>
        </Box>
    )
}

export default CommentEntry;