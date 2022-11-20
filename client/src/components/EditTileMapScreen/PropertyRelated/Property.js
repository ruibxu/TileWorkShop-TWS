import React, { useState,useContext, useEffect} from 'react'
import { Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import GlobalEditStoreContext from '../../../store/EditStore';
import PropertyToolbar from './PropertyToolbar';
import PropertyEntry from './PropertyEntry';

const Property = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext)
    const layer = editStore.layers.find(layer=>layer.id==props.currentLayer)
    const properties = layer.properties?layer.properties:[]
    const [currentProperty, setCurrentProperty] = useState("test")

    const convertValue = (property) => {
        switch(property.type){
            case 'string':{return property.value}
            case 'boolean':{return (property.value == 'true')}
            case 'number':{return new Number(property.value)}
        }
    }
    console.log(props.currentLayer)
    
    const displayProperties = properties.map(x => ({name: x.name, type: x.type, value: convertValue(x)}))
    /*const properties = [
        {name: 'Property 1', value: 'hello'},
        {name: 'Property 2', value: 3},
        {name: 'Property 3', value: 3.14},
        {name: 'Property 4', value: true}
    ]*/
    return (
        <div>
            <PropertyToolbar/>
            <Box overflowY={'auto'} >
                    {displayProperties.map((property, index) => (<PropertyEntry info={property} index={index} 
                    currentProperty={currentProperty} currentLayer={props.currentLayer}
                    setCurrentProperty={setCurrentProperty}
                    />))}
            </Box>
        </div>
    )
}

export default Property;