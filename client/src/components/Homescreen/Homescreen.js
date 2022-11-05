import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import MainNavbar from '../Navbars/MainNavbar/MainNavbar';
import { Flex, Container, Box, IconButton, useDisclosure } from '@chakra-ui/react';
import { MdCreate } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs'
import HomescreenNew from './HomescreenNew';
import HomescreenQuick from './HomescreenQuick';
import HomescreenPopular from './HomescreenPopular';

import SignUpModal from '../Modals/SignUp-Modal';
import LoginModal from '../Modals/Login-Modal';
import ForgetPasswordModal from '../Modals/ForgetPassword-Modal';
import UpdateAccountModal from '../Modals/UpdateAccount-Modal';
import ItemCardBig from '../ItemCards/ItemCardBig/ItemCardBig';
import DeleteModal from '../Modals/Delete-Modal';
import CreateModal from '../Modals/Create-Modal';
import AuthContext from '../../auth'
import image from '../../2kfVc.png';
import image2 from '../../NES - Super Mario Bros - World 1-2.png'
import image3 from '../../ryan-polito-viridian-forest-1.jpg'
import image4 from '../../tileset2.png'
import image5 from '../../tile_atlas.png'
const Homescreen = (props) => {
    const [loggedin, setLoggedin] = useState('5')
    const [bigCardData, setBigCardData] = useState({})
    //const {auth} = useContext(AuthContext);
    let history = useHistory();
    const redirect = async (route) => {
        history.push(route, { reload: true });
    }

    const showSignUpModal = useDisclosure()
    const showLoginModal = useDisclosure()
    const showForgetPasswordModal = useDisclosure()
    const showUpdateAccountModal = useDisclosure()
    const showItemCard = useDisclosure();
    const showDeleteModal = useDisclosure();
    const showCreateModal = useDisclosure();

    const data = [
        { _id: "1", owner: "Yibo", name: "Super Mario Bros 1-1", src: image },
        { _id: "2", owner: "Yibo", name: "Super Mario Bros 1-2", src: image2 },
        { _id: "3", owner: "Ruibo", name: "Forest", src: image3 },
        { _id: "4", owner: "Ruibo", name: "Farm", src: image4 },
        { _id: "5", owner: "Ruibo", name: "Garden", src: image5 }]

    const comments = [
        { _id:'6', link_id: '1', user: "Yibo Hater", content: "This map is Trash", LastEdited:"10/24/2022", community:{likes: 20, dislikes: 69420}},
        { _id:'7', link_id: '1', user: "Yibo Hater", content: "This map is Trash", LastEdited:"10/24/2022", community:{likes: 20, dislikes: 69420}},
        { _id:'8', link_id: '1', user: "Yibo Hater", content: "This map is Trash", LastEdited:"10/24/2022", community:{likes: 20, dislikes: 69420}},
        { _id:'9', link_id: '1', user: "Yibo Hater", content: "This map is Trash", LastEdited:"10/24/2022", community:{likes: 20, dislikes: 69420}},
        { _id:'10', link_id: '1', user: "Yibo Hater", content: "This map is Trash", LastEdited:"10/24/2022", community:{likes: 20, dislikes: 69420}},
        { _id:'11', link_id: '6', user: "Yibo Lover", content: "This map is Not Trash", LastEdited:"10/24/2022", community:{likes: 20, dislikes: 69420}},
        { _id:'12', link_id: '7', user: "Yibo Lover", content: "This map is Not Trash", LastEdited:"10/24/2022", community:{likes: 20, dislikes: 69420}},
        { _id:'13', link_id: '7', user: "Yibo Lover", content: "This map is Not Trash", LastEdited:"10/24/2022", community:{likes: 20, dislikes: 69420}}
    ]

    const handleOpenBigItemCard = (newData) => {
        setBigCardData(newData)
        showItemCard.onOpen()
    }

    return (
        <div className='overlay'>
            <MainNavbar redirect={redirect}
                openSignUpModal={showSignUpModal.onOpen} openLoginModal={showLoginModal.onOpen}
                openUpdateAccountModal={showUpdateAccountModal.onOpen} loggedin={loggedin} setLoggedin={setLoggedin}
            />
            <Box height={'100%'} width={'100%'}>
                <Flex gap={0} minH={'90%'} className='Homescreen-Main' maxH={'90%'}>
                    <HomescreenNew />
                    <HomescreenPopular openItemCard={handleOpenBigItemCard} data={data}/>
                    <HomescreenQuick openItemCard={handleOpenBigItemCard} data={data}/>
                </Flex>
            </Box>
            <IconButton id='edit-button' size="lg" icon={<BsPencilSquare className='md-icon' size='30px' />} bg='transparent' onClick={showCreateModal.onOpen}/>
            <SignUpModal isOpen={showSignUpModal.isOpen} onClose={showSignUpModal.onClose} />
            <LoginModal isOpen={showLoginModal.isOpen} onClose={showLoginModal.onClose} 
            openForgetPasswordModal={showForgetPasswordModal.onOpen} setLogin={setLoggedin}
            />
            <ForgetPasswordModal isOpen={showForgetPasswordModal.isOpen} onClose={showForgetPasswordModal.onClose} />
            <UpdateAccountModal isOpen={showUpdateAccountModal.isOpen} onClose={showUpdateAccountModal.onClose} />
            <ItemCardBig isOpen={showItemCard.isOpen} onClose={showItemCard.onClose} data={bigCardData} openDeleteModal={showDeleteModal.onOpen} comments={comments}/>
            <DeleteModal isOpen={showDeleteModal.isOpen} onClose={showDeleteModal.onClose} />
            <CreateModal isOpen={showCreateModal.isOpen} onClose={showCreateModal.onClose} />
        </div>)
}
//<IconButton size='lg' bg='transparent' icon={<MdCreate className='md-icon'/>} className='create-new-button' borderRadius={30} borderColor={'black'} variant='outline'/>


export default Homescreen;