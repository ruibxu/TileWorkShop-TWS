import React, { useState, useContext, useEffect } from 'react'
import logo from '../../../logo_cropped.png';
import {
  Box,
  Flex,
  HStack,
  Image,
  IconButton,
  Input,
  Select
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md'

import LoggedIn from './LoggedIn.js'
import GuestMode from './GuestMode';



const MainNavbar = (props) => {
    const [loggedin, setLoggedin ] = useState('5')
    const [ type, setType ] = useState("TileSet")
    const [ searchBy, setSearchBy ] = useState("Name")

    
    const handleLogin = (username) => {
        setLoggedin(username)
    }

    const handleLogout = () => {
        setLoggedin('')
    }

    console.log(loggedin)

    return (
        <Box px={4} className="navbar" left={0}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Flex as = "button">
                <div><Image src={logo} maxH='50px' objectFit='fill' onClick={()=>props.redirect('/homescreen')}/></div>
            </Flex>
            <Flex alignItems={'center'} width={'65%'} bg='transparent'>
                <Input placeholder='Search...' className='search-bar' borderColor={'purple'}/>
                <Select width="20%" borderColor={'purple'}>
                    <option value='TileSet'>TileSet</option>
                    <option value='TileMap'>TileMap</option>
                </Select>
                <Select width="20%" borderColor={'purple'}>
                    <option value='Name'>Name</option>
                    <option value='Creator'>Creator</option>
                </Select>
                <Flex>
                    <IconButton bg='transparent' className='search-bar' icon={<MdSearch className='md-icon'/>}/>
                </Flex>
            </Flex>
            {loggedin?
                (<LoggedIn redirect={props.redirect} handleLogout={handleLogout}/>):
                (<GuestMode redirect={props.redirect} handleLogin={handleLogin}/>)
            }
        </Flex>
      </Box>)
}

export default MainNavbar;