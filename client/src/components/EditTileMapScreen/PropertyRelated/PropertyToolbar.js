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
import GlobalEditStoreContext from '../../../store/EditStore';


const PropertyToolbar = (props) => {
  const { editStore } = useContext(GlobalEditStoreContext);
  const {currentLayer, currentProperty} = props


  const handledeleteProperty = () =>{
    const layersClone = JSON.parse(JSON.stringify(editStore.layers))
    const layer = layersClone.find(x => x.id == props.currentLayer)
    layer.properties=layer.properties.filter(x => x.name != currentProperty)
    const redoCallback = (()=>props.setCurrentProperty(""))
    const undoCallback =(()=>props.setCurrentProperty(currentProperty))
    props.setCurrentProperty("")
    editStore.addLayerStateTransaction(layersClone, redoCallback, undoCallback)
  }

  const addProperty = (layer, propertyToAdd) => {
    const newProperty = JSON.parse(JSON.stringify(propertyToAdd))
    if(!layer.properties){
      layer.properties = [newProperty]
      return
    }
    if(layer.properties.find(x => x.name == newProperty.name)){return}
    layer.properties.push(newProperty)
  }

  const handleDuplicateProperty=() => {
    //problem
    if(currentProperty==''){return}
    const layersClone = JSON.parse(JSON.stringify(editStore.layers))
    const layers = layersClone.filter(x => x.id != props.currentLayer)
    const layer2 = layersClone.find(x => x.id == props.currentLayer)
    const property=layer2.properties.find(x => x.name == currentProperty)
    //
    layers.forEach(x => addProperty(x, property))
    //layers.forEach(x=>x.properties==undefined?x.properties=[property]:x.properties=x.properties)
    layers.forEach(layer=>console.log(layer.properties))
    // layers.forEach(x=>x.properties.forEach(y => (y.name == currentProperty)?x.properties=x.properties:x.properties=[...x.properties, property]))
    //
    console.log(layersClone)
    editStore.addLayerStateTransaction(layersClone)
  }



  return (
      <Box px={4} className="navbar" left={0}>
      <HStack h={12} justifyContent={'space-between'}>
          <Flex alignItems={'center'} gap={5} fontSize = '22px'>
              Properties
              <IconButton bg='transparent' title="Add New Property "icon={<IoIosAddCircleOutline className='md-icon'/>} onClick={props.openCreatePropertyModal} isDisabled={!props.isEditing}/>
              <IconButton bg='transparent' title="remove Property" icon={<IoIosRemoveCircleOutline  className='md-icon'/>} onClick={handledeleteProperty} isDisabled={!props.isEditing}/>
              <IconButton bg='transparent' title="Duplicate Property to All layers" icon={<HiOutlineDocumentDuplicate className='md-icon'/>} onClick={handleDuplicateProperty} isDisabled={!props.isEditing}/>
          </Flex>
      </HStack>
    </Box>)
}

export default PropertyToolbar;