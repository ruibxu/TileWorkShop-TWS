import React, {useState} from "react";
import { Badge, Box, IconButton, Image, Flex, Spacer, Text, Button} from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrFormDown, GrFormUp} from 'react-icons/gr'

const ReplyEntry = (props) => {
    const { info} = props


    return(
        <Box width={'100%'} className="comment"  paddingLeft={3}>
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
        </Box>
    )
}

export default ReplyEntry;