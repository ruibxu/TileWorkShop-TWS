import React, { useState, useContext, useEffect } from 'react'
import {
  Box,
  Flex,
  HStack,
  Image,
  IconButton,

} from '@chakra-ui/react';
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { AiOutlineFileAdd } from "react-icons/ai"
import { RiDeleteBinLine } from "react-icons/ri"

const LayerToolbar = (props) => {

    return (
        <Box px={4} className="navbar" left={0}>
        <HStack h={12} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={5} fontSize = '22px'>
                Layer
                <IconButton bg='transparent' title="Add New Layer "icon={<AiOutlineFileAdd className='md-icon'/>}/>
                <IconButton bg='transparent' title="Delete Layer" icon={<RiDeleteBinLine className='md-icon'/>}/>
                <IconButton bg='transparent' title="Duplicate Layer" icon={<HiOutlineDocumentDuplicate className='md-icon'/>}/>
            </Flex>
        </HStack>
      </Box>)
}

export default LayerToolbar;