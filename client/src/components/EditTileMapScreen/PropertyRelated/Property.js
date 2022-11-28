import React, {useState,useContext, useEffect, useRef} from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import GlobalEditStoreContext from '../../../store/EditStore';
import PropertyToolbar from './PropertyToolbar';
import PropertyEntry from './PropertyEntry';
import CreatePropertyModal from '../../Modals/CreateProperty-Model';

const Property = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext)
    const [currentProperty, setCurrentProperty] = useState("test")
    const showCreatePropertyModal= useDisclosure()
    const display = useRef([])
    const [displayState, setDisplayState] = useState(display.current)
    useEffect(()=>{
        const layer = editStore.layers.find(layer=>layer.id==props.currentLayer)
        const properties = (layer)?layer.properties?layer.properties:[]:[]
        const displayProperties = properties.map(x => ({name: x.name, type: x.type, value: convertValue(x)}))
        display.current = displayProperties
        setDisplayState(display.current)
    }, [props.currentLayer, editStore.layers])

    const convertValue = (property) => {
        switch(property.type){
            case 'string':{return property.value}
            case 'boolean':{return (property.value == 'true')}
            case 'int':{return new Number(property.value)}
            case 'float':{return new Number(property.value)}
        }
    }
    //console.log(props.currentLayer)
    
    console.log(displayState)
    return (
        <div>
            <PropertyToolbar openCreatePropertyModal={showCreatePropertyModal.onOpen} currentLayer={props.currentLayer}
                currentProperty={currentProperty} setCurrentProperty={setCurrentProperty}
            />
            <Box overflowY={'auto'} >
                    {displayState.map((property, index) => (<PropertyEntry info={property} index={index} 
                    currentProperty={currentProperty} currentLayer={props.currentLayer}
                    setCurrentProperty={setCurrentProperty} 
                    />))}
            </Box>

            <CreatePropertyModal isOpen={showCreatePropertyModal.isOpen} onClose={showCreatePropertyModal.onClose} currentLayer={props.currentLayer}
                currentProperty={currentProperty} setCurrentProperty={setCurrentProperty}
            />
        </div>
    )
}

export default Property;