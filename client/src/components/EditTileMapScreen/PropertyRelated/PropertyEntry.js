import React, { useState, useContext, useEffect} from 'react'

import { Flex, Box, Spacer, Text, Select, IconButton, Input} from '@chakra-ui/react';
import GlobalEditStoreContext from '../../../store/EditStore';

import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { HiEye, HiEyeOff } from "react-icons/hi";


const PropertyEntry = (props) => {
    const {name,type,value} = props.info
    const currentProperty = props.currentProperty
    const { editStore } = useContext(GlobalEditStoreContext)
    const [edit, toggleEdit] = useState(false)
    const [val, setVal] = useState(value)

    const handleSelect = () => {
        props.setCurrentProperty(name)
    }

    const handleToggleChangeVal = () => {
        toggleEdit(true)
    }

    const handleFinishChangeVal = (e) => {
        toggleEdit(false)
        if(e.target.value == val){return}//only renames when the name actually changes
        const newVal = e.target.value
        setVal(newVal)
    }

    return (<Box height='35px' width={'100%'} className={(currentProperty == name)?'layer-entry-selected':'layer-entry'} name={name}>
        <Flex height='100%' width={'100%'} alignItems='center' onClick={handleSelect} onDoubleClick={handleToggleChangeVal}>
            <Box width={'100%'} paddingLeft={3}>
                {name}
            </Box>
            <Spacer/>

            {(edit)?
            <Box onBlur={handleFinishChangeVal} width={'100%'} >
                    <Input defaultValue={val} autoFocus={true}/>
                </Box>
            :<Box paddingLeft={3} width={'100%'} >
                {val?val:'unnamed Layer'}
            </Box>}
        </Flex>
    </Box>)

}

export default PropertyEntry;