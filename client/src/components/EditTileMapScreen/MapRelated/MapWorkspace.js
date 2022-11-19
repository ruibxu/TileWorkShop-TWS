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
    const layers = [{'0-0': [4,4], '0-1': [3,3]},{'0-3': [3,3]},{'0-5': [3,3]}]

    return (
        <Container maxW='100%' bg='lightgrey' height='100%' centerContent>
            <Box padding={'50'}><MapCanvas parts={props.parts} 
            canvasRef={props.canvasRef} contextRef={props.contextRef}
            sourceRef={props.sourceRef} selectRef={props.selectRef}
            currentLayer={props.currentLayer} setCurrentLayer={props.setCurrentLayer}
            layers={layers}
            /></Box>
        </Container>
    )
}

export default MapWorkspace;