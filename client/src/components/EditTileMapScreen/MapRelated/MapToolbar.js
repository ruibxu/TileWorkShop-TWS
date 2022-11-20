import React, { useState, useContext, useEffect } from 'react'
import {
  Box,
  Flex,
  HStack,
  Image,
  IconButton,
  Input,
  Select,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Switch,
} from '@chakra-ui/react';
import { GiResize } from "react-icons/gi";
import { TfiBrushAlt } from "react-icons/tfi"
import { MdOutlineFormatColorFill } from "react-icons/md"
import { RiShape2Fill, RiEraserLine } from "react-icons/ri"
import { GrSelect } from "react-icons/gr"
import { ImMagicWand, ImUndo, ImRedo, ImZoomIn, ImZoomOut } from "react-icons/im"
import GlobalEditStoreContext from '../../../store/EditStore';
import { BiSelectMultiple } from "react-icons/bi"


const MapToolbar = (props) => {
  const { editStore } = useContext(GlobalEditStoreContext);

  return (
    <Box px={4} left={0}>
      <HStack h={12} justifyContent={'space-between'}>
        <Flex alignItems={'center'} gap={5}>
          <IconButton bg='transparent' title="Resize Map" icon={<GiResize className='md-icon' />} />
          <IconButton bg='transparent' title="Stamp Brush" icon={<TfiBrushAlt className='md-icon' />} />
          <IconButton bg='transparent' title="Bucket Fill Tool" icon={<MdOutlineFormatColorFill className='md-icon' />} />
          <IconButton bg='transparent' title="Shape Fill Tool" icon={<RiShape2Fill className='md-icon' />} />
          <IconButton bg='transparent' title="Eraser" icon={<RiEraserLine className='md-icon' />} />
          <IconButton bg='transparent' title="Rectangular Select" icon={<GrSelect className='md-icon' />} />
          <IconButton bg='transparent' title="Select Same Tile" icon={<BiSelectMultiple className='md-icon' />} />
          <IconButton bg='transparent' title="Magic Wand" icon={<ImMagicWand className='md-icon' />} />
          <IconButton bg='transparent' title="Undo" onClick={() => editStore.undo()} icon={<ImUndo className='md-icon' />} />
          <IconButton bg='transparent' title="Redo" onClick={() => editStore.redo()} icon={<ImRedo className='md-icon' />} />
          <IconButton bg='transparent' title="Zoom In" icon={<ImZoomIn className='md-icon' />} />
          <IconButton bg='transparent' title="Zoom Out" icon={<ImZoomOut className='md-icon' />} />
        </Flex>
      </HStack>
    </Box>)
}

export default MapToolbar;