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

const MapTileset = (props) => {
    return (

        <Box>
            <TilesetToolbar tsRef={props.tsRef} openDrawer={props.openDrawer}/>
            <Box>
                <Canvas sourceRef={props.sourceRef} setSelection={props.setSelection} currentTileSetId={props.currentTileSetId}/>
            </Box>
        </Box>
        // <div>      <TilesetToolbar />      <Canvas /></div>

    )
}

export default MapTileset;