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
import { IoIosAddCircleOutline,IoIosRemoveCircleOutline } from "react-icons/io";

const PropertyToolbar = (props) => {

    return (
        <Box px={4} className="navbar" left={0}>
        <HStack h={12} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={5} fontSize = '22px'>
                Properties
                <IconButton bg='transparent' title="Add New Property "icon={<IoIosAddCircleOutline className='md-icon'/>}/>
                <IconButton bg='transparent' title="remove Property" icon={<IoIosRemoveCircleOutline  className='md-icon'/>}/>
            </Flex>
        </HStack>
      </Box>)
}

export default PropertyToolbar;