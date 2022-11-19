import React, { useState} from 'react'

import { Flex, Box, Spacer, Text, Select, IconButton} from '@chakra-ui/react';

import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { HiEye, HiEyeOffe } from "react-icons/hi";


const LayerEntry = (props) => {
    

    return (<Box height='35px' width={'100%'} className='layer-entry'>
        <Flex height='100%' width={'100%'} alignItems='center'>
            <Box paddingLeft={3}>
                Layer1
            </Box>
            <Spacer/>
            <IconButton bg='transparent' title="Hide" icon={<HiEye />} maxH='30px'/>
            <IconButton bg='transparent' title="Lock" icon={<AiFillLock />} maxH='30px'/>
        </Flex>
    </Box>)
}

export default LayerEntry;