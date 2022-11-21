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
import AuthContext from '../../auth';



const EditNavbar = (props) => {
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState(props.name)
    const [nameEdit, toggleNameEdit] = useState(false)

    const handleSetPublic = (v) => {
        props.setPublic(v)
    }

    const handleLogout = () => {
        props.redirect('/homescreen')
    }

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        setName(e.target.value);
    }

    return (
        <Box px={4} className="navbar" left={0}>
            <HStack h={16} justifyContent={'space-between'}>
                <Flex alignItems={'center'} gap={5}>
                    <Box as="button"><Image src={logo} maxH='50px' objectFit='fill' onClick={() => props.redirect('/homescreen')} /></Box>
                    <Box>
                        <IconButton bg='transparent' icon={<MdFolderOpen className='md-icon' />} onClick={() => document.querySelector('input').click()} />
                        <Input
                            type="file"
                            style = {{display:"none"}}
                            accept="image/*"
                            id='input'
                        />

                    </Box>
                    <IconButton bg='transparent' icon={<BiSave className='md-icon' />} />
                    <IconButton bg='transparent' icon={<MdOutlineFileDownload className='md-icon' />} />
                </Flex>
                <Flex>
                    {(nameEdit) ?
                        <Box alignItems={'center'} className='name-font' onBlur={handleNameEdit}>
                            <Input defaultValue={name} autoFocus={true} />
                        </Box>
                        : <Box alignItems={'center'} className='name-font' onClick={() => toggleNameEdit(!nameEdit)}>
                            {name}
                        </Box>}
                </Flex>
                <Flex gap={6} alignItems={'center'} width="width='240px">
                    <Flex gap={4} alignItems={'center'}>
                        <Button variant={'solid'} colorScheme={(props.isPublic) ? "green" : "red"} onClick={() => handleSetPublic(!props.isPublic)} width='75px'>
                            {(props.isPublic) ? "Public" : "Private"}
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
                                name={(auth.loggedIn) ? auth.user.username : 'not logged in'}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>{(auth.loggedIn) ? auth.user.username : ''}</MenuItem>
                            <MenuDivider />
                            <MenuItem>Update</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Box>)
}

export default EditNavbar;