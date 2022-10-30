import React, { useContext, useEffect} from 'react'
import { Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import ItemCardSmall from '../ItemCards/ItemCardSmall';
import image from '../../2kfVc.png';


const ListscreenList = (props) => {
    return (
        <Box height={'100%'} flex='1' padding={'3%'} paddingTop={'5%'} className='identify'>
            <SimpleGrid columns={3} spacing={10} width={'100%'}className='identi'>
                <ItemCardSmall size='100%'/>
                <ItemCardSmall size='100%'/>
                <ItemCardSmall size='100%'/>
                <ItemCardSmall size='100%'/>
                <ItemCardSmall size='100%'/>
                <ItemCardSmall size='100%'/>
            </SimpleGrid>
        </Box>
    )
}

export default ListscreenList;