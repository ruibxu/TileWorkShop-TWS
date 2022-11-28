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
import GlobalEditStoreContext from '../../../store/EditStore';

const LayerToolbar = (props) => {
  const { editStore } = useContext(GlobalEditStoreContext)
  const { layers, currentLayer } = props

  const getNewId = () => {
    if(!layers){return 1}
    const ids = layers.map(x => x.id)
    const maxId = Math.max(...ids, 0)
    return maxId+1
  }

  const generateNewLayer = () => {
    const newId = getNewId()
    console.log('New Id test', newId)
    const newLayer = {
      id: newId,
      name: 'New Layer',
      data: {},
      properties: [],
      locked: false,
      hidden: false
    }
    return newLayer
  }

  const duplicateLayer = (layer) => {
    const newId = getNewId()
    const clone = JSON.parse(JSON.stringify(layer))
    clone.id = newId
    return clone
  }

  const handleCreateNewLayer = () => {
    const newLayer = generateNewLayer()
    console.log(newLayer)
    const layersClone = JSON.parse(JSON.stringify(editStore.layers))
    layersClone.unshift(newLayer)
    console.log(newLayer)
    const currentId = currentLayer
    const redoCallback = (()=>props.setCurrentLayer(newLayer.id))
    const undoCallback =(()=>props.setCurrentLayer(currentId))
    props.setCurrentLayer(newLayer.id)
    editStore.addLayerStateTransaction(layersClone, redoCallback, undoCallback)
  }

  const handleDeleteLayer = () => {
    const layersClone = JSON.parse(JSON.stringify(editStore.layers))
    const newLayerClone = layersClone.filter(x => x.id != currentLayer)
    const redoCallback = (()=>props.setCurrentLayer(-1))
    const undoCallback =(()=>props.setCurrentLayer(currentLayer))
    props.setCurrentLayer(-1)
    editStore.addLayerStateTransaction(newLayerClone, redoCallback, undoCallback)
  }

  const handleDuplicateLayer = () => {
    const layersClone = JSON.parse(JSON.stringify(editStore.layers))
    const layer = layersClone.find(x => x.id == currentLayer)
    if(!layer){return}
    const index = layersClone.indexOf(layer)
    const clone = duplicateLayer(layer)
    layersClone.splice(index, 0, clone)
    const redoCallback = (()=>props.setCurrentLayer(clone.id))
    const undoCallback =(()=>props.setCurrentLayer(currentLayer))
    props.setCurrentLayer(clone.id)
    editStore.addLayerStateTransaction(layersClone, redoCallback, undoCallback)
  }

  return (
      <Box px={4} className="navbar" left={0}>
      <HStack h={12} justifyContent={'space-between'}>
          <Flex alignItems={'center'} gap={5} fontSize = '22px'>
              Layer
              <IconButton bg='transparent' title="Add New Layer "icon={<AiOutlineFileAdd className='md-icon'/>}
                onClick={handleCreateNewLayer}
              />
              <IconButton bg='transparent' title="Delete Layer" icon={<RiDeleteBinLine className='md-icon'/>}
                onClick={handleDeleteLayer}
              />
              <IconButton bg='transparent' title="Duplicate Layer" icon={<HiOutlineDocumentDuplicate className='md-icon'/>}
                onClick={handleDuplicateLayer}
              />
          </Flex>
      </HStack>
    </Box>)
}

export default LayerToolbar;