import React, { useState, useContext, useEffect } from 'react'
import {
    Box,
    Flex,
    HStack,
    Image,
    IconButton,
    Container,

} from '@chakra-ui/react';
import { GiResize } from "react-icons/gi";
import { TfiBrushAlt } from "react-icons/tfi"
import { MdOutlineFormatColorFill } from "react-icons/md"
import { RiShape2Fill, RiEraserLine } from "react-icons/ri"
import { GrSelect } from "react-icons/gr"
import { ImMagicWand, ImUndo, ImRedo, ImZoomIn, ImZoomOut } from "react-icons/im"

import image from '../../img/map1.png';
const MapWorkspace = (props) => {


    return (
        <Container maxW='100%' bg='lightgrey' height='100%' centerContent>
            <Box padding={'50'}><Image src = {image} alt={'map1'} /></Box>
        </Container>
    )
}

export default MapWorkspace;