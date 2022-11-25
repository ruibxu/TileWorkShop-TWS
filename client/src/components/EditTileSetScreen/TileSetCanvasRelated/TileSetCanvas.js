import React, { useEffect, useContext, useState} from 'react'
import { Flex, Box } from '@chakra-ui/react';
import GlobalEditTilesetStoreContext from '../../../store/EditTilesetStore';

const TilesetCanvas = (props) => {
    const {canvasRef, contextRef} = props
    const {editTilesetStore} = useContext(GlobalEditTilesetStoreContext)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const scale = 2;
        const pixel = editTilesetStore.pixel
        const width = editTilesetStore.width
        const height = editTilesetStore.height
        const widthP = width*pixel
        const heightP = height*pixel

        const canvas = canvasRef.current;
        canvas.width = (widthP)*2
        canvas.height = (heightP)*2
        canvas.style.width = `${widthP*scale}px`
        canvas.style.height = `${heightP*scale}px`

        const context = canvas.getContext('2d')
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = 'Black'
        context.lineWidth = 5
        contextRef.current = context
    }, [])

    //
    const startDrawing = (event) => {
        const {nativeEvent, clientX, clientY} = event
        const {x, y} = canvasRef.current.getBoundingClientRect()
        contextRef.current.beginPath()
        contextRef.current.moveTo(clientX-x,clientY-y)
        setIsDrawing(true)
    }

    const finishDrawing = (event) =>{
        contextRef.current.closePath()
        setIsDrawing(false)

    }

    const draw = (event) => {
        
        //if(!isDrawing){return}
        const {nativeEvent, clientX, clientY} = event
        const {x, y} = canvasRef.current.getBoundingClientRect()
        console.log(event.clientX-x, event.clientY-y)
        contextRef.current.lineTo(clientX-x,clientY-y)
        contextRef.current.stroke()
    }

    //
    const handleMouseDown = (event) => {
        startDrawing(event)
    }

    const handleMouseUp = (event) => {
        finishDrawing(event)
    }

    const handleMouseMove = (event) => {
        draw(event)
    }

    return (<Flex>
        <Box className='mapWorkspace'>
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
            </Box>
    </Flex>
    );

}

export default TilesetCanvas;