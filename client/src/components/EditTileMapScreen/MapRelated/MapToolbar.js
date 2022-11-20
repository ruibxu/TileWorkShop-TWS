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
import { TOOLS } from '../../../translator-client/edit-options';


const MapToolbar = (props) => {
  const { editStore } = useContext(GlobalEditStoreContext);
  const { currentButton } = props

  const handleOnClick= (value) => {
    console.log(value);
    props.setCurrentButton(value)
    console.log(currentButton)
  }


  return (
    <Box px={4} left={0}>
      <HStack h={12} justifyContent={'space-between'} >
        <Flex alignItems={'center'} gap={5} >
          <IconButton bg='transparent' title="Resize Map" icon={<GiResize className='md-icon'/> } />
          <IconButton onClick={()=>handleOnClick(TOOLS.STAMP_BRUSH)} outlineColor={(currentButton == TOOLS.STAMP_BRUSH)?'purple':'transparent'} bg='transparent' title={TOOLS.STAMP_BRUSH} icon={<TfiBrushAlt className='md-icon' />} />
          <IconButton onClick={()=>handleOnClick(TOOLS.BUCKET_FILL_TOOL)} outlineColor={(currentButton == TOOLS.BUCKET_FILL_TOOL)?'purple':'transparent'} bg='transparent' title={TOOLS.BUCKET_FILL_TOOL} icon={<MdOutlineFormatColorFill className='md-icon' />} />
          <IconButton onClick={()=>handleOnClick(TOOLS.SHAPE_FILL_TOOL)} outlineColor={(currentButton == TOOLS.SHAPE_FILL_TOOL)?'purple':'transparent'} bg='transparent' title={TOOLS.SHAPE_FILL_TOOL} icon={<RiShape2Fill className='md-icon' />} />
          <IconButton onClick={()=>handleOnClick(TOOLS.ERASER)} outlineColor={(currentButton == TOOLS.ERASER)?'purple':'transparent'} bg='transparent' title={TOOLS.ERASER} icon={<RiEraserLine className='md-icon' />} />
          <IconButton onClick={()=>handleOnClick(TOOLS.REACTANGULAR_SELECT)} outlineColor={(currentButton == TOOLS.REACTANGULAR_SELECT)?'purple':'transparent'} bg='transparent' title={TOOLS.REACTANGULAR_SELECT} icon={<GrSelect className='md-icon' />} />
          <IconButton onClick={()=>handleOnClick(TOOLS.SELECT_SAME_TILE)} outlineColor={(currentButton == TOOLS.SELECT_SAME_TILE)?'purple':'transparent'} bg='transparent' title={TOOLS.SELECT_SAME_TILE} icon={<BiSelectMultiple className='md-icon' />} />
          <IconButton onClick={()=>handleOnClick(TOOLS.MAGIC_WAND)} outlineColor={(currentButton == TOOLS.MAGIC_WAND)?'purple':'transparent'} bg='transparent' title={TOOLS.MAGIC_WAND} icon={<ImMagicWand className='md-icon' />} />
          <IconButton  bg='transparent' title="Undo" onClick={() => editStore.undo()} disabled = {!editStore.canUndo()} icon={<ImUndo className='md-icon' />} />
          <IconButton  bg='transparent' title="Redo" onClick={() => editStore.redo()} disabled = {!editStore.canRedo()}icon={<ImRedo className='md-icon' />} />
          <IconButton  bg='transparent' title="Zoom In" icon={<ImZoomIn className='md-icon' />} />
          <IconButton  bg='transparent' title="Zoom Out" icon={<ImZoomOut className='md-icon' />} />
        </Flex>
      </HStack>
    </Box>)
}

export default MapToolbar;