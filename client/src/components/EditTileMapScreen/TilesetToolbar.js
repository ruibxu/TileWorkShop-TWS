import React, { useState, useContext, useEffect } from 'react'
import {
  Box,
  Flex,
  HStack,
  Image,
  IconButton,

} from '@chakra-ui/react';
import { GiResize } from "react-icons/gi";
import { TfiBrushAlt } from "react-icons/tfi"
import { MdOutlineFormatColorFill } from "react-icons/md"
import { RiShape2Fill, RiEraserLine } from "react-icons/ri"
import { GrSelect } from "react-icons/gr"
import { ImMagicWand, ImUndo, ImRedo, ImZoomIn, ImZoomOut } from "react-icons/im"

import { BiSelectMultiple } from "react-icons/bi"




const TilesetToolbar = (props) => {
    const [loggedin, setLoggedin ] = useState('5')
    const [isPublic, setPublic] = useState(false)

    const handleSetPublic = (v) => {
        setPublic(v)
    }

    const handleLogout = () =>{
        props.redirect('/homescreen')
    }

    console.log(loggedin)

    return (
        <Box px={4} className="navbar" left={0}>
        <HStack h={16} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={5}>
                <IconButton bg='transparent' icon={<GiResize className='md-icon'/>}/>
                <IconButton bg='transparent' icon={<TfiBrushAlt className='md-icon'/>}/>
                <IconButton bg='transparent' icon={<MdOutlineFormatColorFill className='md-icon'/>}/>
                <IconButton bg='transparent' icon={<RiShape2Fill className='md-icon'/>}/>
            </Flex>
        </HStack>
      </Box>)
}

export default TilesetToolbar;