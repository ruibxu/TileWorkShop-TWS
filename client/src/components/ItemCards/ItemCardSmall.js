import { useContext, useState } from 'react'
import { Badge, Box, IconButton, Image, Flex, Spacer } from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
function ItemCardSmall(props) {
    // const {store} = useContext(GlobalStoreContext);
    // const {auth} = useContext(AuthContext);
    // limited sizes 375, 445.219
    const { title, owner, src, size} = props
    function handleLike() { }
    function handleUnlike() { }
    function handleDislike() { }
    function handleUnDislike() { }
    function handleExpand() { }
    function handleDelete() { }
    let cardElement =
        <Box w={(size)?size:'375px'} borderRadius='lg' bg='red' className='item-card'>
            <Flex alignItems='center'>
                <Image w={(size)?size:'375px'} height='200px' fit="none" src={src} marginRight={0}/>
            </Flex>
            <Flex alignItems="center" justifyContent={'space-between'} gap={0}>
                <Box>
                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                        {props.title}
                    </Box>
                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                        {"By: " + props.owner}
                    </Box>
                </Box>
                <Flex gap={10} alignItems={'center'} width='200px' className='align-right'>
                    <IconButton bg='transparent' icon={<AiOutlineHeart className='md-icon' />} ></IconButton>
                    <IconButton bg='transparent' icon={<FiThumbsUp className='md-icon' />} ></IconButton>
                    <IconButton bg='transparent' icon={<FiThumbsDown className='md-icon' />} ></IconButton>
                </Flex>
            </Flex>
        </Box>
    return cardElement
}
export default ItemCardSmall;