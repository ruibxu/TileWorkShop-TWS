import { useSafeLayoutEffect } from '@chakra-ui/react';
import React, { useRef, useEffect, useState, useContext } from 'react'
import { MdLayers } from 'react-icons/md';
import { Flex, Box } from '@chakra-ui/react'
import image3 from '../../../ryan-polito-viridian-forest-1.jpg'
import TilesetToolbar from '../TileSetRelated/TilesetToolbar';
import tileset1 from '../../../img/tileset1.png'
import GlobalEditStoreContext from '../../../store/EditStore';
import { TOOLS } from '../../../translator-client/edit-options';

const MapCanvas = (props) => {
    let { canvasRef, contextRef, currentLayer, selection, setSelection, currentTileSetId, currentButton} = props
    const { editStore } = useContext(GlobalEditStoreContext)
    const layers = JSON.parse(JSON.stringify(editStore.layers))
    const tempRef = useRef(<img src='https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png'/>)

    let tilemapCrop = 128;
    let mouseDown = false
    const setMouseDown = (x) => {mouseDown = x}

    useEffect(() => {
        console.log('this is a problem')
        const width = tilemapCrop*editStore.width
        const height = tilemapCrop*editStore.height
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
    }, [editStore.width, editStore.height])
    useEffect(() =>{
        draw()
    },[editStore.layers])
    //Main switch call functions--------------------------------------------------
    const stampbrush_down = (event) => {
        setMouseDown(true)
        addTile(event)
    }
    const stampbrush_up = () => {
        if (mouseDown) {
            editStore.addLayerStateTransaction(layers)
            editStore.changeLayer(layers)
        }
        setMouseDown(false)
        draw()
    }
    const stampbrush_move = (event) => {
        if (mouseDown) {addTile(event)}
    }

    const eraser_down = (event) => {
        setMouseDown(true)
        removeTile(event)
    }

    const eraser_up = () => {
        if (mouseDown) {
            editStore.addLayerStateTransaction(layers)
            editStore.changeLayer(layers)
        }
        setMouseDown(false)
        draw()
    }

    const eraser_move = (event) =>{
        if (mouseDown) {removeTile(event)}
    }

    //Main switch call functions end----------------------------------------------

    //Helper functions -----------------------------------------------------------
    const addTile = (event) => {
        console.log('from add tile')
        let clicked = getCoords(event);
        let key = `${clicked[0]}-${clicked[1]}`
        layers[currentLayer].data[key] = [selection[0], selection[1], currentTileSetId]
        draw()
    }

    const removeTile = (event) => {
        console.log('from remove tile')
        let clicked = getCoords(event);
        let key = `${clicked[0]}-${clicked[1]}`
        delete layers[currentLayer].data[key];
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
    }

    const getCoords = (e) => {
        const { x, y } = e.target.getBoundingClientRect()
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
        return [Math.floor(mouseX / tilemapCrop), Math.floor(mouseY / tilemapCrop)]//use tilemap scale here
    }
    //Helper functions -end-------------------------------------------------------

    const onMouseDown = (event) => {
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_down(event)}
            case TOOLS.ERASER:{return eraser_down(event)}
        }
    }

    const onMouseUp = () => {
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_up()}
            case TOOLS.ERASER:{return eraser_up()}
        }
        
    }

    const onMouseMove = (event) => {
        console.log(currentButton)
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_move(event)}
            case TOOLS.ERASER:{return eraser_move(event)}
        }
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