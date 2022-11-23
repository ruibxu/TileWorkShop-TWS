import React, { useState, useContext, useEffect, useRef } from 'react'
import {
    Box,
    Flex,
    HStack,
    Image,
    IconButton,
    Container,

} from '@chakra-ui/react';
import TilesetToolbar from './TilesetToolbar';
//import image from '../../img/tileset1.png';
import Canvas from './TilesetCanvas2';
import GlobalEditStoreContext from '../../../store/EditStore';

const MapTileset = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext)
    const currentTileset = editStore.tilesets.find(x => x._id == props.currentTileSetId)
    const currentTilesetName = currentTileset?currentTileset.name:'Unnamed'

    return (
        <Box>
            <Box>
            <TilesetToolbar tsRef={props.tsRef} openDrawer={props.openDrawer} currentTilesetName={currentTilesetName}/>
            </Box>
            <Box>
                <Canvas sourceRef={props.sourceRef} setSelection={props.setSelection} 
                currentTileSetId={props.currentTileSetId} selection={props.selection}/>
            </Box>
        </Box>
        // <div>      <TilesetToolbar />      <Canvas /></div>

    )
}

export default MapTileset;