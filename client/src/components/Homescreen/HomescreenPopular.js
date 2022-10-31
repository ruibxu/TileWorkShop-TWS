import React, { createContext, useContext, useEffect } from 'react'
import { Flex, Container, Box, Divider } from '@chakra-ui/react';
import ItemCardSmall from '../ItemCards/ItemCardSmall';

//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const HomescreenPopular = (props) => {
    return (
        <Container minW={'46%'}>
            <Box borderWidth='2px' borderRadius='xl' overflow='hidden' borderColor={'purple'} justify-content='space-between'>
                <Box className='popular-box-divider' minH='50%' overflow='hidden' minW='100%' padding={0}>
                    <Box className={'title-font'}>
                        Most Popular TileMaps:
                    </Box>
                    <Divider borderColor={'purple'} />
                    <Container minW={'100%'} maxW={'100%'}>
                        <Flex className='popular-display'>
                            <ItemCardSmall size={'100%'} data={props.data} openItemCard={props.openItemCard} />
                            <ItemCardSmall size={'100%'} data={props.data} openItemCard={props.openItemCard} />
                        </Flex>
                    </Container>
                    <Divider borderColor={'purple'} />
                </Box>

                <Box className='popular-box-divider' minH='50%' overflow='hidden' minW='100%' padding={0}>
                    <Box className={'title-font'}>
                        Most Popular TileSets:
                    </Box>
                    <Divider borderColor={'purple'} />
                    <Container minW={'100%'} maxW={'100%'}>
                        <Flex className='popular-display'>
                            <ItemCardSmall size={'100%'} data={props.data} openItemCard={props.openItemCard} />
                            <ItemCardSmall size={'100%'} data={props.data} openItemCard={props.openItemCard} />
                        </Flex>
                    </Container>
                </Box>
            </Box>
        </Container>
    )
}
export default HomescreenPopular;