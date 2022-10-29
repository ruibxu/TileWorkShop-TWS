import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import MainNavbar from '../Navbars/MainNavbar';
import { Flex, Container, Box, Divider} from '@chakra-ui/react';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const HomescreenPopular = (props) => {
    let history = useHistory();
	const redirect = async(route) => {
		history.push(route, {reload: true});
	}

    return (
        <Container minW={'46%'} >
            <Box borderWidth='2px' borderRadius='xl' overflow='hidden' borderColor={'purple'} minH={'90%'}>
                <Box className='popular-box-divider' minH={'50%'}>
                    <Box className={'title-font'}>
                        Most Popular TileMaps:
                    </Box>
                    <Divider borderColor={'purple'}/>
                    filler
                </Box>
                <Box className='popular-box-divider' minH='50%'>
                    <Box className={'title-font'}>
                        Most Popular TileSets:
                    </Box>
                    <Divider borderColor={'purple'}/>
                    filler
                </Box>
            </Box>
        </Container>
        )
}

export default HomescreenPopular;