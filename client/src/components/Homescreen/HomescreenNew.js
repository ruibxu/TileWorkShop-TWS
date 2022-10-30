import React, { useContext, useEffect } from 'react'
import { Flex, Container, Box, Divider} from '@chakra-ui/react';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const HomescreenNew = (props) => {

    return (
        <Container minW={'21%'}>
            <Box borderWidth='2px' borderRadius='xl' overflow='hidden' borderColor={'purple'} minH={'100%'}>
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