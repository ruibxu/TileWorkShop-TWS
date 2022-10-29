import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import MainNavbar from '../Navbars/MainNavbar';
import { Flex, Container, Box, Divider} from '@chakra-ui/react';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const HomescreenNew = (props) => {
    let history = useHistory();
	const redirect = async(route) => {
		history.push(route, {reload: true});
	}

    return (
        <Container minW={'21%'}>
            <Box borderWidth='2px' borderRadius='xl' overflow='hidden' borderColor={'purple'} minH={'90%'}>
                <Box className={'title-font'}>
                    What's New:
                </Box>
                <Divider />
                filler
            </Box>
        </Container>
        )
}

export default HomescreenNew;