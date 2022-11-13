import React, { useState} from 'react'

import { Flex, Box, Spacer, Text, Select} from '@chakra-ui/react';

const HomescreenNewEntry = (props) => {
    const { _id,
        print,
        dateCreated,
        edited,
        project_id,
        project_type,
        project_name,
        user_id} = props.info
        console.log(props.info)

    return (<Box width={'100%'} className='share-entry'>
        <Flex height='100%' width={'100%'} alignItems='center'>
            <Box className='noficationbox'>
                <Text className='noficationbox-Name'>{project_name}</Text>
                <Text className='share-username'>{print} </Text>
                <Text className='noficationbox-time'>{dateCreated}</Text>
            </Box>

        </Flex>
    </Box>)
}

export default HomescreenNewEntry;