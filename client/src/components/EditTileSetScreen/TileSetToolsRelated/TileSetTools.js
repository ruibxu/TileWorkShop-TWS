import React, { useContext, useEffect, useRef,useState} from 'react'
import { HStack, IconButton,Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import { HiOutlinePencil } from "react-icons/hi";
import { RiShape2Fill, RiEraserLine } from "react-icons/ri"
import { GrSelect } from "react-icons/gr"
import { CgColorPicker } from "react-icons/cg";
import { ImUndo, ImRedo, ImZoomIn, ImZoomOut } from "react-icons/im"
import { TOOLSFORTILESET } from '../../../translator-client/edit-options';
import GlobalEditTilesetStoreContext from '../../../store/EditTilesetStore';

const TilesetTools = (props) => {
    const {zoomValue, setZoomValue, currentButton,setCurrentButton}=props
    const {editTilesetStore} = useContext(GlobalEditTilesetStoreContext)

    const handleUndo = () => {
        console.log('handle undo')
        editTilesetStore.undo()
    }

    const handleRedo = () => {
        editTilesetStore.redo()
    }

    const handleOnClick = (value) => {
        setCurrentButton(value)
        //console.log(currentButton)
    }

    const handleZoomIn = () => {
        if(zoomValue<4){
          setZoomValue(zoomValue*2)
          //editStore.updateZoomValue(editStore.zoomValue*2)
        }
      }

    const handleZoomOut = () => {
        if(zoomValue>0.25){
            setZoomValue(zoomValue/2)
            //editStore.updateZoomValue(editStore.zoomValue/2)
        }
    }
    return (
        <Box px={4} >
            <SimpleGrid columns={4} spacing={1}>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Undo"icon={<ImUndo className='md-icon'/>}
                            onClick={handleUndo}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Redo"icon={<ImRedo className='md-icon'/>}
                            onClick={handleRedo}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Zoom in"icon={<ImZoomIn className='md-icon'/>}
                            onClick={ handleZoomIn}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Zoom out"icon={<ImZoomOut className='md-icon'/>}
                            onClick={handleZoomOut}
                        />
                    </Box>

                    <Box className='toolsfortileset' >
                        <IconButton bg='transparent' outlineColor={(currentButton == TOOLSFORTILESET.DRAW) ? 'purple' : 'transparent'} title={TOOLSFORTILESET.DRAW} icon={<HiOutlinePencil className='md-icon'/>}
                            onClick={() => handleOnClick(TOOLSFORTILESET.DRAW)}
                        />
                    </Box>

                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' outlineColor={(currentButton == TOOLSFORTILESET.ERASER) ? 'purple' : 'transparent'} title={TOOLSFORTILESET.ERASER} icon={<RiEraserLine className='md-icon'/>}
                            onClick={() => handleOnClick(TOOLSFORTILESET.ERASER)}
                        />
                    </Box>

                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' outlineColor={(currentButton == TOOLSFORTILESET.COLOR_PICKER) ? 'purple' : 'transparent'} title={TOOLSFORTILESET.COLOR_PICKER} icon={<CgColorPicker className='md-icon'/>}
                            onClick={() => handleOnClick(TOOLSFORTILESET.COLOR_PICKER)}
                        />
                    </Box>

            </SimpleGrid>
        </Box>)
                            
}

export default TilesetTools;