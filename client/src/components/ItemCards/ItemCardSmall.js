import { useContext, useState } from 'react'
import { Badge, Box, IconButton, Image, Flex, Spacer } from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
function ItemCardSmall(props) {
    // const {store} = useContext(GlobalStoreContext);
    // const {auth} = useContext(AuthContext);
    // limited sizes 375, 445.219
    const { name, owner, size, src} = props
    function handleLike() { }
    function handleUnlike() { }
    function handleDislike() { }
    function handleUnDislike() { }
    function handleExpand() { }
    function handleDelete() { }
    let cardElement =
        <Box w={(size)?size:'375px'} maxW={(size)?size:'375px'} borderRadius='lg' className='item-card' borderWidth='1px' borderColor={'purple'} box-sizing='border-box'>
            <Flex alignItems='center'>
                <Image minW={'100%'}  borderRadius='lg' maxW={'100%'} height='200px' fit="none" src={src} marginRight={0}/>
            </Flex>
            <Flex alignItems="center" justifyContent='space-between' alignContent='stretch'>
                <Box minW='50%'>
                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                        {(props.name)?props.name:'Untitled'}
                    </Box>
                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                        {"By: " + ((props.owner)?props.owner:'Unnamed')}
                    </Box>
                </Box>
                <Spacer/>
                <Flex gap={2} alignItems={'center'} width='140px'>
                    <IconButton bg='transparent' icon={<AiOutlineHeart className='md-icon' />} ></IconButton>
                    <IconButton bg='transparent' icon={<FiThumbsUp className='md-icon' />} ></IconButton>
                    <IconButton bg='transparent' icon={<FiThumbsDown className='md-icon' />} ></IconButton>
                </Flex>
            </Flex>
        </Box>
    return cardElement
}
export default ItemCardSmall;