import React, { useState, useContext, useEffect} from 'react'

import { Flex, Box, Spacer, Text, Select, IconButton, Input, Checkbox, NumberInput, Switch, NumberInputField} from '@chakra-ui/react';
import GlobalEditStoreContext from '../../../store/EditStore';

import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { HiEye, HiEyeOff } from "react-icons/hi";


const PropertyEntry = (props) => {
    const {info, currentLayer} = props
    const {name,type,value} = info
    const currentProperty = props.currentProperty
    const { editStore } = useContext(GlobalEditStoreContext)
    const [edit, toggleEdit] = useState(false)
    const [typeS, setTypeS] = useState(type)
    const [val, setVal] = useState(value)

    useEffect(()=>{
        if(typeS != type){
            setTypeS(type)
            setVal(value)
            return
        }
        if(val != value){
            setVal(value)
        }
    }, [value, type])

    const convertValue = (property) => {
        switch(property.type){
            case 'string':{return property.value}
            case 'boolean':{return (property.value == 'true')}
            case 'int':{return new Number(property.value)}
            case 'float':{return new Number(property.value)}
        }
    }

    const handleMakeTransaction = (name, type, newValue) => {
        const layersClone = JSON.parse(JSON.stringify(editStore.layers))
        const layer = layersClone.find(x => x.id == currentLayer)
        layer.properties.map(x => x.value=(x.name == name && x.type == type)?newValue:x.value)
        editStore.addLayerStateTransaction(layersClone)
    }

    const handleSelect = () => {
        props.setCurrentProperty(name)
    }

    const handleToggleChangeVal = () => {
        if(!props.isEditing){return}
        toggleEdit(true)
    }

    const handleFinishChangeVal = (e) => {
        toggleEdit(false)
        if(e.target.value == val){return}//only renames when the name actually changes
        const newVal = e.target.value
        setVal(newVal)
        handleMakeTransaction(name, type, newVal)
    }

    const handleChangeBoolean = (newVal) => {
        console.log(val)

        setVal(newVal)
        handleMakeTransaction(name, type, `${newVal}`)

    }

    useEffect(()=>{//for undo redo purposes
        const layer = editStore.layers.find(x => x.id == currentLayer)
        if(!layer){return}
        const properties = layer.properties
        if(!properties){return}
        const property = properties.find(x => x.name == currentProperty)
        if(!property){return}
        if(property.name != name || property.type != type){return}
        if(property.value != val){
            setVal(convertValue(property))
        }
    },[editStore.layers])

    return (<Box height='35px' width={'100%'} className={(currentProperty == name)?'layer-entry-selected':'layer-entry'} name={name}>
        <Flex height='100%' width={'100%'} alignItems='center' onClick={handleSelect} onDoubleClick={handleToggleChangeVal}>
            <Box width={'100%'} paddingLeft={3}>
                {name}
            </Box>
            <Spacer/>
            {
                (typeS == 'string')?
                    (edit)?<Input defaultValue={val} autoFocus={true} onBlur={handleFinishChangeVal}/>:
                        <Box paddingLeft={3} width={'100%'} onClick={handleToggleChangeVal}>{val?val:' '}</Box>
                    :
                (typeS == 'int'||typeS == 'float')?
                    (edit)?<NumberInput defaultValue={val}>
                            <NumberInputField autoFocus={true} onBlur={handleFinishChangeVal}/>
                        </NumberInput>
                        :
                        <Box paddingLeft={3} width={'100%'} onClick={handleToggleChangeVal}>{`${val}`}</Box>
                    :
                <Box paddingLeft={3} width={'100%'} alignItems='center' onClick={()=>{console.log(val)}}>
                    <Switch onChange={()=>handleChangeBoolean(!val)} isChecked={val} isDisabled={!props.isEditing}></Switch>
                </Box>
            }

            {/* {(edit)?
            <Box onBlur={handleFinishChangeVal} width={'100%'} >
                    <Input defaultValue={val} autoFocus={true}/>
                </Box>
            :<Box paddingLeft={3} width={'100%'} >
                {val?val:'unnamed Layer'}
            </Box>} */}
        </Flex>
    </Box>)

}

export default PropertyEntry;