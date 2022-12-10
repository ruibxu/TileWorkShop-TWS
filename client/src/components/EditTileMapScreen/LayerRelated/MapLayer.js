import React, { useContext, useEffect, useRef} from 'react'
import { Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import LayerToolbar from './LayerToolbar';
import LayerEntry from './LayerEntry';
import GlobalEditStoreContext from '../../../store/EditStore';

const MapLayer = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext)
    const layers = editStore.layers

    //save reference dragItem and dragOverItem
    const dragItem = useRef(null)
    const dragOverItem = useRef(null)

    const handleSort = () => {
        const startIndex = dragItem.current
        const endIndex = dragOverItem.current
        dragItem.current = null
        dragOverItem.current = null
        if(startIndex == endIndex){return}
        let layersClone = [...layers]
        const item = layersClone.splice(startIndex, 1)[0]
        layersClone.splice(endIndex, 0, item)
        editStore.addLayerStateTransaction(layersClone)
    }

    //handle drag functions
    const handleDragStart = (index) => {
        dragItem.current = index
    }

    const handleDragEnter = (index) => {
        dragOverItem.current = index
    }

    const handleDragEnd = () => {
        if(!props.isEditing){return}
        handleSort()
    }


    return (
        <div>
            <LayerToolbar currentLayer={props.currentLayer} isEditing={props.isEditing}
                setCurrentLayer={props.setCurrentLayer} layers={layers}/>  
            <Box overflowY = "auto">
                {layers.map((layer, index) => (<LayerEntry info={layer} index={index} 
                currentLayer={props.currentLayer} setCurrentLayer={props.setCurrentLayer}
                handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} handleDragEnter={handleDragEnter}
                draggedOverIndex={dragOverItem.current} isEditing={props.isEditing}
                />))
                }
            </Box>       
        </div>
        
    )
}

export default MapLayer;