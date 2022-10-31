import React, { useContext, useEffect} from 'react'
import { Flex, Box, Center, Container, Text, Icon, IconButton} from '@chakra-ui/react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import ListscreenList from './ListscreenList';


const ListscreenMain = (props) => {
    return (
        <Box height={'100%'} flex='1'>
            <Flex height={'100%'}>
                <Center minW='50px' w='50px'>
                    <IconButton bg='transparent' icon={<MdArrowBackIos className='md-icon'/>} paddingLeft={4} minW={'100%'} minH={'100%'} colorScheme='gray' borderRadius={0}/>
                </Center>
                <Box className={'main-list'} flex='1' >
                    <ListscreenList openItemCard={props.openItemCard} data = {props.data}/>
                </Box>
                <Center minW='50px' w='50px'>
                    <IconButton bg='transparent' icon={<MdArrowForwardIos className='md-icon'/>}  minW={'100%'} minH={'100%'} colorScheme='gray' borderRadius={0}/>
                </Center>
            </Flex>
        </Box>
    )
}

export default ListscreenMain;