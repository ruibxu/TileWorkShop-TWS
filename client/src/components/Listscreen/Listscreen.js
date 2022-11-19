import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import MainNavbar from '../Navbars/MainNavbar/MainNavbar';
import { Flex, Box, Container, Spacer, Text, IconButton } from '@chakra-ui/react';
import { BsPencilSquare } from 'react-icons/bs'
import { useDisclosure } from '@chakra-ui/react';
import ListscreenSideBar from './ListscreenSideBar';
import ListscreenMain from './ListscreenMain';
import HomescreenNew from '../Homescreen/HomescreenNew';
import AuthContext from '../../auth';
import GlobalStoreContext from '../../store/ProjectStore';
import SignUpModal from '../Modals/SignUp-Modal';
import LoginModal from '../Modals/Login-Modal';
import ForgetPasswordModal from '../Modals/ForgetPassword-Modal';
import UpdateAccountModal from '../Modals/UpdateAccount-Modal';
import ItemCardBig from '../ItemCards/ItemCardBig/ItemCardBig';
import DeleteModal from '../Modals/Delete-Modal';
import CreateModal from '../Modals/Create-Modal';


import image from '../../2kfVc.png';
import image2 from '../../NES - Super Mario Bros - World 1-2.png'
import image3 from '../../ryan-polito-viridian-forest-1.jpg'
import image4 from '../../tileset2.png'
import image5 from '../../tile_atlas.png'
import image6 from '../../04_Qiqi_02newyear_receive.png'

import i1 from '../../01_Albedo_02newyear_omochi.png';
import i2 from '../../02_Ganyu_01xmas_reindeer.png';
import i3 from '../../02_Ganyu_02newyear_omochi.png';
import i4 from '../../03_Xingqiu_01xmas_song.png';
import i5 from '../../03_Xingqiu_02newyear_Faichun.png'
import i6 from '../../04_Qiqi_01xmas_illumi.png'

const Listscreen = (props) => {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext)
    const [bigCardData, setBigCardData] = useState({})
    const [page, setPage] = useState(1)
    const verified = (auth.loggedIn ? auth.user.verified : false)

    let history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    const access_default = history.location.state ? `${history.location.state.default}` : 0

    const showSignUpModal = useDisclosure()
    const showLoginModal = useDisclosure()
    const showForgetPasswordModal = useDisclosure()
    const showUpdateAccountModal = useDisclosure()
    const showItemCard = useDisclosure();
    const showCreateModal = useDisclosure();

    useEffect(() => {
        store.search()
    }, [auth, store.markedItemforDeletion])

    const handleOpenBigItemCard = (newData) => {
        setBigCardData(newData)
        showItemCard.onOpen()
    }

    return (
        <div className='overlay'>
            <MainNavbar redirect={redirect}
                openSignUpModal={showSignUpModal.onOpen} openLoginModal={showLoginModal.onOpen}
                openUpdateAccountModal={showUpdateAccountModal.onOpen} loggedin={auth.loggedIn}
                user={auth.user}
            />
            <Box height={'100%'} width={'100%'}>
                <Flex height={'100%'}>
                    <ListscreenSideBar default={access_default} />
                    <ListscreenMain openItemCard={handleOpenBigItemCard} data={store.yourList} page={page} setPage={setPage}
                        redirect={redirect}
                    />
                </Flex>
            </Box>
            {(verified) ? <IconButton id='edit-button' size="lg" icon={<BsPencilSquare className='md-icon' size='30px' />} bg='transparent' onClick={showCreateModal.onOpen} /> : <></>}

            <SignUpModal isOpen={showSignUpModal.isOpen} onClose={showSignUpModal.onClose} openLogin={showLoginModal.onOpen}/>
            <LoginModal isOpen={showLoginModal.isOpen} onClose={showLoginModal.onClose}
                openForgetPasswordModal={showForgetPasswordModal.onOpen}
            />
            <ForgetPasswordModal isOpen={showForgetPasswordModal.isOpen} onClose={showForgetPasswordModal.onClose} />
            <UpdateAccountModal isOpen={showUpdateAccountModal.isOpen} onClose={showUpdateAccountModal.onClose} />
            <ItemCardBig isOpen={showItemCard.isOpen} onClose={showItemCard.onClose} data={bigCardData} redirect={redirect}/>
            <CreateModal isOpen={showCreateModal.isOpen} onClose={showCreateModal.onClose} redirect={redirect} />
        </div>)
}

export default Listscreen;