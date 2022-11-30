import React, { useEffect, useState} from 'react'
import ShareEntry from './ShareEntry';
import { SHARE_ROLE } from '../../../translator-client/sort-options';

import { Flex, Box, Container, Spacer, Text, IconButton } from '@chakra-ui/react';

const ShareList = (props) => {
    const {currentStore} = props
    const accounts = (props.list)?props.list:[];
    const [displayList, setDisplayList] = useState([])

    const createAccessList = () => {

    }

    useEffect(()=>{
        const accessLists = currentStore.access
        const {owner_id,editor_ids,viewer_ids} = accessLists

    }, [currentStore.access])

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