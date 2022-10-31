import React from "react";
import { Badge, Box, IconButton, Image, Flex, Spacer, Text } from '@chakra-ui/react';

import CommentEntry from "./CommentEntry";

const CommentList = (props) => {
    const main_comments = props.comments.filter((x) => x.link_id == props._id)
    const replies = props.comments.filter((x) => x.link_id != props._id)

    return(<Box>
        <Text fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1} fontSize={12}>Comments:</Text>
        {main_comments.map((comment) => (
            <CommentEntry info={comment} replies={replies.filter(x => x.link_id == comment._id)}/>
        ))}
    </Box>)
}

export default CommentList;