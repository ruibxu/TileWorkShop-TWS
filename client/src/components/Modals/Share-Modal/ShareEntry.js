import React, { useState} from 'react'

import { Flex, Box, Spacer, Text, Select} from '@chakra-ui/react';

const ShareEntry = (props) => {
    const { username, email, access, color } = props.info
    const ALL_OPTIONS = ['Owner', 'Editor', 'Viewer']
    const filtered_options = ALL_OPTIONS.filter(x => x != access)
    

    return (<Box height='55px' width={'100%'} className='share-entry'>
        <Flex height='100%' width={'100%'} alignItems='center'>
            <Box paddingLeft={2}>
                <Text className='share-username'>{username}</Text>
                <Text className='share-email'>{email}</Text>
            </Box>
            <Spacer/>
            <Select width={'100px'} border={'none'} className='share-select'>
                <option value={access}>{access}</option>
                <option value={filtered_options[0]}>{filtered_options[0]}</option>
                <option value={filtered_options[1]}>{filtered_options[1]}</option>
            </Select>
        </Flex>
    </Box>)
}

export default ShareEntry;