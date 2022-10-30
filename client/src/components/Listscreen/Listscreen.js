import React, { useContext, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import MainNavbar from '../Navbars/MainNavbar/MainNavbar';
import { Flex, Box, Container, Spacer, Text} from '@chakra-ui/react';
import ListscreenSideBar from './ListscreenSideBar';
import ListscreenMain from './ListscreenMain';
import HomescreenNew from '../Homescreen/HomescreenNew';
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

    return (
        <div className='overlay'>
            <MainNavbar redirect={redirect}/>
            <Box height={'100%'} width={'100%'}>
            <Flex height={'100%'}>
                <ListscreenSideBar/>
                <ListscreenMain/>
            </Flex>
            </Box>
        </div>)
}

export default Listscreen;