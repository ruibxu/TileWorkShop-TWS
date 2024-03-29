import React, { useEffect, useState} from 'react'
import ShareEntry from './ShareEntry';
import { SHARE_ROLE } from '../../../translator-client/sort-options';

import { Flex, Box, Container, Spacer, Text, IconButton } from '@chakra-ui/react';

const ShareList = (props) => {
    const {currentStore} = props
    const accounts = (props.list)?props.list:[];
    const [displayList, setDisplayList] = useState(currentStore.accessList)

    useEffect(()=>{
        console.log(currentStore.accessList)
        console.log(displayList)
        setDisplayList(currentStore.accessList)
    }, [currentStore.accessList])

    return (<Box height='300px'>
        <Text className='share-title'>People with Access:</Text>
        <Box className='share-list scroll-bar' overflowY={'scroll'}> 
            {displayList.map((account, index) => (
                <ShareEntry info={account} currentStore={currentStore}/>
            ))}
        </Box>
    </Box>)
}

export default ShareList;