import React, { useState, useContext, useEffect} from 'react'
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
import ResizeMapModal from '../../Modals/ResizeMap-Modal';
import { HiOutlineHand } from 'react-icons/hi';

const MapToolbar = (props) => {
  const { editStore } = useContext(GlobalEditStoreContext);
  const { currentButton } = props
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const { zoomValue, setZoomValue } = props
  const handleOnClick = (value) => {
    props.setCurrentButton(value)
    //console.log(currentButton)
  }

  const handleZoomIn = () => {
    if (zoomValue < 4) {
      setZoomValue(zoomValue * 2)
      //editStore.updateZoomValue(editStore.zoomValue*2)
    }
  }
  const handleZoomOut = () => {
    if (zoomValue > 0.25) {
      setZoomValue(zoomValue / 2)
      //editStore.updateZoomValue(editStore.zoomValue/2)
    }
  }

  const handleResizeModal = () => {
    if(!props.isEditing){return}
    props.openResizeMapModal()
  }

  const handleKeyPress = (event) => {
    //event.preventDefault();
    if ((event.ctrlKey ||event.metaKey) && event.key === 'z') {
      event.preventDefault();
      editStore.undo()
      setCanUndo(editStore.canUndo())
      setCanRedo(editStore.canRedo())
    }

    if ((event.ctrlKey ||event.metaKey) && event.key === 'y') {
      event.preventDefault();
      editStore.redo()
      setCanUndo(editStore.canUndo())
      setCanRedo(editStore.canRedo())
    }

    if ((event.ctrlKey ||event.metaKey) && event.key === 'r') {
      event.preventDefault();
      handleResizeModal()
    }

    if (event.key === 'b') {
      handleOnClick(TOOLS.STAMP_BRUSH)
    }

    if (event.key === 'f') {
      handleOnClick(TOOLS.BUCKET_FILL_TOOL)
    }

    if (event.key === 'p') {
      handleOnClick(TOOLS.SHAPE_FILL_TOOL)
    }

    if (event.key === 'e') {
      handleOnClick(TOOLS.ERASER)
    }

    if (event.key === '=') {
      console.log('triggered =')
      handleZoomIn()
    }

    if (event.key === '-') {
      console.log('triggered -')
      handleZoomOut()
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [props.isEditing, zoomValue])
  useEffect(() => {
    setCanUndo(editStore.canUndo())
    setCanRedo(editStore.canRedo())
  }, [editStore])
  useEffect(() => {
    handleOnClick(TOOLS.MOVE)
    editStore.clearTransactions()
    setCanUndo(editStore.canUndo())
    setCanRedo(editStore.canRedo())
  }, [props.isEditing])
  console.log(props.isEditing)
  //<IconButton onClick={() => handleOnClick(TOOLS.REACTANGULAR_SELECT)} outlineColor={(currentButton == TOOLS.REACTANGULAR_SELECT) ? 'purple' : 'transparent'} bg='transparent' title={TOOLS.REACTANGULAR_SELECT} icon={<GrSelect className='md-icon' />} />
  //<IconButton onClick={() => handleOnClick(TOOLS.SELECT_SAME_TILE)} outlineColor={(currentButton == TOOLS.SELECT_SAME_TILE) ? 'purple' : 'transparent'} bg='transparent' title={TOOLS.SELECT_SAME_TILE} icon={<BiSelectMultiple className='md-icon' />} />
  //<IconButton onClick={() => handleOnClick(TOOLS.MAGIC_WAND)} outlineColor={(currentButton == TOOLS.MAGIC_WAND) ? 'purple' : 'transparent'} bg='transparent' title={TOOLS.MAGIC_WAND} icon={<ImMagicWand className='md-icon' />} />
  return (
    <Box px={4} left={0}>
      <HStack h={12} justifyContent={'space-between'} >
        <Flex alignItems={'center'} gap={5} >
          <IconButton disabled={!props.isEditing} onClick={handleResizeModal} bg='transparent' title="Resize Map [R]" icon={<GiResize className='md-icon' />} />
          <IconButton disabled={!props.isEditing} onClick={() => handleOnClick(TOOLS.STAMP_BRUSH)} outlineColor={(currentButton == TOOLS.STAMP_BRUSH) ? 'purple' : 'transparent'} bg='transparent' title={TOOLS.STAMP_BRUSH + "[B]"} icon={<TfiBrushAlt className='md-icon' />} />
          <IconButton disabled={!props.isEditing} onClick={() => handleOnClick(TOOLS.BUCKET_FILL_TOOL)} outlineColor={(currentButton == TOOLS.BUCKET_FILL_TOOL) ? 'purple' : 'transparent'} bg='transparent' title={TOOLS.BUCKET_FILL_TOOL} icon={<MdOutlineFormatColorFill className='md-icon' />} />
          <IconButton disabled={!props.isEditing} onClick={() => handleOnClick(TOOLS.SHAPE_FILL_TOOL)} outlineColor={(currentButton == TOOLS.SHAPE_FILL_TOOL) ? 'purple' : 'transparent'} bg='transparent' title={TOOLS.SHAPE_FILL_TOOL} icon={<RiShape2Fill className='md-icon' />} />
          <IconButton disabled={!props.isEditing} onClick={() => handleOnClick(TOOLS.ERASER)} outlineColor={(currentButton == TOOLS.ERASER) ? 'purple' : 'transparent'} bg='transparent' title={TOOLS.ERASER} icon={<RiEraserLine className='md-icon' />} />
          <IconButton onClick={() => handleOnClick(TOOLS.MOVE)} outlineColor={(currentButton == TOOLS.MOVE) ? 'purple' : 'transparent'} bg='transparent' title={TOOLS.MOVE} icon={<HiOutlineHand className='md-icon' />} />
          <IconButton bg='transparent' title="Undo" onClick={() => { editStore.undo(); setCanUndo(editStore.canUndo()); setCanRedo(editStore.canRedo()) }} disabled={!canUndo} icon={<ImUndo className='md-icon' />} />
          <IconButton bg='transparent' title="Redo" onClick={() => { editStore.redo(); setCanUndo(editStore.canUndo()); setCanRedo(editStore.canRedo()) }} disabled={!canRedo} icon={<ImRedo className='md-icon' />} />
          <IconButton bg='transparent' title="Zoom In" onClick={handleZoomIn} icon={<ImZoomIn className='md-icon' />} />
          <IconButton bg='transparent' title="Zoom Out" onClick={handleZoomOut} icon={<ImZoomOut className='md-icon' />} />
        </Flex>
      </HStack>
    </Box>)
}

export default MapToolbar;