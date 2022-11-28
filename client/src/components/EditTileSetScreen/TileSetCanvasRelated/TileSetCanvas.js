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

    let BeforeChange = useRef(null)

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
        BeforeChange.current = getImageData()
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

    const copyImageData = (src) => {
        let newContext = contextRef.current.createImageData(src.width, src.height)
        newContext.data.set(src.data)
        return newContext
    }

    const createTransaction = () => {
        console.log('transaction created')
        let AfterChange = getImageData()
        console.log(BeforeChange.current)
        console.log(AfterChange)
        const BeforeChangeClone = copyImageData(BeforeChange.current)
        const redoCallback = () => updateImageData(BeforeChangeClone)
        const undoCallback = () => updateImageData(AfterChange)
        editTilesetStore.addCanvasTransaction(redoCallback, undoCallback)
    }

    //Main switch call functions--------------------------------------------------

    //Draw functions
    const Draw_MouseDown = (event) => {
        console.log('drawing started')
        const {nativeEvent, clientX, clientY} = event
        const {offsetX, offsetY} = nativeEvent
        const {x, y} = canvasRef.current.getBoundingClientRect()
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX/zoomValue, offsetY/zoomValue)
        setIsDrawing(true)
    }

    const Draw_MouseUp = (event) =>{
        contextRef.current.closePath()
        if(isDrawing){createTransaction()}
        setIsDrawing(false)
    }

    const Draw_MouseMove = (event) => {
        if (!isDrawing){return}
        
        console.log('draw')
        const{ clientX, clientY, nativeEvent} = event
        const {offsetX, offsetY} = nativeEvent
        const {x, y} = canvasRef.current.getBoundingClientRect()
        contextRef.current.lineTo(offsetX/zoomValue, offsetY/zoomValue)
        contextRef.current.stroke()
    }
    

    // Eraser functions


    const Eraser_MouseDown = (event) => {
        //contextRef.current.strokeStyle = `rgba(${props.color.r},${props.color.g},${props.color.b},${0})`;
        //startDrawing(event)
        //setMouseDown(true)
        //remove(getCoords(event))
    }

    const Eraser_MouseUp = (event) => {
        /*if (mouseDown) {
            editStore.addLayerStateTransaction(layers)
            editStore.changeLayer(layers)
        }*/
        //setMouseDown(false)
        //draw()
        //finishDrawing(event)
        //contextRef.current.strokeStyle = `rgba(${props.color.r},${props.color.g},${props.color.b},${props.color.a})`;
        
    }

    const Eraser_MouseMove = (event) =>{
        //draw(event)
        //if (mouseDown) {removeTile(getCoords(event))}
        //draw()
    }

    // Color Picker functions
    const ColorPicker_MouseDown = (event) => {
        //startDrawing(event)
        const{nativeEvent} = event
        const {offsetX, offsetY} = nativeEvent
        const pixel = contextRef.current.getImageData(offsetX/zoomValue, offsetY/zoomValue, 1, 1);
        const data = pixel.data;
        const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        console.log(data[0]);
        console.log(rgba);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const getImageData = () => {
        return contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    const updateImageData = (data) => {
        contextRef.current.putImageData(data, 0, 0)
    }
    
    const onMouseDown = (event) => {
        event.preventDefault();
        BeforeChange.current = getImageData()
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{Draw_MouseDown(event); break;}
            case TOOLSFORTILESET.ERASER:{Draw_MouseDown(event); break;}
            case TOOLSFORTILESET.COLOR_PICKER:{ColorPicker_MouseDown(event); break;}
        }
    }

    const onMouseUp = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{Draw_MouseUp(event); break;}
            case TOOLSFORTILESET.ERASER:{Draw_MouseUp(event); break;}
        }
    }

    const onMouseMove = (event) => {
        event.preventDefault();
        //console.log(currentButton)
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{Draw_MouseMove(event); break;}
            case TOOLSFORTILESET.ERASER:{Draw_MouseMove(event); break;}
        }
    }

    const onMouseLeave = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{Draw_MouseUp(event); break;}
            case TOOLSFORTILESET.ERASER:{Draw_MouseUp(event); break;}
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