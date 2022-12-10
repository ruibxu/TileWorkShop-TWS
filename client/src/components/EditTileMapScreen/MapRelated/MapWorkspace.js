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
import MapCanvas from './MapCanvas.js';
import GlobalEditStoreContext from '../../../store/EditStore';
import AuthContext from '../../../auth';

const MapWorkspace = (props) => {
    //layer format '{tilemap location x}-{tilemap location y}: [tileset location x, tilesset location y]'
    console.log('reload mapWorkSpace')
    const { editStore } = useContext(GlobalEditStoreContext)
    const { auth } = useContext(AuthContext)
    const handleExtendTimer = () => {
        if (editStore.editing) {
            props.resetTimer()
            editStore.sendRequest({
                expire: 600,
                data: {
                    request_type: "EDIT_PROJECT",
                    user_id: auth.user._id,
                    related_id: editStore.currentId
                }
            })
        }
    }
    return (
        <Box width={'100%'} height={'100%'} >
            <Box minW={'100%'} maxW={'100%'} minH={'100%'} maxH={'100%'} overflow={'auto'} ref={props.scrollRef} onClick={handleExtendTimer}>
                <MapCanvas width={'100%'} height={'100%'}
                    parts={props.parts}
                    canvasRef={props.canvasRef} contextRef={props.contextRef}
                    sourceRef={props.sourceRef} selectRef={props.selectRef}
                    currentLayer={props.currentLayer}
                    selection={props.selection} setSelection={props.setSelection}
                    currentTileSetId={props.currentTileSetId} zoomValue={props.zoomValue}
                    currentButton={props.currentButton} setCurrentButton={props.setCurrentButton}
                    scrollRef={props.scrollRef}
                />
            </Box>
        </Box>
    )
}

export default MapWorkspace;