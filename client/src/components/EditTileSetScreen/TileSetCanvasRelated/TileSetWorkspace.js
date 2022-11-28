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
import TilesetCanvas from './TileSetCanvas';



const TilesetWorkspace = (props) => {
    //layer format '{tilemap location x}-{tilemap location y}: [tileset location x, tilesset location y]'
    //console.log('reload mapWorkSpace')

    return (
        <Box centerContent height={'100%'} width={'100%'} overflow={'auto'} >
            <TilesetCanvas width={'100%'} height={'100%'} 
            canvasRef={props.canvasRef} contextRef={props.contextRef}
            color={props.color}/>
        </Box>
    )
}

export default TilesetWorkspace;