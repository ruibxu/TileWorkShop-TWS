import React, { useState, useContext, useEffect } from 'react'
import {
  Box,
  Flex,
  HStack,
  Button,
  IconButton,

} from '@chakra-ui/react';
import { AiOutlineFileAdd } from "react-icons/ai"
import { RiDeleteBinLine } from "react-icons/ri"

const TilesetToolbar = (props) => {
    const { tsRef } = props

    return (
        <Box px={4} className="navbar" left={0}>
        <HStack h={12} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={3} fontSize = '22px'>
                <Button ref={tsRef} onClick={props.openDrawer}
                fontSize = '16px' variant={'outline'} colorScheme={'purple'}>
                  Tilesets
                  </Button>
                <IconButton bg='transparent' title="Add New Tileset"icon={<AiOutlineFileAdd className='md-icon'/>} />
                <IconButton bg='transparent' title="Delete Tileset" icon={<RiDeleteBinLine className='md-icon'/>}/>
            </Flex>
        </HStack>
      </Box>)
}

export default TilesetToolbar;