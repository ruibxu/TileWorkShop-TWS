import { useContext, useState } from 'react'
import { Badge, Box, IconButton, Image, Flex, Spacer } from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { HiThumbUp, HiThumbDown } from 'react-icons/hi'
import { AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import GlobalCommentStoreContext from '../../store/CommentStore';
import GlobalStoreContext from '../../store/ProjectStore';
import AuthContext from '../../auth';
import image6 from '../../04_Qiqi_02newyear_receive.png'
function ItemCardSmall(props) {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    // limited sizes 375, 445.219
    const { commentStore } = useContext(GlobalCommentStoreContext)
    const { data, size } = props
    function handleUnlike() { }
    function handleDislike() { }
    function handleUnDislike() { }
    function handleDelete() { }

    function handleClickImage(){
        props.setData(data)
        props.openItemCard()
    }

    const handleLike = (event, value) => {
        if (!auth.loggedIn){return}
        let payload = null;
        if (value == 0){payload = {new_liked_user: user_id}}
        if (value == 1){payload = {new_disliked_user: user_id}}
        if (value == 2){payload = {new_favorite_user: user_id}}
        if (data.type == "tilemap") {
            store.updateTileMapCommunity(data._id, payload)
        } else {
            store.updateTileSetCommunity(data._id, payload)
        }
    }

    function handleDoubleClickImage(){
        store.setCurrentItem(data)
        props.redirect(`/${data.type}/${data._id}`)
    }

    if(!data){return <></>}

    const community = data.community
    const user_id = (auth.loggedIn) ? auth.user._id : 'not logged in'
    const owner_id = (data.access) ? data.access.owner_id : 'no owner'
    const isOwner = (user_id == owner_id)

    const liked = (community)?community.liked_Users.includes(user_id):false
    const disliked = (community)?community.disliked_Users.includes(user_id):false
    const favorited = (community)?community.favorited_Users.includes(user_id):false

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
                    <IconButton bg='transparent' disabled={!auth.loggedIn} onClick={(event) => handleLike(event, 2)} 
                    icon={(favorited)?<AiFillHeart className='md-icon' />:<AiOutlineHeart className='md-icon' />} ></IconButton>
                    <IconButton bg='transparent' disabled={!auth.loggedIn} onClick={(event) => handleLike(event, 0)} 
                    icon={(liked)?<HiThumbUp className='md-icon' />:<FiThumbsUp className='md-icon' />} ></IconButton>
                    <IconButton bg='transparent' disabled={!auth.loggedIn} onClick={(event) => handleLike(event, 1)} 
                    icon={(disliked)?<HiThumbDown className='md-icon' />:<FiThumbsDown className='md-icon' />} ></IconButton>
                </Flex>
            </Flex>
        </Box>
    return cardElement
}
export default ItemCardSmall;