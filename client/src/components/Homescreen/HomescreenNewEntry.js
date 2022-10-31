import React, { useState} from 'react'

import { Flex, Box, Spacer, Text, Select} from '@chakra-ui/react';

const HomescreenNewEntry = (props) => {
    const { username, action, projectName, content, notificationTime } = props.info

    return (<Box height='150px' width={'100%'} className='share-entry'>
        <Flex height='100%' width={'100%'} alignItems='center'>
            <Box className='noficationbox'>
                <Text className='noficationbox-Name'>{projectName}</Text>
                <Text className='share-username'>{username} {action}: {content} </Text>
                <Text className='noficationbox-time'>{notificationTime}</Text>
            </Box>

        </Flex>
    </Box>)
}

export default HomescreenNewEntry;