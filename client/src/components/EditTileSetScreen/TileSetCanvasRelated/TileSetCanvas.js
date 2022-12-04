import React, { useEffect, useContext, useState, useRef} from 'react'
import { Flex, Box,Spacer, color } from '@chakra-ui/react';
import GlobalEditTilesetStoreContext from '../../../store/EditTilesetStore';
import TilesetOverlay from '../TileSetOverlay/TileSetOverley';
import TileSetOverlayTile from '../TileSetOverlay/TileSetOverleyTile';
import { MdEventAvailable } from 'react-icons/md';
import { TOOLSFORTILESET } from '../../../translator-client/edit-options';
import image6 from '../../../04_Qiqi_02newyear_receive.png'

const TilesetCanvas = (props) => {
    const {canvasRef, contextRef, zoomValue, color, currentButton, setCurrentButton, toolWidth, scrollRef} = props
    const {editTilesetStore} = useContext(GlobalEditTilesetStoreContext)
    // const [isDrawing, setIsDrawing] = useState(false)
    const [lastPosition, setPosition] = useState({x: 0, y: 0})

    const overlayInfo = useRef({height: -1, width: -1, overlayTiles:[]})
    const [overlayTiles, setOverlayTiles] = useState(overlayInfo.current.overlayTiles)
    let isDrawing = false
    const setIsDrawing = (v) => {isDrawing = v}

    let BeforeChange = useRef(null)
    const scale = 10;

    useEffect(() => {
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
        context.lineWidth = toolWidth
        contextRef.current = context
        editTilesetStore.setRefs(canvasRef.current, contextRef.current)
        BeforeChange.current = getImageData()
    }, [editTilesetStore.currentId])

    useEffect(()=> {
        console.log('triggered')
        if(editTilesetStore.img){
            const img = new Image()
            img.crossOrigin = "Anonymous"
            img.src = editTilesetStore.img
            console.log(img)
            img.onload = () => {
                console.log(img.width, img.height)
                console.log(canvasRef.current.width, canvasRef.current.height)
                contextRef.current.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasRef.current.width/scale, canvasRef.current.height/scale)
                console.log(contextRef.current)
                BeforeChange.current = getImageData()
            }
        }
    }, [editTilesetStore.img])

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

    // refresh when color changes
    useEffect(()=>{
        const context = contextRef.current
        context.strokeStyle = `rgba(${props.color.r},${props.color.g},${props.color.b},${props.color.a})`;
    }, [color])

    // refresh when tool width changes
    useEffect(()=>{
        const context = contextRef.current
        context.lineWidth = toolWidth;
    }, [toolWidth])

    useEffect(()=>{
    }, [editTilesetStore.img])

    // refresh when currentButton changed
    useEffect(()=>{
        const context = contextRef.current
        if(currentButton== TOOLSFORTILESET.ERASER){
            context.globalCompositeOperation ='destination-out';
        }
        else{
            context.globalCompositeOperation ='source-over';
        }
    }, [currentButton])

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
        BeforeChange.current = getImageData()
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



    // Bucket fill functions
    /*const getCoords = (e) => {
        //e.target.getBoundingClientRect()
        const { x, y } = canvasRef.current.getBoundingClientRect()
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
        return [Math.floor((mouseX/zoomValue) / tilemapCrop), Math.floor((mouseY/zoomValue) / tilemapCrop)]//use tilemap scale here
    }*/

    const BucketFill_MouseDown = (event) => {
        console.log('drawing started')
        BeforeChange.current = getImageData()
        const {nativeEvent, clientX, clientY} = event
        const {offsetX, offsetY} = nativeEvent
        let x=offsetX/zoomValue
        let y=offsetY/zoomValue
        if(x%editTilesetStore.pixel!=0){ 
            x=x-x%editTilesetStore.pixel
        }
        if(y%editTilesetStore.pixel!=0){ 
            y=y-y%editTilesetStore.pixel
        }
        contextRef.current.beginPath();
        contextRef.current.rect(x,y,editTilesetStore.pixel,editTilesetStore.pixel)
        contextRef.current.fillStyle = `rgba(${props.color.r},${props.color.g},${props.color.b},${props.color.a})`;
        contextRef.current.fill();
        setIsDrawing(true)
    }

    const BucketFill_MouseUp = (event) =>{
        if(isDrawing){createTransaction()}
        setIsDrawing(false)
    }

    //move function
    console.log('page refreshed')
    let startX = 10;
    let startY = 10;
    let scrollX;
    let scrollY;

    const movehand_down = (event) => {
        setIsDrawing(true)
        startX = event.clientX - scrollRef.current.offsetLeft
        startY = event.clientY - scrollRef.current.offsetTop
        scrollX = scrollRef.current.scrollLeft
        scrollY = scrollRef.current.scrollTop
    }

    const movehand_up = () => {
        setIsDrawing(false)
    }

    const movehand_move = (event) =>{
        if (!isDrawing) {return}
        const x = event.clientX - scrollRef.current.offsetLeft;
        const y = event.clientY - scrollRef.current.offsetTop;
        const walkX = x - startX
        const walkY = y - startY
        scrollRef.current.scroll(scrollX-walkX, scrollY-walkY)
    }

    // Color Picker functions
    const ColorPicker_MouseDown = (event) => {
        const{ nativeEvent} = event
        const {offsetX, offsetY} = nativeEvent
        console.log(offsetX, offsetY)
        const x = offsetX*scale/zoomValue
        const y = offsetY*scale/zoomValue
        const pixel = contextRef.current.getImageData(x, y, 1, 1);
        const data = pixel.data;
        props.setColor({ r: data[0], g: data[1], b: data[2], a: data[3] / 255});
        setCurrentButton(TOOLSFORTILESET.DRAW);
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
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{Draw_MouseDown(event); break;}
            case TOOLSFORTILESET.ERASER:{Draw_MouseDown(event); break;}
            case TOOLSFORTILESET.Bucket_FILL_TOOL:{BucketFill_MouseDown(event); break;}
            case TOOLSFORTILESET.COLOR_PICKER:{ColorPicker_MouseDown(event); break;}
            case TOOLSFORTILESET.MOVE:{movehand_down(event); break}
        }
    }

    const onMouseUp = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{Draw_MouseUp(event); break;}
            case TOOLSFORTILESET.ERASER:{Draw_MouseUp(event); break;}
            case TOOLSFORTILESET.Bucket_FILL_TOOL:{BucketFill_MouseUp(event); break;}
            case TOOLSFORTILESET.MOVE:{movehand_up(event); break}
        }
    }

    const onMouseMove = (event) => {
        event.preventDefault();
        //console.log(currentButton)
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{Draw_MouseMove(event); break;}
            case TOOLSFORTILESET.ERASER:{Draw_MouseMove(event); break;}
            case TOOLSFORTILESET.MOVE:{movehand_move(event); break;}
        }
    }

    const onMouseLeave = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLSFORTILESET.DRAW:{Draw_MouseUp(event); break;}
            case TOOLSFORTILESET.ERASER:{Draw_MouseUp(event); break;}
            case TOOLSFORTILESET.Bucket_FILL_TOOL:{BucketFill_MouseUp(event); break;}
            case TOOLSFORTILESET.MOVE:{movehand_up(event); break;}
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <Flex height={'100%'} width={'100%'} alignItems={'center'} padding={'20%'}>
            <Spacer/>
            <Box className='mapWorkspace' >
                <canvas 
                    id='tilesetCanvas'
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