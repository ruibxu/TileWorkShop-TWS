import React, { useState} from 'react'

import { Flex, Box, Spacer, Text, Select, IconButton} from '@chakra-ui/react';

import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { HiEye, HiEyeOff } from "react-icons/hi";


const LayerEntry = (props) => {
    const {name, hidden, locked, properties, data} = props.info

    return (<Box height='35px' width={'100%'} className='layer-entry'>
        <Flex height='100%' width={'100%'} alignItems='center'>
            <Box paddingLeft={3}>
                {name?name:'unnamed Layer'}
            </Box>
            <Spacer/>
            <IconButton bg='transparent' title="Hide" icon={(hidden)?<HiEyeOff/>:<HiEye />} maxH='30px'/>
            <IconButton bg='transparent' title="Lock" icon={(locked)?<AiFillLock/>:<AiFillUnlock/>} maxH='30px'/>
        </Flex>
    </Box>)
}

export default LayerEntry;