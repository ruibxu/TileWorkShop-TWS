import React, { useState, useContext, useEffect} from 'react'

import { Flex, Box, Spacer, Text, Select, IconButton, Input} from '@chakra-ui/react';
import GlobalEditStoreContext from '../../../store/EditStore';

import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { HiEye, HiEyeOff } from "react-icons/hi";


const LayerEntry = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext)
    const {id, name, hidden, locked, properties, data} = props.info
    const currentLayer = props.currentLayer
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
        props.setCurrentLayer(id)
    }

    const handleToggleRename = () => {
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

    return (<Box height='35px' width={'100%'} className={(currentLayer == id)?'layer-entry-selected':'layer-entry'} id={id}>
        <Flex height='100%' width={'100%'} alignItems='center' onClick={handleSelect} onDoubleClick={handleToggleRename}>
            {(edit)?
            <Box onBlur={handleFinishRename}>
                    <Input defaultValue={rename} autoFocus={true}/>
                </Box>
            :<Box paddingLeft={3}>
                {rename?rename:'unnamed Layer'}
            </Box>}
            <Spacer/>
            <IconButton bg='transparent' title="Hide" icon={(hide)?<HiEyeOff/>:<HiEye />} maxH='30px'
                onClick={handleToggleHide}/>
            <IconButton bg='transparent' title="Lock" icon={(lock)?<AiFillLock/>:<AiFillUnlock/>} maxH='30px'
                onClick={handleToggleLock}/>
        </Flex>
    </Box>)
}

export default LayerEntry;