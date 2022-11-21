import React, { useContext, useEffect} from 'react'
import { Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import LayerToolbar from './LayerToolbar';
import LayerEntry from './LayerEntry';

const MapLayer = (props) => {
    const layers = [
        {name: 'Layer 1', hidden: false, locked: false},
        {name: 'Layer 2', hidden: true, locked: false},
        {name: 'Layer 3', hidden: false, locked: true},
        {name: 'Layer 4', hidden: true, locked: true}
    ]


    return (
        <div>
            <LayerToolbar/>
            {layers.map((layer) => (<LayerEntry info={layer}/>))}
        </div>
        
    )
}

export default MapLayer;