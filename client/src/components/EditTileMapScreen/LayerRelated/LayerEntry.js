import React, { useState, useContext, useEffect} from 'react'

import { Flex, Box, Spacer, Text, Select, IconButton, Input} from '@chakra-ui/react';
import GlobalEditStoreContext from '../../../store/EditStore';

import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { HiEye, HiEyeOff } from "react-icons/hi";


const LayerEntry = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext)
    const {currentLayer, info, index} = props
    const {id, name, hidden, locked, properties, data} = info
    const {handleDragStart, handleDragEnter, handleDragEnd} = props
    const [edit, toggleEdit] = useState(false)
    const [rename, setRename] = useState(name)
    const [hide, toggleHide] = useState(hidden)
    const [lock, toggleLock] = useState(locked)

    const handleMakeTransaction = (name, value) => {
        const layersClone = JSON.parse(JSON.stringify(editStore.layers))
        layersClone.map(x => x[name]=(x.id == id)?value:x[name])
        editStore.addLayerStateTransaction(layersClone)
    }

    const handleSelect = () => {
        console.log(info)
        props.setCurrentLayer(id)
    }

    const handleToggleRename = () => {
        if(!props.isEditing){return}
        toggleEdit(true)
    }

    const handleFinishRename = (e) => {
        toggleEdit(false)
        if(e.target.value == rename){return}//only renames when the name actually changes
        const newName = e.target.value
        setRename(newName)
        handleMakeTransaction('name', newName)
    }

    const handleToggleHide = () => {
        handleMakeTransaction('hidden', !hide)
    }

    const handleToggleLock = () => {
        handleMakeTransaction('locked', !lock)
    }

    useEffect(()=>{//for undo redo purposes
        const reset = editStore.layers.find(x => x.id == id)
        if(!reset){return}
        if(reset.name != rename){
            setRename(reset.name)
            toggleEdit(false)
        }
        if(reset.hidden != hide){toggleHide(reset.hidden)}
        if(reset.locked != lock){toggleLock(reset.locked)}
    },[editStore.layers])

    return (<Box height='35px' width={'100%'} className={(currentLayer == id)?'layer-entry-selected draggable':'layer-entry draggable'} id={id} 
            draggable={`${!edit}`} onDragStart={()=>{if(!edit){handleDragStart(index)}}} onDragEnter={()=>{if(!edit){handleDragEnter(index)}}} 
            onDragEnd={()=>{if(!edit){handleDragEnd(index)}}} onDragOver={(e)=>{if(!edit){e.preventDefault()}}}
            >
        <Flex height='100%' width={'100%'} alignItems='center' onClick={handleSelect}>
            {(edit)?
            <Box onBlur={handleFinishRename} >
                    <Input defaultValue={rename} autoFocus={true}/>
                </Box>
            :<Box paddingLeft={3} onDoubleClick={handleToggleRename} className={'layer-entry-name'}>
                {rename?rename:'unnamed Layer'}
            </Box>}
            <Spacer/>
            <IconButton bg='transparent' title="Hide" icon={(hide)?<HiEyeOff/>:<HiEye />} maxH='30px'
                onClick={handleToggleHide} isDisabled={!props.isEditing}/>
            <IconButton bg='transparent' title="Lock" icon={(lock)?<AiFillLock/>:<AiFillUnlock/>} maxH='30px'
                onClick={handleToggleLock} isDisabled={!props.isEditing}/>
        </Flex>
    </Box>)
}

export default LayerEntry;