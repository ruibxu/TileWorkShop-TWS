import React, { useState, useContext, useEffect } from 'react'
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Container,

} from '@chakra-ui/react';
import { GiResize } from "react-icons/gi";
import { TfiBrushAlt } from "react-icons/tfi"
import { MdOutlineFormatColorFill } from "react-icons/md"
import { RiShape2Fill, RiEraserLine } from "react-icons/ri"
import { GrSelect } from "react-icons/gr"
import { ImMagicWand, ImUndo, ImRedo, ImZoomIn, ImZoomOut } from "react-icons/im"
import image from '../../../img/map1.png';
import MapCanvas from './MapCanvas.js';


const MapWorkspace = (props) => {
    //layer format '{tilemap location x}-{tilemap location y}: [tileset location x, tilesset location y]'

    return (
        <Box centerContent>
            <Box padding={'20'} width={'100%'} height={'100%'} ><MapCanvas parts={props.parts} 
            canvasRef={props.canvasRef} contextRef={props.contextRef}
            sourceRef={props.sourceRef} selectRef={props.selectRef}
            currentLayer={props.currentLayer} 
            selection={props.selection} setSelection={props.setSelection}
            currentTileSetId={props.currentTileSetId}
            currentButton={props.currentButton} setCurrentButton={props.setCurrentButton}

            /></Box>
        </Box>
    )
}

export default MapWorkspace;