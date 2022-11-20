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
    const handleSelect = () => {
        props.setCurrentLayer(id)
    }

    const handleRename = () => {
        toggleEdit(true)
    }

    const handleFinishRename = (e) => {
        if(e.target.value == rename){return}//only renames when the name actually changes
        const newName = e.target.value
        setRename(newName)
        const layersClone = JSON.parse(JSON.stringify(editStore.layers))
        layersClone.map(x => x.name=(x.id == id)?newName:x.name)
        editStore.addLayerStateTransaction(layersClone)
        toggleEdit(false)
    }

    useEffect(()=>{
        const reset = editStore.layers.find(x => x.id == id)
        if(!reset){return}
        if(reset.name != rename){
            setRename(reset.name)
        }
    },[editStore.layers])

    return (<Box height='35px' width={'100%'} className={(currentLayer == id)?'layer-entry-selected':'layer-entry'} id={id}>
        <Flex height='100%' width={'100%'} alignItems='center' onClick={handleSelect} onDoubleClick={handleRename}>
            {(edit)?
            <Box onBlur={handleFinishRename}>
                    <Input defaultValue={rename} autoFocus={true}/>
                </Box>
            :<Box paddingLeft={3}>
                {rename?rename:'unnamed Layer'}
            </Box>}
            <Spacer/>
            <IconButton bg='transparent' title="Hide" icon={(hidden)?<HiEyeOff/>:<HiEye />} maxH='30px'/>
            <IconButton bg='transparent' title="Lock" icon={(locked)?<AiFillLock/>:<AiFillUnlock/>} maxH='30px'/>
        </Flex>
    </Box>)
}

export default LayerEntry;