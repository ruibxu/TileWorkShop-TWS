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
import { MdFolderOpen, MdOutlineFileDownload, MdListAlt, MdAddShoppingCart } from 'react-icons/md'
import AuthContext from '../../auth';
import { ACCESS_TYPE, PROJECT_TYPE } from '../../translator-client/sort-options';
import ShoppingCart from './ShoppingCart';
import GlobalShopStoreContext from '../../store/ShopStore';
import GlobalEditStoreContext from '../../store/EditStore';


const EditNavbar = (props) => {
    const { projectName, currentStore, isEditing, setIsEditing } = props
    const { auth } = useContext(AuthContext);
    const { shopStore } = useContext(GlobalShopStoreContext)
    const [nameEdit, toggleNameEdit] = useState(false)
    const [name, setName] = useState(projectName)
    const [isPublic, setPublic] = useState(props.isPublic)

    useEffect(() => {
        if (name == projectName) { return }
        setName(projectName)
    }, [projectName])

    useEffect(() => {
        setPublic(props.isPublic)
    }, [props.isPublic])

    const handleToggleNameEdit = (value) => {
        if (currentStore.accessLevel <= ACCESS_TYPE.VIEWABLE) { return }
        toggleNameEdit(value)
    }

    const handleDownload = () => {
        props.setExporting(true);
    }

    const handleSetPublic = (v) => {
        currentStore.updatePublic()
        props.setPublic(v)
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

    const handleSave = () => {
        props.save()
    }

    const handleShareModal = () => {
        console.log(currentStore)
        props.openShareModal()
    }

    const handleEdit = () => {
        setIsEditing(true)
        // console.log(isEditing)
        currentStore.sendRequest({
            expire: 600,
            data: {
                request_type: "EDIT_PROJECT",
                user_id: auth.user._id,
                related_id: currentStore.currentId
            }
        })
    }

    const handleAddToMap = () => {
        const image = props.toDataURL()
        const data = {
            _id: currentStore.currentId,
            name: currentStore.name,
            height: currentStore.height,
            width: currentStore.width,
            pixel: currentStore.pixel
        }
        shopStore.addTileset(data, image)
    }

    const handleView = () => {
        setIsEditing(false)
        // console.log(123)
        currentStore.deleteRequest({
            expire: 600,
            data: {
                request_type: "EDIT_PROJECT",
                user_id: auth.user._id,
                related_id: currentStore.currentId
            }
        })
    }
    return (
        <Box px={4} className="navbar" left={0} >
            <HStack h={16} justifyContent={'space-between'}>
                <Flex alignItems={'center'} gap={5}>
                    <Box as="button"><Image src={logo} maxH='50px' objectFit='fill' onClick={() => props.redirect('/homescreen')} /></Box>
                    <IconButton icon={<MdListAlt className='md-icon' />} onClick={() => props.redirect('/listscreen')} bg='transparent' title="List View Screen" />
                    <IconButton bg='transparent' icon={<BiSave className='md-icon' />} onClick={handleSave} title="Save" disabled={!isEditing} />
                    <IconButton bg='transparent' icon={<MdOutlineFileDownload className='md-icon' />} onClick={handleDownload} title="Download" />
                    <ShoppingCart type={currentStore.type} _id={currentStore.currentId} name={currentStore.name} redirect={props.redirect} disabled={(currentStore.type == PROJECT_TYPE.TILEMAP)?currentStore.accessLevel < ACCESS_TYPE.EDITABLE:false} />
                    {(shopStore.exist && currentStore.type == PROJECT_TYPE.TILESET) ?
                        <IconButton bg='transparent' icon={<MdAddShoppingCart className='md-icon' />} onClick={handleAddToMap} title={`Add to '${shopStore.name}'`} />
                        : <></>}
                </Flex>
                <Flex>
                    {(nameEdit) ?
                        <Box alignItems={'center'} className='name-font' onBlur={handleNameEdit}>
                            <Input defaultValue={name} autoFocus={true} />
                        </Box>
                        : <Box alignItems={'center'} className='name-font' onClick={() => handleToggleNameEdit(!nameEdit)}>
                            {name}
                        </Box>}
                </Flex>
                <Flex gap={6} alignItems={'center'} width="width='240px">
                    <Flex gap={4} alignItems={'center'}>
                        <Button variant={'solid'} colorScheme={(isPublic) ? "green" : "red"} onClick={() => handleSetPublic(!isPublic)} width='75px'
                            isDisabled={currentStore.accessLevel != ACCESS_TYPE.OWNER}>
                            {(isPublic) ? "Public" : "Private"}
                        </Button>
                        {isEditing ? <Button width='65px' colorScheme='yellow' onClick={handleView} isDisabled={(!auth.loggedIn)}>
                            View
                        </Button> : <Button width='65px' variant={'solid'} colorScheme={'blue'} onClick={handleEdit} isDisabled={currentStore.accessLevel != ACCESS_TYPE.OWNER ? currentStore.accessLevel != ACCESS_TYPE.EDITABLE : currentStore.accessLevel != ACCESS_TYPE.OWNER}>Edit</Button>}
                        <Button variant={'solid'} colorScheme={'blue'} onClick={handleShareModal} isDisabled={currentStore.accessLevel != ACCESS_TYPE.OWNER}>Share</Button>
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