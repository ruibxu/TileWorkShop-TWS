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
import ItemCardBig from '../ItemCards/ItemCardBig';
import DeleteModal from '../Modals/Delete-Modal';

import image from '../../2kfVc.png';
const Homescreen = (props) => {
    const [loggedin, setLoggedin ] = useState('5')

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
    const data = {
        owner: "Not Yibo",
        name: "Super Mario Bros 1",
        src: image
    }

    return (
        <div className='overlay'>
            <MainNavbar redirect={redirect} 
                openSignUpModal={showSignUpModal.onOpen} openLoginModal={showLoginModal.onOpen}
                openUpdateAccountModal={showUpdateAccountModal.onOpen} loggedin={loggedin} setLoggedin={setLoggedin}
            />
            <Box height={'100%'} width={'100%'}>
                <Flex gap={0} minH={'90%'} className='Homescreen-Main'>
                    <HomescreenNew />
                    <HomescreenPopular openItemCard = {showItemCard.onOpen} data = {data}/>
                    <HomescreenQuick />
                </Flex>
            </Box>
            <IconButton id='edit-button' size = "lg" icon={<BsPencilSquare className='md-icon' size = '30px'/>} bg='transparent' />
            <SignUpModal isOpen={showSignUpModal.isOpen} onClose={showSignUpModal.onClose}/>
            <LoginModal isOpen={showLoginModal.isOpen} onClose={showLoginModal.onClose} openForgetPasswordModal={showForgetPasswordModal.onOpen}/>
            <ForgetPasswordModal isOpen={showForgetPasswordModal.isOpen} onClose={showForgetPasswordModal.onClose}/>
            <UpdateAccountModal isOpen={showUpdateAccountModal.isOpen} onClose={showUpdateAccountModal.onClose}/>
            <ItemCardBig isOpen={showItemCard.isOpen} onClose={showItemCard.onClose} data={data} openDeleteModal={showDeleteModal.onOpen}/>
            <DeleteModal isOpen={showDeleteModal.isOpen} onClose={showDeleteModal.onClose}/>
        </div>)
}
//<IconButton size='lg' bg='transparent' icon={<MdCreate className='md-icon'/>} className='create-new-button' borderRadius={30} borderColor={'black'} variant='outline'/>


export default Homescreen;