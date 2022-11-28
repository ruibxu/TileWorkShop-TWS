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
import GlobalEditStoreContext from '../../store/EditStore';



const EditNavbar = (props) => {
    const {projectName, projectAccess, currentStore} = props
    const { auth } = useContext(AuthContext);
    const { editStore } = useContext(GlobalEditStoreContext)
    const [nameEdit, toggleNameEdit] = useState(false)
    const [name, setName] = useState(projectName)
    const [isPublic, setPublic] = useState(projectAccess?projectAccess.public:false)
    const [upload, setUpload] = useState("")
    useEffect(() => {
        if(name == projectName){return}
        setName(projectName)
    }, [projectName])

    useEffect(()=>{
        if(!projectAccess){return}
        setPublic(projectAccess.public)
    }, [projectAccess])

    const handleSetPublic = (v) => {
        setPublic(v)
    }

    const handleLogout = () => {
        auth.logoutUser();
        props.redirect('/homescreen')
    }

    const handleNameEdit = (e) => {
        const newName = e.target.value
        currentStore.updateName(newName)
        toggleNameEdit(false);
        setName(newName);
    }
    const handleChange = () => {
        const reader = new FileReader()
        const file = document.querySelector('input[type=file]').files[0];
        reader.addEventListener('load', () =>{
            setUpload(reader.result)
        },false)
        reader.readAsDataURL(file)     
    }
    return (
        <Box px={4} className="navbar" left={0} >
            <HStack h={16} justifyContent={'space-between'}>
                <Flex alignItems={'center'} gap={5}>
                    <Box as="button"><Image src={logo} maxH='50px' objectFit='fill' onClick={() => props.redirect('/homescreen')} /></Box>
                    <Box>
                        <IconButton bg='transparent' icon={<MdFolderOpen className='md-icon' />} onClick={() => document.querySelector('#input-edit').click()} />
                        <Input
                            type="file"
                            onChange={handleChange}
                            style = {{display:"none"}}
                            accept="image/*"
                            id='input-edit'
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
                        <Button variant={'solid'} colorScheme={(isPublic) ? "green" : "red"} onClick={() => handleSetPublic(!isPublic)} width='75px'>
                            {(isPublic) ? "Public" : "Private"}
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