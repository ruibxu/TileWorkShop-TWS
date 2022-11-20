import React, { useState, useContext, useEffect} from 'react'

import { Flex, Box, Spacer, Text, Select, IconButton, Input} from '@chakra-ui/react';
import GlobalEditStoreContext from '../../../store/EditStore';

import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { HiEye, HiEyeOff } from "react-icons/hi";


const PropertyEntry = (props) => {
    const {name,value} = props.info
    const currentLayer = props.currentLayer
    const currentProperty = props.currentProperty
    //const [edit, toggleEdit] = useState(false)

    /*const handleSelect = () => {
        props.setCurrentProperty()
    }*/
    /*


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
    */

    return (
    <Box height='35px' width={'100%'}>
        <Flex height='100%' width={'100%'} alignItems='center'>
            <Box width='100%'>
                <Input defaultValue={name} autoFocus={true}/>
            </Box>
            <Spacer/>
            <Box paddingLeft={3} width='100%'>
                <Input defaultValue={value} autoFocus={true}/>
            </Box>
        </Flex>
    </Box>)
}

export default PropertyEntry;