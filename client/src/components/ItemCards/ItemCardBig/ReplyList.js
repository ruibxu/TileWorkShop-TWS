import React from "react";
import { Badge, Box, IconButton, Image, Flex, Spacer, Text } from '@chakra-ui/react';

import ReplyEntry from "./ReplyEntry";

const ReplyList = (props) => {
    const replies = props.replies
    console.log(replies)

    return(<Box>
        {replies.map((comment) => (
            <ReplyEntry info={comment} comment_id={props.comment_id}/>
        ))}
    </Box>)
}

export default ReplyList;