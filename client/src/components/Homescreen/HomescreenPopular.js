import React, { useContext, useEffect } from 'react'
import { Flex, Container, Box, Divider} from '@chakra-ui/react';
import ItemCardSmall from '../ItemCards/ItemCardSmall';
import image from '../../2kfVc.png';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const HomescreenPopular = (props) => {

    const data = {
        owner: "Not Yibo",
        name: "Super Mario Bros 1",
        src: image
    }

    return (
        <Container minW={'46%'}>
            <Box borderWidth='2px' borderRadius='xl' overflow='hidden' borderColor={'purple'} justify-content='space-between'>
                <Box className='popular-box-divider' minH='50%' overflow='hidden' minW='100%' padding={0}>
                    <Box className={'title-font'}>
                        Most Popular TileMaps:
                    </Box>
                    <Divider borderColor={'purple'}/>
                    <Container minW={'100%'} maxW={'100%'}>
                        <Flex className='popular-display'>
                            <ItemCardSmall size={'100%'} data={data}/>
                            <ItemCardSmall size={'100%'} data={data}/>
                        </Flex>
                    </Container>
                    <Divider borderColor={'purple'}/>
                </Box>
                
                <Box className='popular-box-divider' minH='50%' overflow='hidden' minW='100%' padding={0}>
                    <Box className={'title-font'}>
                        Most Popular TileSets:
                    </Box>
                    <Divider borderColor={'purple'}/>
                    <Container minW={'100%'} maxW={'100%'}>
                        <Flex className='popular-display'>
                            <ItemCardSmall size={'100%'} data={data}/>
                            <ItemCardSmall size={'100%'} data={data}/>
                        </Flex>
                    </Container>
                </Box>
            </Box>
        </Container>
        )
}

export default HomescreenPopular;