import React, { useContext, useEffect} from 'react'
import { Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import LayerToolbar from './LayerToolbar';
import LayerEntry from './LayerEntry';

const MapLayer = (props) => {


    return (
        <div>
            <LayerToolbar/>
            <LayerEntry/>
            <LayerEntry/>
            <LayerEntry/>
        </div>
        
    )
}

export default MapLayer;