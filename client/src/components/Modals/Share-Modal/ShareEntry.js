import React, { useState} from 'react'
import { SHARE_ROLE } from '../../../translator-client/sort-options';
import { GrFormDown} from 'react-icons/gr'

import { Flex, Box, Spacer, Text, Select, Menu, MenuButton, MenuItem, MenuList, Button} from '@chakra-ui/react';

const ShareEntry = (props) => {
    const { username, email, access, color } = props.info
    const [role, setRole] = useState(access)
    const isOwner = (role == SHARE_ROLE.OWNER)

    const handleChangeRole = (newRole) => {
        setRole(newRole)
    }

    return (<Box height='55px' width={'100%'} className='share-entry'>
        <Flex height='100%' width={'100%'} alignItems='center'>
            <Box paddingLeft={2}>
                <Text className='share-username'>{username}</Text>
                <Text className='share-email'>{email}</Text>
            </Box>
            <Spacer/>
            <Menu>
                <MenuButton as={Button} width={'100px'} border={'none'} className='share-select' bg='transparent'
                rightIcon={(!isOwner)?<GrFormDown/>:<></>} isDisabled={isOwner}>
                    {role}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => handleChangeRole(SHARE_ROLE.EDITOR)}>{SHARE_ROLE.EDITOR}</MenuItem>
                    <MenuItem onClick={() => handleChangeRole(SHARE_ROLE.VIEWER)}>{SHARE_ROLE.VIEWER}</MenuItem>
                    <MenuItem onClick={() => handleChangeRole('Removed')}>Remove</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    </Box>)
}

export default ShareEntry;