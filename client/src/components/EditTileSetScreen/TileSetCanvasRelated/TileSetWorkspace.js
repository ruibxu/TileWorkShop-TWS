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
import TilesetCanvas from './TileSetCanvas';



const TilesetWorkspace = (props) => {
    //layer format '{tilemap location x}-{tilemap location y}: [tileset location x, tilesset location y]'
    console.log('reload mapWorkSpace')
    console.log(props)

    return (
        <Box width={'100%'} height={'100%'} >
            <Box minW={'100%'} maxW={'100%'} minH={'100%'} maxH={'100%'} overflow={'auto'} ref={props.scrollRef}>
                <TilesetCanvas width={'100%'} height={'100%'} 
                canvasRef={props.canvasRef} contextRef={props.contextRef}
                color={props.color} setColor={props.setColor}zoomValue={props.zoomValue} 
                setZoomValue={props.setZoomValue} currentButton={props.currentButton} setCurrentButton={props.setCurrentButton}
                toolWidth={props.toolWidth} setToolWidth={props.setToolWidth} scrollRef={props.scrollRef}/>
            </Box>
        </Box>
    )
}

export default TilesetWorkspace;