import React, { useEffect, useContext, useState, useCallback} from 'react'
import { Flex, Box } from '@chakra-ui/react';
import GlobalEditTilesetStoreContext from '../../../store/EditTilesetStore';

const TilesetCanvas = (props) => {
    const {canvasRef, contextRef} = props
    const {editTilesetStore} = useContext(GlobalEditTilesetStoreContext)
    const [isDrawing, setIsDrawing] = useState(false)
    const [lastPosition, setPosition] = useState({x: 0, y: 0})

    const zoomValue = 2

    useEffect(() => {
        const scale = 10;
        const pixel = editTilesetStore.pixel
        const width = editTilesetStore.width
        const height = editTilesetStore.height
        const widthP = width*pixel
        const heightP = height*pixel

        const canvas = canvasRef.current;
        canvas.width = (widthP*scale)
        canvas.height = (heightP*scale)
        canvas.style.width = `${widthP*zoomValue}px`
        canvas.style.height = `${heightP*zoomValue}px`

        const context = canvas.getContext('2d')
        context.scale(scale,scale)
        context.lineCap = "round"
        context.strokeStyle = `rgba(${props.color.r},${props.color.g},${props.color.b},${props.color.a})`;
        context.lineWidth = 5
        contextRef.current = context
    }, [])

    //
    const startDrawing = (event) => {
        console.log('drawing started')
        const {nativeEvent, clientX, clientY} = event
        const {offsetX, offsetY} = nativeEvent
        const {x, y} = canvasRef.current.getBoundingClientRect()
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX/zoomValue, offsetY/zoomValue)
        setIsDrawing(true)
    }

    const finishDrawing = (event) =>{
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    const draw = (event) => {
        if (!isDrawing){return}
        console.log('draw')
        const{ clientX, clientY, nativeEvent} = event
        const {offsetX, offsetY} = nativeEvent
        const {x, y} = canvasRef.current.getBoundingClientRect()
        const canvasX = clientX-x
        const canvasY = clientY-y
        contextRef.current.lineTo(offsetX/zoomValue, offsetY/zoomValue)
        contextRef.current.stroke()
    }

    // const draw = useCallback((x, y) => {
    //     if(!isDrawing){return}
    //     contextRef.current.beginPath()
    //     contextRef.current.lineWidth = 10
    //     contextRef.current.lineJoin = 'round'
    //     contextRef.current.moveTo(lastPosition.x, lastPosition.y)
    //     contextRef.current.lineTo(x,y);
    //     contextRef.current.closePath()
    //     contextRef.current.stroke()

    //     setPosition({x, y})
    // }, [lastPosition, isDrawing, setPosition])

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

    return (
    <Box height={'100%'} width={'100%'}  overflow={'auto'}>
        <Flex height={'100%'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
            <Box className='mapWorkspace' >
                <canvas 
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                />
                </Box>
        </Flex>
    </Box>
    );

}

export default TilesetCanvas;