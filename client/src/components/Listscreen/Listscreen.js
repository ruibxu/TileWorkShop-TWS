import React, { useContext, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import MainNavbar from '../Navbars/MainNavbar/MainNavbar';
import { Flex, Box, Container, Spacer, Text, IconButton } from '@chakra-ui/react';
import { BsPencilSquare } from 'react-icons/bs'
import { useDisclosure } from '@chakra-ui/react';
import ListscreenSideBar from './ListscreenSideBar';
import ListscreenMain from './ListscreenMain';
import HomescreenNew from '../Homescreen/HomescreenNew';

import SignUpModal from '../Modals/SignUp-Modal';
import LoginModal from '../Modals/Login-Modal';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const Listscreen = () => {
    let history = useHistory();
	const redirect = async(route) => {
		history.push(route, {reload: true});
	}

    const showSignUpModal = useDisclosure()
    const showLoginModal = useDisclosure()
    const showForgetPasswordModal = useDisclosure()

    return (
        <div className='overlay'>
            <MainNavbar redirect={redirect} openSignUpModal={showSignUpModal.onOpen} openLoginModal={showLoginModal.onOpen}/>
            <Box height={'100%'} width={'100%'}>
                <Flex height={'100%'}>
                    <ListscreenSideBar/>
                    <ListscreenMain/>
                </Flex>
            </Box>
            <IconButton id='edit-button' size = "lg" icon={<BsPencilSquare className='md-icon' size = '30px'/>} bg='transparent' />

            <SignUpModal isOpen={showSignUpModal.isOpen} onClose={showSignUpModal.onClose}/>
            <LoginModal isOpen={showLoginModal.isOpen} onClose={showLoginModal.onClose}/>

        </div>)
}

export default Listscreen;