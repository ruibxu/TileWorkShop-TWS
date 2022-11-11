import { useContext, useState } from 'react'
import { Badge, Box, IconButton, Image, Flex, Spacer } from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import GlobalCommentStoreContext from '../../store/CommentStore';
import GlobalStoreContext from '../../store/ProjectStore';

import image6 from '../../04_Qiqi_02newyear_receive.png'
function ItemCardSmall(props) {
    const {store} = useContext(GlobalStoreContext);
    // const {auth} = useContext(AuthContext);
    // limited sizes 375, 445.219
    const { commentStore } = useContext(GlobalCommentStoreContext)
    const { data, size } = props
    function handleLike() { }
    function handleUnlike() { }
    function handleDislike() { }
    function handleUnDislike() { }
    function handleDelete() { }

    function handleClickImage(){
        props.setData(data)
        props.openItemCard()
    }

    function handleDoubleClickImage(){
        store.setCurrentItem(data)
        props.redirect(`/${data.type}/${data._id}`)
    }

    if(!data){return <></>}

    let cardElement =
        <Box w={(size) ? size : '375px'} maxW={(size) ? size : '375px'} borderRadius='lg' className='item-card' borderWidth='1px' borderColor={'purple'} box-sizing='border-box' >
            <Flex alignItems='center' as = "button" width={"100%"} >
                <Image minW={'100%'} borderRadius='lg' maxW={'100%'} height='200px' fit="cover" src={(data.src)?data.src:image6} marginRight={0} 
                onClick ={()=>props.openItemCard(data)} onDoubleClick={handleDoubleClickImage}/>
            </Flex>
            <Flex alignItems="center" justifyContent='space-between' alignContent='stretch'>
                <Box minW='50%' paddingLeft={3}>
                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                        {(data.name) ? data.name : 'Untitled'}
                    </Box>
                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                        {"By: " + ((data.owner) ? data.owner.username : 'Unnamed')}
                    </Box>
                </Box>
                <Spacer />
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