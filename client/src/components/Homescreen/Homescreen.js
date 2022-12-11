import React, { useState, useContext, useEffect, useRef } from 'react'
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
import ChangePasswordModal from '../Modals/Change-Password-Model';

import AuthContext from '../../auth';
import GlobalStoreContext from '../../store/ProjectStore';
const Homescreen = (props) => {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const [bigCardData, setBigCardData] = useState({})
    const [refetch, setRefetch] = useState(false)
    const verified = (auth.loggedIn?auth.user.verified:false)
    let history = useHistory();

    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    useEffect(() =>{
        console.log('homescreen effect')
        store.viewHomePage();
    }, [auth, history, store.markedItemforDeletion])
    // console.log(store.tileMapList)
    // console.log(store.yourList)
    
    //console.log(window.location.href.includes('localhost'))
    const autoLoggin = useRef(history.location.state ? history.location.state.AccountVerified : false);
    const autoChangePassword = useRef(history.location.state ? history.location.state.changePassword : false)
    const user_id = useRef(history.location.state?history.location.state.user_id:'Dont Exist')
    const request = useRef(history.location.state?history.location.state.request:null)

    console.log(history.location.state)
    console.log(user_id)

    const showSignUpModal = useDisclosure()
    const showLoginModal = useDisclosure({ defaultIsOpen: autoLoggin.current })
    const showForgetPasswordModal = useDisclosure()
    const showUpdateAccountModal = useDisclosure()
    const showItemCard = useDisclosure();
    const showCreateModal = useDisclosure();
    const showChangePassword = useDisclosure({ defaultIsOpen: autoChangePassword.current });
    //if (autoLoggin || autoChangePassword){history.replace(history.location.pathname, {AccountVerified: false, changePassword: false, _id: ''})}
    //console.log(autoChangePassword)

    const handleOpenBigItemCard = (newData) => {
        setBigCardData(newData)
        showItemCard.onOpen()
    }
    // store.viewHomePage()
    return (
        <div className='overlay'>
            <MainNavbar redirect={redirect}
                openSignUpModal={showSignUpModal.onOpen} openLoginModal={showLoginModal.onOpen}
                openUpdateAccountModal={showUpdateAccountModal.onOpen} loggedin={auth.loggedIn}
                user={auth.user}
            />
            <Box height={'100%'} width={'100%'}>
                <Flex gap={0} minH={'90%'} className='Homescreen-Main' maxH={'90%'}>
                    <HomescreenNew />
                    <HomescreenPopular openItemCard={handleOpenBigItemCard} popularSets={store.tileSetList} popularMaps={store.tileMapList} redirect={redirect}/>
                    <HomescreenQuick openItemCard={handleOpenBigItemCard} display={store.yourList} redirect={redirect}/>
                </Flex>
            </Box>
            {(verified)?<IconButton id='edit-button' size="lg" icon={<BsPencilSquare className='md-icon' size='30px' />} bg='transparent' onClick={showCreateModal.onOpen} />:<></>}
            <SignUpModal isOpen={showSignUpModal.isOpen} onClose={showSignUpModal.onClose} openLogin={showLoginModal.onOpen}/>
            <LoginModal isOpen={showLoginModal.isOpen} onClose={showLoginModal.onClose}
                openForgetPasswordModal={showForgetPasswordModal.onOpen} setRefetch={setRefetch}
            />
            <ForgetPasswordModal isOpen={showForgetPasswordModal.isOpen} onClose={showForgetPasswordModal.onClose} />
            <UpdateAccountModal isOpen={showUpdateAccountModal.isOpen} onClose={showUpdateAccountModal.onClose} />
            <ItemCardBig isOpen={showItemCard.isOpen} onClose={showItemCard.onClose} data={bigCardData} redirect={redirect}/>
            <CreateModal isOpen={showCreateModal.isOpen} onClose={showCreateModal.onClose} redirect={redirect}/>
            <ChangePasswordModal isOpen={showChangePassword.isOpen} onClose={showChangePassword.onClose} user_id={user_id.current} request={request.current}/>
        </div>)
}
//<IconButton size='lg' bg='transparent' icon={<MdCreate className='md-icon'/>} className='create-new-button' borderRadius={30} borderColor={'black'} variant='outline'/>

export default Homescreen;