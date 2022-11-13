import React, { useState, useContext, useEffect } from 'react'
import logo from '../../../logo_cropped.png';
import {
  Box,
  Flex,
  HStack,
  Image,
  IconButton,
  Input,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md'

import LoggedIn from './LoggedIn.js'
import GuestMode from './GuestMode';
import AuthContext from '../../../auth';
import GlobalStoreContext from '../../../store/ProjectStore';
import { SORT_TYPE, SORT_ORDER, SEARCH_TYPE, ACCESS_TYPE, PROJECT_TYPE} from '../../../translator-client/sort-options';
import { BiChevronDown } from 'react-icons/bi';



const MainNavbar = (props) => {
    const [ type, setType ] = useState(PROJECT_TYPE.TILEMAP)
    const [ searchBy, setSearchBy ] = useState("Name")
    const { auth } = useContext(AuthContext)
    const { store } = useContext(GlobalStoreContext)

    const project_type = (PROJECT_TYPE.TILEMAP == store.project_type)?'TileMap':'TileSet'
    const search_by = (SEARCH_TYPE.CREATOR == store.search_by)?'Creator':'Name'

    const handleChangeSortOptions = (type, value) => {
        const pair = {[type]: value}
        console.log(pair)
        store.update_sort_options(pair)
    }
    
    /*const handleLogin = (username) => {
        props.setLoggedin(username)
    }*/

    const handleLogout = () => {
        //props.setLoggedin('')
        auth.logoutUser();
    }

    return (
        <Box px={4} className="navbar" left={0}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Flex as = "button">
                <div><Image src={logo} maxH='50px' objectFit='fill' onClick={()=>props.redirect('/homescreen')}/></div>
            </Flex>
            <Flex alignItems={'center'} width={'65%'} bg='transparent'>
                <Input placeholder='Search...' className='search-bar' borderColor={'purple'} onBlur = {(e)=>handleChangeSortOptions('search_term', e.target.value)}/>
                <Menu>
                    <MenuButton as={Button} rightIcon={<BiChevronDown />} width="15%" borderColor={'purple'} variant='outline'>
                        {project_type}
                    </MenuButton>
                    <MenuList>
                        <MenuItem value={PROJECT_TYPE.TILESET} onClick={(e)=>handleChangeSortOptions('project_type', e.target.value)}>TileSet</MenuItem>
                        <MenuItem value={PROJECT_TYPE.TILEMAP} onClick={(e)=>handleChangeSortOptions('project_type', e.target.value)}>TileMap</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<BiChevronDown />} width="15%" borderColor={'purple'} variant='outline'>
                        {search_by}
                    </MenuButton>
                    <MenuList>
                        <MenuItem value={SEARCH_TYPE.NAME} onClick={(e)=>handleChangeSortOptions('search_by', e.target.value)}>Name</MenuItem>
                        <MenuItem value={SEARCH_TYPE.CREATOR} onClick={(e)=>handleChangeSortOptions('search_by', e.target.value)}>Creator</MenuItem>
                    </MenuList>
                </Menu>
                <Flex>
                    <IconButton bg='transparent' className='search-bar' icon={<MdSearch className='md-icon'
                    onClick={()=>{props.redirect('/listscreen', {changePassword: true}); store.search()} }/>}/>
                </Flex>
            </Flex>
            {props.loggedin?
                (<LoggedIn redirect={props.redirect} handleLogout={handleLogout}
                    openUpdateAccountModal={props.openUpdateAccountModal} user={auth.user}
                />):
                (<GuestMode redirect={props.redirect} 
                    openSignUpModal={props.openSignUpModal} 
                    openLoginModal={props.openLoginModal}
                />)
            }
        </Flex>
      </Box>)
}

export default MainNavbar;