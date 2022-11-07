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
    const [bigCardData, setBigCardData] = useState({})
    const [page, setPage] = useState(1)
    const verified = (auth.loggedIn?auth.user.verified:false)

    let history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    const access_default = history.location.state?`${history.location.state.default}`:0

    const showSignUpModal = useDisclosure()
    const showLoginModal = useDisclosure()
    const showForgetPasswordModal = useDisclosure()
    const showUpdateAccountModal = useDisclosure()
    const showItemCard = useDisclosure();
    const showDeleteModal = useDisclosure();
    const showCreateModal = useDisclosure();


    const data = [
        { _id: "1", owner: "Yibo", name: "Super Mario Bros 1-1", src: image, type: 1},
        { _id: "2", owner: "Yibo", name: "Super Mario Bros 1-2", src: image2, type: 1},
        { _id: "3", owner: "Ruibo", name: "Forest", src: image3, type: 1},
        { _id: "4", owner: "Ruibo", name: "Farm", src: image4, type: 0},
        { _id: "5", owner: "Ruibo", name: "Garden", src: image5, type: 0},
        { _id: "14", owner: "Jimmy", name: "QiQi?", src: image6, type: 0}]
    
    const data2 = [
        { _id: "15", owner: "Yajie", name: "Alebdo", src: i1, type: 1},
        { _id: "16", owner: "Yajie", name: "Ganyu1", src: i2, type: 1},
        { _id: "17", owner: "Yajie", name: "Ganyu2", src: i3, type: 1},
        { _id: "18", owner: "Jimmy", name: "Xingqiu1", src: i4, type: 1},
        { _id: "19", owner: "Jimmy", name: "Xingqiu2", src: i5, type: 1},
        { _id: "20", owner: "Jimmy", name: "QiQi??", src: i6, type: 1}
    ]

    const comments = [
        { _id: '6', link_id: '1', user: "Yibo Hater", content: "This map is Trash", LastEdited: "10/24/2022", community: { likes: 20, dislikes: 69420 } },
        { _id: '7', link_id: '1', user: "Yibo Hater", content: "This map is Trash", LastEdited: "10/24/2022", community: { likes: 20, dislikes: 69420 } },
        { _id: '8', link_id: '1', user: "Yibo Hater", content: "This map is Trash", LastEdited: "10/24/2022", community: { likes: 20, dislikes: 69420 } },
        { _id: '9', link_id: '1', user: "Yibo Hater", content: "This map is Trash", LastEdited: "10/24/2022", community: { likes: 20, dislikes: 69420 } },
        { _id: '10', link_id: '1', user: "Yibo Hater", content: "This map is Trash", LastEdited: "10/24/2022", community: { likes: 20, dislikes: 69420 } },
        { _id: '11', link_id: '6', user: "Yibo Lover", content: "This map is Not Trash", LastEdited: "10/24/2022", community: { likes: 20, dislikes: 69420 } },
        { _id: '12', link_id: '7', user: "Yibo Lover", content: "This map is Not Trash", LastEdited: "10/24/2022", community: { likes: 20, dislikes: 69420 } },
        { _id: '13', link_id: '7', user: "Yibo Lover", content: "This map is Not Trash", LastEdited: "10/24/2022", community: { likes: 20, dislikes: 69420 } }
    ]

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
                    <ListscreenSideBar default={access_default}/>
                    <ListscreenMain openItemCard={handleOpenBigItemCard} data={(page === 1)?data:data2} page={page} setPage={setPage}/>
                </Flex>
            </Box>
            {(verified)?<IconButton id='edit-button' size="lg" icon={<BsPencilSquare className='md-icon' size='30px' />} bg='transparent' onClick={showCreateModal.onOpen} />:<></>}

            <SignUpModal isOpen={showSignUpModal.isOpen} onClose={showSignUpModal.onClose} />
            <LoginModal isOpen={showLoginModal.isOpen} onClose={showLoginModal.onClose} 
            openForgetPasswordModal={showForgetPasswordModal.onOpen}
            />
            <ForgetPasswordModal isOpen={showForgetPasswordModal.isOpen} onClose={showForgetPasswordModal.onClose} />
            <UpdateAccountModal isOpen={showUpdateAccountModal.isOpen} onClose={showUpdateAccountModal.onClose} />
            <ItemCardBig isOpen={showItemCard.isOpen} onClose={showItemCard.onClose} openDeleteModal={showDeleteModal.onOpen} data={bigCardData} comments={comments} />
            <DeleteModal isOpen={showDeleteModal.isOpen} onClose={showDeleteModal.onClose} />
            <CreateModal isOpen={showCreateModal.isOpen} onClose={showCreateModal.onClose} />
        </div>)
}

export default Listscreen;