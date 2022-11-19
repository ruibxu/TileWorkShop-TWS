import { useSafeLayoutEffect } from '@chakra-ui/react';
import React, {useRef, useEffect, useState} from 'react'
import { MdLayers } from 'react-icons/md';
import { Image, Flex, Box} from '@chakra-ui/react'
import image3 from '../../../ryan-polito-viridian-forest-1.jpg'
import TilesetToolbar from '../TileSetRelated/TilesetToolbar';
import tileset1 from '../../../img/tileset1.png'
const MapCanvas = (props) => {
    let { parts } = props
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const sourceRef = useRef(null);
    const selectRef = useRef(null);
    // const [mouseDown, setMouseDown] = useState(false)
    const [selection, setSelection] = useState([1,0])
    const [currentLayer, setCurrentLayer] = useState(0)
    let tilesetCrop = 64;
    let tilemapCrop = 64;
    let mouseDown = false
    const setMouseDown = (x) => {
        mouseDown = x
    }

    const layers = [{'0-0': [4,4], '0-1': [3,3]},{'0-3': [3,3]},{'0-5': [3,3]}]

    useEffect(()=>{
        const canvas = canvasRef.current
        canvas.width = props.width *2
        canvas.height = props.height *2
        canvas.style.width = `${props.width}px`
        canvas.style.height = `${props.height}px`

        const context = canvas.getContext('2d')
        context.scale(2,2)
        context.strokeStype = 'black'
        context.lineWidth = 5
        contextRef.current = context
    }, [])

    const handleMouseDown = (event) => {
        console.log(getCoords(event))
        //attempting to highlight selected
        const selectionC = getCoords(event)
        selectRef.current.style.left = `${selectionC[0]*64}px`
        selectRef.current.style.top = `${selectionC[1]*64}px`
        setSelection(selectionC)
        //attempting to highlight selected ends
    }

    const onMouseDown = (event) => {
        setMouseDown(true)
        addTile(event)
    }

    const onMouseUp = () => {
        setMouseDown(false)
    }

    const onMouseLeave = () => {
        setMouseDown(false)
    }

    const onMouseMove = (event) => {
        if(mouseDown){
            addTile(event)
        }
    }

    const addTile = (event) => {
        let clicked = getCoords(event);
        let key = `${clicked[0]}-${clicked[1]}`
        if (event.shiftKey){
            delete layers[currentLayer][key]
        }else{
            layers[currentLayer][key] = [selection[0], selection[1]]
        }
        draw()
    }

    const draw = () => {
        contextRef.current.clearRect(0,0,canvasRef.current.width, canvasRef.current.height)

        layers.forEach(layer => {
            Object.keys(layer).forEach(key=>{
                let positions = key.split('-')
                let positionX = Number(positions[0])
                let positionY = Number(positions[1])
                var [tilesetX, tilesetY] = layer[key]

                contextRef.current.drawImage(
                    sourceRef.current,
                    tilesetX * tilesetCrop, tilesetY *tilesetCrop, //top left corner of the grab
                    tilesetCrop, tilesetCrop, //Size of the grab
                    positionX * tilemapCrop, positionY * tilemapCrop, //where the grab is placed
                    tilemapCrop, tilemapCrop, //Size of placement
                )
            })
        });
        // if(!isDrawing){return}
        // const {offsetX, offsetY} = nativeEvent;
        // contextRef.current.lineTo(offsetX,offsetY)
        // contextRef.current.stroke()
    }

    const getCoords = (e) => {
        const {x, y} = e.target.getBoundingClientRect()
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
        return [Math.floor(mouseX/64), Math.floor(mouseY/64)]
    }

    


    return(<Flex>
        <Box>
            <TilesetToolbar />
            <Box>
            <Image id={'tileset Image'} src={tileset1} ref={sourceRef} color='Black' height={'100%'} overflow={'auto'} onLoad={draw}
                onMouseDown={handleMouseDown}
            />
            <div className='tileset-container_selection' ref={selectRef}></div>
            </Box>
        </Box>
        <Box className = 'mapWorkspace'>
        <canvas id={'tilemap'}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            ref={canvasRef}
            className={CanvasStyle}
        /></Box>
        </Flex>
    );
}
export default MapCanvas

const CanvasStyle ={
    border: "1px solid black"
}