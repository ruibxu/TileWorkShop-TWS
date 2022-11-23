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

  const handleDuplicateProperty=() => {
    //problem
    if(currentProperty==''){}
    else{
      const layersClone = JSON.parse(JSON.stringify(editStore.layers))
      const layers = layersClone.filter(x => x.id != props.currentLayer)
      const layerC = layersClone.find(x => x.id == props.currentLayer)
      const property=layerC.properties.filter(x => x.name == currentProperty)
      for (const layer in layers){
        let flag=0;
        for(const property2 in layer.properties){
          if(property2.name == currentProperty){
              flag=1;
          }
        }
        if(flag==0){
          layer.properties.push(property)
        }
      }
      editStore.addLayerStateTransaction(layersClone)
    }

    
  }



  return (
      <Box px={4} className="navbar" left={0}>
      <HStack h={12} justifyContent={'space-between'}>
          <Flex alignItems={'center'} gap={5} fontSize = '22px'>
              Properties
              <IconButton bg='transparent' title="Add New Property "icon={<IoIosAddCircleOutline className='md-icon'/>} onClick={props.openCreatePropertyModal} />
              <IconButton bg='transparent' title="remove Property" icon={<IoIosRemoveCircleOutline  className='md-icon'/>} onClick={handledeleteProperty} />
              <IconButton bg='transparent' title="Duplicate Property to All layers" icon={<HiOutlineDocumentDuplicate className='md-icon'/>} onClick={handleDuplicateProperty}/>
          </Flex>
      </HStack>
    </Box>)
}

export default PropertyToolbar;