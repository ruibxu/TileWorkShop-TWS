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

import { BiSelectMultiple } from "react-icons/bi"

const MapWorkspace = (props) => {


    return (
        <Container maxW='100%' bg='grey' centerContent>
            <Box padding='4' bg='blue.400' color='black' maxW='90%' maxH = '50%'>
                There are many benefits to a joint design and development system. Not only
                does it bring benefits to the design team, but it also brings benefits to
                engineering teams. It makes sure that our experiences have a consistent look
                and feel, not just in our design specs, but in production.
            </Box>
        </Container>
    )
}

export default MapWorkspace;