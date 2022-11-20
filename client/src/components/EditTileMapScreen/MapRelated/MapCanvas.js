import { useSafeLayoutEffect } from '@chakra-ui/react';
import React, { useRef, useEffect, useState, useContext } from 'react'
import { MdLayers } from 'react-icons/md';
import { Flex, Box } from '@chakra-ui/react'
import image3 from '../../../ryan-polito-viridian-forest-1.jpg'
import TilesetToolbar from '../TileSetRelated/TilesetToolbar';
import tileset1 from '../../../img/tileset1.png'
import GlobalEditStoreContext from '../../../store/EditStore';
const MapCanvas = (props) => {
    let { canvasRef, contextRef, sourceRef, selectRef, currentLayer, selection, setSelection, currentTileSetId } = props
    // const canvasRef = useRef(null);
    // const contextRef = useRef(null);
    // const [mouseDown, setMouseDown] = useState(false)
    const { editStore } = useContext(GlobalEditStoreContext)
    const layers = JSON.parse(JSON.stringify(editStore.layers))
    const tempRef = useRef(<img src='https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png'/>)
    //const [currentLayer, setCurrentLayer] = useState(0)

    let tilemapCrop = 128;
    let mouseDown = false
    const setMouseDown = (x) => {
        mouseDown = x
    }

    const width = '1280'
    const height = '1280'

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = width * 2
        canvas.height = height * 2
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        const context = canvas.getContext('2d')
        context.scale(2, 2)
        context.strokeStype = 'black'
        context.lineWidth = 5
        contextRef.current = context
        draw()
    }, [])
    useEffect(() =>{
        draw()
    },[editStore.layers])
    //layer format '{tilemap location x}-{tilemap location y}: [tileset location x, tilesset location y]'
    //let layers = [{},{},{}]

    const handleMouseDown = (event) => {
        console.log(getCoords(event))
        //attempting to highlight selected
        const selectionC = getCoords(event)
        setSelection(selectionC)
        //attempting to highlight selected ends
    }

    const onMouseDown = (event) => {
        setMouseDown(true)
        addTile(event)
    }

    const onMouseUp = () => {
        if (mouseDown) {
            editStore.addLayerStateTransaction(layers)
            editStore.changeLayer(layers)
        }
        setMouseDown(false)
        
        draw()
    }

    // const onMouseLeave = () => {
    //     setMouseDown(false)
    // }

    const onMouseMove = (event) => {
        if (mouseDown) {
            addTile(event)
        }
    }

    const addTile = (event) => {
        console.log(currentLayer)
        let clicked = getCoords(event);
        let key = `${clicked[0]}-${clicked[1]}`
        if (event.shiftKey) {
            delete layers[currentLayer].data[key];
        } else {
            layers[currentLayer].data[key] = [selection[0], selection[1], currentTileSetId]
        }
        console.log([selection[0], selection[1], currentTileSetId])
        draw()
    }

    const draw = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        layers.slice().reverse().forEach(layer => {
            Object.keys(layer.data).forEach(key => {
                let positions = key.split('-')
                let positionX = Number(positions[0])
                let positionY = Number(positions[1])
                let [tilesetX, tilesetY, tilesetId] = layer.data[key]
                const source = editStore.tilesets.find(x => x._id == tilesetId)
                let tilesetCrop = source.pixel
                //let image = <Image src={source.image.src} ref={tempRef}/>
                if (tilesetY == -1 || tilesetY == -1 || !source) { return }
                contextRef.current.drawImage(
                    source.image,
                    tilesetX * tilesetCrop, tilesetY * tilesetCrop, //top left corner of the grab
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
        const { x, y } = e.target.getBoundingClientRect()
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
        return [Math.floor(mouseX / tilemapCrop), Math.floor(mouseY / tilemapCrop)]//use tilemap scale here
    }




    return (<Flex>
        <Box className='mapWorkspace'>
            <canvas id={'tilemap'}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseUp}
                ref={canvasRef}
                className={CanvasStyle}
            /></Box>
    </Flex>
    );
}
export default MapCanvas

const CanvasStyle = {
    border: "1px solid black"
}