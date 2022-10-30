import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import MainNavbar from '../Navbars/MainNavbar';
import { Flex, Container, Box, IconButton} from '@chakra-ui/react';
import { MdCreate } from 'react-icons/md';
import HomescreenNew from './HomescreenNew';
import HomescreenQuick from './HomescreenQuick';
import HomescreenPopular from './HomescreenPopular';

const Homescreen = (props) => {
    let history = useHistory();
	const redirect = async(route) => {
		history.push(route, {reload: true});
	}

    return (
        <div className='overlay'>
            <MainNavbar redirect={redirect}/>
            <Box height={'100%'}>
                <Flex gap={4} minH={'100%'} minWidth='max-content' className='Homescreen-Main'>
                    <HomescreenNew/>
                    <HomescreenPopular/>
                    <HomescreenQuick/>
                </Flex>
            </Box>
            <IconButton bg='transparent' icon={<MdCreate className='md-icon'/>} className='create-new-button'/>
        </div>)
}

export default Homescreen;