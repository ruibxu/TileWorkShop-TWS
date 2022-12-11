import React, { useContext, useEffect, useRef, useState } from 'react'
import { HStack, IconButton, Flex, Box, Center, Container, Text, SimpleGrid } from '@chakra-ui/react';
import { HiOutlinePencil, HiOutlineHand } from "react-icons/hi";
import { RiShape2Fill, RiEraserLine } from "react-icons/ri"
import { GrSelect } from "react-icons/gr"
import { CgColorPicker } from "react-icons/cg";
import { ImUndo, ImRedo, ImZoomIn, ImZoomOut } from "react-icons/im"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { MdOutlineFormatColorFill } from "react-icons/md"

import { TOOLSFORTILESET } from '../../../translator-client/edit-options';
import GlobalEditTilesetStoreContext from '../../../store/EditTilesetStore';

const TilesetTools = (props) => {
    const { zoomValue, setZoomValue, currentButton, setCurrentButton, toolWidth, setToolWidth } = props
    const { editTilesetStore } = useContext(GlobalEditTilesetStoreContext)
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)
    const handleUndo = () => {
        editTilesetStore.undo()
        setCanUndo(editTilesetStore.canUndo())
        setCanRedo(editTilesetStore.canRedo())
    }

    const handleRedo = () => {
        editTilesetStore.redo()
        setCanUndo(editTilesetStore.canUndo());
        setCanRedo(editTilesetStore.canRedo())
    }
    useEffect(() => {
        setCanUndo(editTilesetStore.canUndo())
        setCanRedo(editTilesetStore.canRedo())
      }, [editTilesetStore])

    const handleOnClick = (value) => {
        setCurrentButton(value)
        //console.log(currentButton)
    }

    const handleZoomIn = () => {
        if (zoomValue < 16) {
            setZoomValue(zoomValue * 2)
            //editStore.updateZoomValue(editStore.zoomValue*2)
        }
    }

    const handleZoomOut = () => {
        if (zoomValue > 0.25) {
            setZoomValue(zoomValue / 2)
            //editStore.updateZoomValue(editStore.zoomValue/2)
        }
    }

    const handleLargerWidth = () => {
        if (toolWidth < 20) {
            setToolWidth(toolWidth + 1)
            //editStore.updateZoomValue(editStore.zoomValue*2)
        }
    }

    const handleSmallerWidth = () => {
        if (toolWidth > 1) {
            setToolWidth(toolWidth - 1)
            //editStore.updateZoomValue(editStore.zoomValue/2)
        }
    }
    const handleKeyPress = (event) => {
        //event.preventDefault();
        if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
            event.preventDefault();
            handleUndo()
        }

        if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
            event.preventDefault();
            handleRedo()
        }

        if (event.key === 'w') {
            handleLargerWidth()
        }

        if (event.key === 's') {
            handleSmallerWidth()
        }

        if (event.key === '=') {
            handleZoomIn()
        }

        if (event.key === '-') {
            handleZoomOut()
        }

        if (event.key === 'e') {
            handleOnClick(TOOLSFORTILESET.ERASER)
        }

        if (event.key === 'd') {
            handleOnClick(TOOLSFORTILESET.DRAW)
        }

        if (event.key === 'f') {
            handleOnClick(TOOLSFORTILESET.Bucket_FILL_TOOL)
        }

        if (event.key === 'p') {
            handleOnClick(TOOLSFORTILESET.COLOR_PICKER)
        }

        if (event.key === 'm') {
            handleOnClick(TOOLSFORTILESET.MOVE)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [props.isEditing, zoomValue, toolWidth])

    useEffect(() => {
        handleOnClick(TOOLSFORTILESET.MOVE)
        editTilesetStore.clearTransactions()
        setCanUndo(editTilesetStore.canUndo())
        setCanRedo(editTilesetStore.canRedo())
      }, [props.isEditing])

    return (
        <Box px={4} >
            <SimpleGrid columns={4} spacing={1}>
                <Box className='toolsfortileset'>
                    <IconButton bg='transparent' title="Undo [CTRL] + [Z]" icon={<ImUndo className='md-icon' />}
                        onClick={handleUndo} disabled={!canUndo}
                    />
                </Box>
                <Box className='toolsfortileset'>
                    <IconButton bg='transparent' title="Redo [CTRL] + [Y]" icon={<ImRedo className='md-icon' />}
                        onClick={handleRedo} disabled={!canRedo}
                    />
                </Box>
                <Box className='toolsfortileset'>
                    <IconButton bg='transparent' title="Zoom in [+]" icon={<ImZoomIn className='md-icon' />}
                        onClick={handleZoomIn}
                    />
                </Box>
                <Box className='toolsfortileset'>
                    <IconButton bg='transparent' title="Zoom out [-]" icon={<ImZoomOut className='md-icon' />}
                        onClick={handleZoomOut}
                    />
                </Box>

                <Box className='toolsfortileset' >
                    <IconButton bg='transparent' outlineColor={(currentButton == TOOLSFORTILESET.DRAW) ? 'purple' : 'transparent'} title={TOOLSFORTILESET.DRAW + ' [D]'} icon={<HiOutlinePencil className='md-icon' />}
                        onClick={() => handleOnClick(TOOLSFORTILESET.DRAW)} disabled={!props.isEditing}
                    />
                </Box>

                <Box className='toolsfortileset'>
                    <IconButton bg='transparent' outlineColor={(currentButton == TOOLSFORTILESET.ERASER) ? 'purple' : 'transparent'} title={TOOLSFORTILESET.ERASER + ' [E]'} icon={<RiEraserLine className='md-icon' />}
                        onClick={() => handleOnClick(TOOLSFORTILESET.ERASER)} disabled={!props.isEditing}
                    />
                </Box>


                <Box className='toolsfortileset'>
                    <IconButton bg='transparent' outlineColor={(currentButton == TOOLSFORTILESET.Bucket_FILL_TOOL) ? 'purple' : 'transparent'} title={TOOLSFORTILESET.Bucket_FILL_TOOL + ' [F]'} icon={<MdOutlineFormatColorFill className='md-icon' />}
                        onClick={() => handleOnClick(TOOLSFORTILESET.Bucket_FILL_TOOL)} disabled={!props.isEditing}
                    />
                </Box>

                <Box className='toolsfortileset'>
                    <IconButton bg='transparent' outlineColor={(currentButton == TOOLSFORTILESET.COLOR_PICKER) ? 'purple' : 'transparent'} title={TOOLSFORTILESET.COLOR_PICKER + ' [P]'} icon={<CgColorPicker className='md-icon' />}
                        onClick={() => handleOnClick(TOOLSFORTILESET.COLOR_PICKER)} disabled={!props.isEditing}
                    />
                </Box>
                <Box className='toolsfortileset'>
                    <IconButton bg='transparent' outlineColor={(currentButton == TOOLSFORTILESET.MOVE) ? 'purple' : 'transparent'} title={TOOLSFORTILESET.MOVE + ' [M]'} icon={<HiOutlineHand className='md-icon' />}
                        onClick={() => handleOnClick(TOOLSFORTILESET.MOVE)}
                    />
                </Box>



                <Box className='toolsfortileset'>
                    <IconButton bg='transparent' title="Increase tool width [W]" icon={<AiOutlineArrowUp className='md-icon' />}
                        onClick={handleLargerWidth} disabled={!props.isEditing}
                    />
                </Box>

                <Box className='toolsfortileset'>
                    <IconButton bg='transparent' title="Decrease tool width [S]" icon={<AiOutlineArrowDown className='md-icon' />}
                        onClick={handleSmallerWidth} disabled={!props.isEditing}
                    />
                </Box>


            </SimpleGrid>
        </Box>)

}

export default TilesetTools;