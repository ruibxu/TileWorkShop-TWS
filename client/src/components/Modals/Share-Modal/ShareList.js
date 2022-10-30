import React, { useState} from 'react'
import ShareEntry from './ShareEntry';

import { Flex, Box, Container, Spacer, Text, IconButton } from '@chakra-ui/react';

const ShareList = (props) => {
    const accounts = (props.list)?props.list:[];

    return (<Box height='300px'>
        <Text className='share-title'>People with Access:</Text>
        <Box className='share-list' overflowY={'scroll'}> 
            {accounts.map((account, index) => (
                <ShareEntry info={account}/>
            ))}
        </Box>
    </Box>)
}

export default ShareList;