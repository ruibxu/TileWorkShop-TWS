import React, {useContext, useEffect, useState} from "react";
import { Badge, Box, IconButton, Image, Flex, Spacer, Text } from '@chakra-ui/react';
import GlobalCommentStoreContext from "../../../store/CommentStore";

import CommentEntry from "./CommentEntry";

const CommentList = (props) => {
    const { data } = props
    const { commentStore } = useContext(GlobalCommentStoreContext)
    const { comment_list, setCommentList} = useState([])
    useEffect(()=>{
        if(data || commentStore.refetch){
            console.log('working')
            console.log(data._id)
            commentStore.getCommentsByLink(data._id)
        }
    }, [data, commentStore.currentComment])
    console.log('list refreshed')
    
    const main_comments = props.comments.filter((x) => x.link_id == props._id)
    const replies = props.comments.filter((x) => x.link_id != props._id)

    return(<Box>
        <Text fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1} fontSize={12}>Comments:</Text>
        {main_comments.map((comment) => (
            <CommentEntry info={comment} replies={replies.filter(x => x.link_id == comment._id)} data={data}/>
        ))}
    </Box>)
}

export default CommentList;