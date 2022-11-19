import React, { useContext, useEffect} from 'react'
import { Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import LayerToolbar from './LayerToolbar';
import LayerEntry from './LayerEntry';
import GlobalEditStoreContext from '../../../store/EditStore';

const MapLayer = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext)
    const layers = editStore.layers
    // const layers = [
    //     {name: 'Layer 1', hidden: false, locked: false},
    //     {name: 'Layer 2', hidden: true, locked: false},
    //     {name: 'Layer 3', hidden: false, locked: true},
    //     {name: 'Layer 4', hidden: true, locked: true}
    // ]


    return (
        <div>
            <LayerToolbar/>
            {layers.map((layer, index) => (<LayerEntry info={layer} index={index} 
            currentLayer={props.currentLayer}
            setCurrentLayer={props.setCurrentLayer}/>))}
        </div>
        
    )
}

export default MapLayer;