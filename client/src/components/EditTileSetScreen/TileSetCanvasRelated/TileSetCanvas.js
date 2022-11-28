import React, { useEffect, useContext, useState, useRef} from 'react'
import { Flex, Box,Spacer, color } from '@chakra-ui/react';
import GlobalEditTilesetStoreContext from '../../../store/EditTilesetStore';
import TilesetOverlay from '../TileSetOverlay/TileSetOverley';
import TileSetOverlayTile from '../TileSetOverlay/TileSetOverleyTile';
import { MdEventAvailable } from 'react-icons/md';
import { TOOLSFORTILESET } from '../../../translator-client/edit-options';

const TilesetCanvas = (props) => {
    const {canvasRef, contextRef, zoomValue, color, currentButton} = props
    const {editTilesetStore} = useContext(GlobalEditTilesetStoreContext)
    const [isDrawing, setIsDrawing] = useState(false)
    const [lastPosition, setPosition] = useState({x: 0, y: 0})

    const overlayInfo = useRef({height: -1, width: -1, overlayTiles:[]})
    const [overlayTiles, setOverlayTiles] = useState(overlayInfo.current.overlayTiles)

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

        const context = canvas.getContext('2d')
        context.scale(scale,scale)
        context.lineCap = "round"
        context.strokeStyle = `rgba(${props.color.r},${props.color.g},${props.color.b},${props.color.a})`;
        context.lineWidth = 5
        contextRef.current = context
    }, [])

    useEffect(()=>{
        const width = editTilesetStore.width
        const height = editTilesetStore.height
        updateOverlayInfo(width, height)
    }, [editTilesetStore.height, editTilesetStore.width])

    const updateOverlayInfo = (newWidth, newHeight) => {
        console.log('Attempt to update Overlay')
        const { width, height } = overlayInfo.current
        if(width == newWidth && height == newHeight){console.log("attempt cancelled");return}
        let elements = []
        for(let x = 0; x < newWidth; x++){
            for(let y = 0; y < newHeight; y++){
                elements.push(<TileSetOverlayTile coords={[x,y]}/>)
            }
        }
        overlayInfo.current = {width: newWidth, height: newHeight, overlayTiles:elements}
        setOverlayTiles(overlayInfo.current.overlayTiles)
        console.log('overlayInfo updated')
    }

    useEffect(()=>{
        const pixel = editTilesetStore.pixel
        const width = editTilesetStore.width
        const height = editTilesetStore.height
        const widthP = width*pixel
        const heightP = height*pixel

        const canvas = canvasRef.current;
        canvas.style.width = `${widthP*zoomValue}px`
        canvas.style.height = `${heightP*zoomValue}px`
    }, [zoomValue])

    useEffect(()=>{
        const context = contextRef.current
        context.strokeStyle = `rgba(${props.color.r},${props.color.g},${props.color.b},${props.color.a})`;
    }, [color])

    //Main switch call functions--------------------------------------------------

    //Draw functions
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
        contextRef.current.lineTo(offsetX/zoomValue, offsetY/zoomValue)
        contextRef.current.stroke()
    }

    //
    const Draw_MouseDown = (event) => {
        startDrawing(event)
    }

    const Draw_MouseUp = (event) => {
        finishDrawing(event)
    }

    const Draw_MouseMove = (event) => {
        draw(event)
    }
    
    // Eraser functions









    // Color Picker functions
    const ColorPicker_MouseDown = (event) => {
        //startDrawing(event)
        const{nativeEvent} = event
        const {offsetX, offsetY} = nativeEvent
        const pixel = contextRef.getImageData(offsetX/zoomValue, offsetY/zoomValue, 1, 1);
        const data = pixel.data;
        console.log(data);
    }









    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    const onMouseDown = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{return Draw_MouseDown(event)}
            //case TOOLSFORTILESET.ERASER:{return Eraser_MouseDown(event)}
            case TOOLSFORTILESET.COLOR_PICKER:{return ColorPicker_MouseDown(event)}
        }
    }

    const onMouseUp = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{return Draw_MouseUp(event)}
            //case TOOLSFORTILESET.ERASER:{return Eraser_MouseUp(event)}
        }
        
    }

    const onMouseMove = (event) => {
        event.preventDefault();
        //console.log(currentButton)
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{return Draw_MouseMove(event)}
            //case TOOLSFORTILESET.ERASER:{return Eraser_MouseMove(event)}
        }
    }

    const onMouseLeave = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{return Draw_MouseUp(event)}
            //case TOOLSFORTILESET.ERASER:{return Eraser_MouseLeave(event)}
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <Flex height={'100%'} width={'100%'} alignItems={'center'} padding={'20%'}>
            <Spacer/>
            <Box className='mapWorkspace' >
                <canvas 
                    ref={canvasRef}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                />
                <TilesetOverlay
                    width={editTilesetStore.width}
                    height={editTilesetStore.height}
                    elements={overlayTiles}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                />
                <TilesetOverlay
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                />
            </Box>
            <Spacer/>
        </Flex>
    );

}

export default TilesetCanvas;