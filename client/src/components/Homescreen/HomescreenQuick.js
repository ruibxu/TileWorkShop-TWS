import React, { useContext, useEffect } from 'react'
import { Flex, Container, Box, Divider, SimpleGrid} from '@chakra-ui/react';
import ItemCardSmall from '../ItemCards/ItemCardSmall';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const HomescreenQuick = (props) => {

    return (
        <Container minW={'21%'}>
            <Box borderWidth='2px' borderRadius='xl' overflow='hidden' borderColor={'purple'} minH={'100%'}>
                <Box className={'title-font'}>
                    Your Projects:
                </Box>
                <Divider />
                <Container minH={'90%'} minW={'100%'}>
                    <ItemCardSmall/>
                    <ItemCardSmall/>
                </Container>
            </Box>
        </Container>
        )
}

export default HomescreenQuick;