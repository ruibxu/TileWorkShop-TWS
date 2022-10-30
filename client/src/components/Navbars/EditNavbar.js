import React, { useState, useContext, useEffect } from 'react'
import logo from '../../logo_cropped.png';
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
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Switch,
} from '@chakra-ui/react';
import { BiSave } from "react-icons/bi";
import { MdFolderOpen, MdOutlineFileDownload } from 'react-icons/md'



const EditNavbar = (props) => {
    const [loggedin, setLoggedin ] = useState('5')
    const [name, setName] = useState('Project Name')
    const [isPublic, setPublic] = useState(false)

    const handleSetPublic = (v) => {
        setPublic(v)
    }

    const handleLogout = () =>{
        props.redirect('/homescreen')
    }

    console.log(loggedin)

    return (
        <Box px={4} className="navbar" left={0}>
        <HStack h={16} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={5}>
                <Box as= "button"><Image src={logo} maxH='50px' objectFit='fill' onClick={()=>props.redirect('/homescreen')}/></Box>
                <IconButton bg='transparent' icon={<MdFolderOpen className='md-icon'/>}/>
                <IconButton bg='transparent' icon={<BiSave className='md-icon'/>}/>
                <IconButton bg='transparent' icon={<MdOutlineFileDownload className='md-icon'/>}/>
            </Flex>
            <Flex><Box alignItems={'center'} className='name-font'>{name}</Box></Flex>
            <Flex gap={6} alignItems={'center'} width="width='240px">
                <Flex gap={4} alignItems={'center'}>
                    <Button variant={'solid'} colorScheme={(isPublic)?"green":"red"} onClick={()=>handleSetPublic(!isPublic)} width='75px'>
                                {(isPublic)?"Public":"Private"}
                    </Button>
                    <Button variant={'solid'} colorScheme={'blue'}>Edit</Button>
                    <Button variant={'solid'} colorScheme={'blue'} onClick={props.openShareModal}>Share</Button>
                </Flex>
                <Menu>
                <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                    size={'sm'}
                    />
                </MenuButton>
                <MenuList>
                    <MenuItem>Account</MenuItem>
                    <MenuDivider />
                    <MenuItem>Update</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={()=>props.redirect('/tileset')}>TileSet</MenuItem>
                    <MenuItem onClick={()=>props.redirect('/tilemap')}>TileMap</MenuItem>
                </MenuList>
                </Menu>
            </Flex>
        </HStack>
      </Box>)
}

export default EditNavbar;