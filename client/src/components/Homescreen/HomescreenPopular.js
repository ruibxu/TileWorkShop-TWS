import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import MainNavbar from '../Navbars/MainNavbar';
import { Flex, Container, Box} from '@chakra-ui/react';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const HomescreenPopular = () => {
    let history = useHistory();
	const redirect = async(route) => {
		history.push(route, {reload: true});
	}

    return (
        <Container minW={'46%'}>
            <Box bg='red'>
                content
            </Box>
        </Container>
        )
}

export default HomescreenPopular;