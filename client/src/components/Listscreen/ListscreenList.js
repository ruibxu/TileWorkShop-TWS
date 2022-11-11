import React, { useContext, useEffect} from 'react'
import { useDisclosure } from '@chakra-ui/react';
import { Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import ItemCardSmall from '../ItemCards/ItemCardSmall';



const ListscreenList = (props) => {

    const {data} = props

    return (
        <Box flex='1' padding={'3%'} paddingTop={'5%'} className='identify'>
            <SimpleGrid columns={3} spacing={10} width={'100%'}className='identi'>
                <ItemCardSmall size='100%' data={data[0]} openItemCard={props.openItemCard} redirect={props.redirect}/>
                <ItemCardSmall size='100%' data={data[1]} openItemCard={props.openItemCard} redirect={props.redirect}/>
                <ItemCardSmall size='100%' data={data[2]} openItemCard={props.openItemCard} redirect={props.redirect}/>
                <ItemCardSmall size='100%' data={data[3]} openItemCard={props.openItemCard} redirect={props.redirect}/>
                <ItemCardSmall size='100%' data={data[4]} openItemCard={props.openItemCard} redirect={props.redirect}/>
                <ItemCardSmall size='100%' data={data[5]} openItemCard={props.openItemCard} redirect={props.redirect}/>
            </SimpleGrid>
        </Box>
    )
}

export default ListscreenList;