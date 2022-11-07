import React, { useContext, useEffect, useState } from 'react'
import { Flex, Box, Center, Container, Text, Icon, IconButton } from '@chakra-ui/react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import ListscreenList from './ListscreenList';

const ListscreenMain = (props) => {
    
    const handleLeftClick = () => {
        props.setPage(props.page - 1)
    }
    const handleRightClick = () => {
        props.setPage(props.page + 1)
    }
    return (
        <Box height={'100%'} flex='1'>
            <Flex height={'100%'}>
                <Center minW='50px' w='50px'>
                    <IconButton onClick={handleLeftClick} isDisabled={(props.page === 0) ? true : false} bg='transparent' icon={<MdArrowBackIos className='md-icon' />} paddingLeft={4} minW={'100%'} minH={'100%'} colorScheme='gray' borderRadius={0} />
                </Center>
                <Box className={'main-list'} flex='1' >
                    <ListscreenList openItemCard={props.openItemCard} data={props.data} />
                    <Box textAlign={'center'}>
                        <Text fontSize={20} color={'purple'}>{`Page: ${props.page}`}</Text>
                    </Box>
                </Box>
                <Center minW='50px' w='50px'>
                    <IconButton onClick={handleRightClick} bg='transparent' icon={<MdArrowForwardIos className='md-icon' />} minW={'100%'} minH={'100%'} colorScheme='gray' borderRadius={0} />
                </Center>
            </Flex>
        </Box>
    )
}

export default ListscreenMain;