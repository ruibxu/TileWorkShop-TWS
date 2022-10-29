import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import MainNavbar from '../Navbars/MainNavbar';
import { Flex, Container, Box} from '@chakra-ui/react';
import HomescreenNew from './HomescreenNew';
import HomescreenQuick from './HomescreenQuick';
import HomescreenPopular from './HomescreenPopular';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const Homescreen = (props) => {
    let history = useHistory();
	const redirect = async(route) => {
		history.push(route, {reload: true});
	}

    return (
        <div className='overlay'>
            <MainNavbar redirect={redirect}/>
            <Box height={'100%'}>
                <Flex gap={4} minH={'100%'} minWidth='max-content' className='Homescreen-Main'>
                    <HomescreenNew/>
                    <HomescreenPopular/>
                    <HomescreenQuick/>
                </Flex>
            </Box>
        </div>)
}

export default Homescreen;