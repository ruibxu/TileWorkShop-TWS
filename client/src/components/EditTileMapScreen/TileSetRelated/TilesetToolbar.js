import React, { useState, useContext, useEffect } from 'react'
import {
  Box,
  Flex,
  HStack,
  Button,
  IconButton,
  Spacer, Text

} from '@chakra-ui/react';
import { AiOutlineFileAdd, AiOutlineMenu } from "react-icons/ai"
import { RiDeleteBinLine } from "react-icons/ri"

const TilesetToolbar = (props) => {
    const { tsRef, currentTilesetName} = props

    return (
        <Box px={4} className="navbar" left={0}>
        <HStack h={12} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={0} fontSize = '22px' width={'100%'}>
                <Text 
                fontSize = '22px' variant={'outline'} colorScheme={'purple'}>
                  {currentTilesetName}
                  </Text>
                <Spacer/>
                <IconButton bg='transparent' title="Add New Tileset"icon={<AiOutlineMenu className='md-icon'/>} 
                  ref={tsRef} onClick={props.openDrawer}
                />
                {/* <IconButton bg='transparent' title="Add New Tileset"icon={<AiOutlineFileAdd className='md-icon'/>} />
                <IconButton bg='transparent' title="Delete Tileset" icon={<RiDeleteBinLine className='md-icon'/>}/> */}
            </Flex>
        </HStack>
      </Box>)
}

export default TilesetToolbar;