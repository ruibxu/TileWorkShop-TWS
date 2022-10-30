import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import MainNavbar from '../Navbars/MainNavbar/MainNavbar';
import { Flex, Container, Box, IconButton, useDisclosure } from '@chakra-ui/react';
import { MdCreate } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs'
import HomescreenNew from './HomescreenNew';
import HomescreenQuick from './HomescreenQuick';
import HomescreenPopular from './HomescreenPopular';
import ItemCardBig from '../ItemCards/ItemCardBig';
import image from '../../2kfVc.png';
const Homescreen = (props) => {
    let history = useHistory();
    const redirect = async (route) => {
        history.push(route, { reload: true });
    }
    const showItemCard = useDisclosure();
    const data = {
        owner: "Not Yibo",
        name: "Super Mario Bros 1",
        src: image
    }
    return (
        <div className='overlay'>
            <MainNavbar redirect={redirect} />
            <Box height={'100%'} width={'100%'}>
                <Flex gap={0} minH={'90%'} className='Homescreen-Main'>
                    <HomescreenNew />
                    <HomescreenPopular openItemCard = {showItemCard.onOpen} data = {data}/>
                    <HomescreenQuick />
                </Flex>
            </Box>
            <IconButton id='edit-button' size = "lg" icon={<BsPencilSquare className='md-icon' size = '30px'/>} bg='transparent' />
            <ItemCardBig isOpen = {showItemCard.isOpen} onClose = {showItemCard.onClose} data = {data}/>
        </div>)
}
//<IconButton size='lg' bg='transparent' icon={<MdCreate className='md-icon'/>} className='create-new-button' borderRadius={30} borderColor={'black'} variant='outline'/>


export default Homescreen;