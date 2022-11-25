import React, { useEffect, useContext, useState, useCallback} from 'react'
import { Flex, Box } from '@chakra-ui/react';
import GlobalEditTilesetStoreContext from '../../../store/EditTilesetStore';
import e from 'express';

const TilesetCanvas = (props) => {
    const {canvasRef, contextRef} = props
    const {editTilesetStore} = useContext(GlobalEditTilesetStoreContext)
    const [isDrawing, setIsDrawing] = useState(false)
    const [lastPosition, setPosition] = useState({x: 0, y: 0})

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
        setPosition({x: event.pageX, y: event.pageY})
        setIsDrawing(true)
        // const {nativeEvent, clientX, clientY} = event
        // const {x, y} = canvasRef.current.getBoundingClientRect()
        // contextRef.current.beginPath()
        // contextRef.current.moveTo(clientX-x,clientY-y)
        // setIsDrawing(true)
    }

    const finishDrawing = (event) =>{
        setIsDrawing(false)
        // contextRef.current.closePath()
        // setIsDrawing(false)

    }

    const draw = useCallback((x, y) => {
        if(!isDrawing){return}
        contextRef.current.beginPath()
        contextRef.current.lineWidth = 10
        contextRef.current.lineJoin = 'round'
        contextRef.current.moveTo(lastPosition.x, lastPosition.y)
        contextRef.current.lineTo(x,y);
        contextRef.current.closePath()
        contextRef.current.stroke()

        setPosition({x:0, y:0})
    }, [lastPosition, isDrawing, setPosition])

    //
    const handleMouseDown = (event) => {
        startDrawing(event)
    }

    const handleMouseUp = (event) => {
        finishDrawing(event)
    }

    const handleMouseMove = (event) => {
        draw(event.pageX, event.pageY)
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