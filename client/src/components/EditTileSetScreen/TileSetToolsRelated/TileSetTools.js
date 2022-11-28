import React, { useContext, useEffect, useRef,useState} from 'react'
import { HStack, IconButton,Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import { HiOutlinePencil } from "react-icons/hi";
import { RiShape2Fill, RiEraserLine } from "react-icons/ri"
import { GrSelect } from "react-icons/gr"
import { ImUndo, ImRedo, ImZoomIn, ImZoomOut } from "react-icons/im"

const TilesetTools = (props) => {
    const {zoomValue, setZoomValue}=props

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
                            //onClick={}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Redo"icon={<ImRedo className='md-icon'/>}
                            //onClick={}
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
                        <IconButton bg='transparent' title="Draw"icon={<HiOutlinePencil className='md-icon'/>}
                            //onClick={}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Eraser"icon={<RiEraserLine className='md-icon'/>}
                            //onClick={}
                        />
                    </Box>

            </SimpleGrid>
        </Box>)
                            
}

export default TilesetTools;