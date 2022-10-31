import React, {useState} from "react";
import { Badge, Box, IconButton, Image, Flex, Spacer, Text, Button, Divider} from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrFormDown, GrFormUp} from 'react-icons/gr'
import ReplyList from "./ReplyList";

const CommentEntry = (props) => {
    const [viewReplies, toggleViewReplies] = useState(false)

    const { info, replies} = props
    const count = (replies)?replies.length:0

    const reply_string = (count == 1)?'1 reply':`${count} replies`

    return(
        <Box width={'100%'} className="comment">
            <Flex>
                <Text fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1} >
                    {info.user}
                </Text>
                <Spacer/>
                <Text fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1} opacity={0.3}>
                    {info.LastEdited}
                </Text>
            </Flex>
            <Text>{info.content}</Text>
            <Flex paddingLeft={3} gap={5}>
                <Flex  alignItems='center' gap={2}>
                <Text className="comment-counts" fontSize={12} opacity={0.3}>{`${info.community.likes}`}</Text>
                <IconButton icon={<FiThumbsUp size={'10px'}/>} size={'10px'}/>
                <Text className="comment-counts" fontSize={12} opacity={0.5}>{`${info.community.dislikes}`}</Text>
                <IconButton icon={<FiThumbsDown size={'10px'}/>} size={'10px'}/>
                </Flex>
                <Button size='10px' fontSize={13} bg='transparent'opacity={0.5} variant='link'>REPLY</Button>
            </Flex>
            {(count)?
                (<Button leftIcon={(viewReplies)?<GrFormUp color='purple'/>:(<GrFormDown color='purple'/>)} size='10px' fontSize={13} 
                    bg='transparent' variant='link' color='purple' paddingLeft={3} onClick={()=>toggleViewReplies(!viewReplies)}>
                    {reply_string}
                </Button>):
            (<></>)}
            {(viewReplies)?
                (<ReplyList replies={replies}/>):(<></>)
            }
            <Divider/>
        </Box>
    )
}

export default CommentEntry;