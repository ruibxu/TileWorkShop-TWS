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

    let tilemapCrop = 64;
    let mouseDown = false
    const setMouseDown = (x) => {mouseDown = x}
    let makeNewTransaction = true
    const setMakeNewTransaction = (x) => {makeNewTransaction = x}
    let selectedTiles = []
    const setSelectedTiles = (x) => {selectedTiles = x}
    const clearSelectedTiles = () => {selectedTiles = []}
    const addToSelectedTiles = (x) => {selectedTiles = [...selectedTiles, ...x]}
    //console.log((selectedTiles.length)?'empty array is true':'empty array is false')

    useEffect(() => {
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
    // stampbrush functions
    const stampbrush_down = (event) => {
        setMouseDown(true)
        addTile(getCoords(event))
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
        if (mouseDown) {addTile(getCoords(event))}
    }

    //Bucket fill function
    const bucketfill_down = (event) => {
        setMouseDown(true)
        const coords = getCoords(event)
        const tileToMatch = getTile(coords)
        const stop = matchTile([selection[0], selection[1], currentTileSetId], tileToMatch)
        if(stop){
            setMakeNewTransaction(false)
            return;
        }
        const fillArray = findFillAreaRecursive(coords, tileToMatch, []) 
        console.log(fillArray)
        addArray(fillArray)
        //addTile(getCoords(event))
    }
    const bucketfill_up = () => {
        if (mouseDown && makeNewTransaction) {
            editStore.addLayerStateTransaction(layers)
            editStore.changeLayer(layers)
        }
        setMakeNewTransaction(true)
        setMouseDown(false)
        draw()
    }


    //eraser functions
    const eraser_down = (event) => {
        setMouseDown(true)
        removeTile(getCoords(event))
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
        if (mouseDown) {removeTile(getCoords(event))}
    }

    // fill shape tool 
    let startCoords = [-3,-3]
    const setStartingCoords = (x) => {startCoords = x}
    const shapefill_down = (event) => {
        setMouseDown(true)
        setStartingCoords(getCoords(event))
    }
    const shapefill_up = (event) => {
        if (mouseDown){
            const endCoords = getCoords(event)
            const array = findRecArray(startCoords, endCoords)
            addArray(array)
            console.log(array)
        }
        if (mouseDown && makeNewTransaction) {
            editStore.addLayerStateTransaction(layers)
            editStore.changeLayer(layers)
        }
        setMouseDown(false)
        draw()
    }
    // const shapefill_move = (event) => {
    //     if (mouseDown) {fillTile(event)}
    // }

    //Main switch call functions end----------------------------------------------

    //Helper functions -----------------------------------------------------------
    const findRecArray = (coords1, coords2) => {
        let minX = Math.min(coords1[0], coords2[0])
        let maxX = Math.max(coords1[0], coords2[0])
        let minY = Math.min(coords1[1], coords2[1])
        let maxY = Math.max(coords1[1], coords2[1])
        if(minX == -3 || minY == -3){return}
        
        minX = (minX < 0)?0:minX;
        minY = (minY < 0)?0:minY;
        maxX = (maxX > editStore.width-1)?editStore.width-1:maxX
        maxY = (maxY > editStore.height-1)?editStore.height-1:maxY

        const list = []
        for(let x = minX; x <= maxX; x++){
            for(let y = minY; y <= maxY; y++){
                list.push(`${x}-${y}`)
            }
        }
        console.log([minX, maxX, minY, maxY])
        return list
        // for(let x = minX; x <= maxX)
    }

    const findFillAreaRecursive = (coors, match, list) => {
        if(coors[0] >= editStore.width || coors[1] >= editStore.height || coors[0] < 0 || coors[1] < 0){return list}
        const key = `${coors[0]}-${coors[1]}`
        if(list.includes(key)){return list}
        const currentTile = getTile(coors)
        const stop = matchTile(match, currentTile)
        if(!stop){return list}
        list.push(key)
        list = findFillAreaRecursive([coors[0]+1, coors[1]], match, list)
        list = findFillAreaRecursive([coors[0]-1, coors[1]], match, list)
        list = findFillAreaRecursive([coors[0], coors[1]+1], match, list)
        list = findFillAreaRecursive([coors[0], coors[1]-1], match, list)
        return list
    }

    const addArray = (coorsArray) => {
        coorsArray.forEach((key) => {
            addTile(key.split('-'))
        })
    }

    const getTile = (coors) => {
        let key = `${coors[0]}-${coors[1]}`
        let layer = layers.find(x => x.id == currentLayer)
        const tile = layer.data[key]
        return tile
    }

    const matchTile = (tile1, tile2) => {
        if(tile1 == null && tile2 == null){return true}
        if(tile1 == null || tile2 == null){return false}
        if(tile1.length != tile2.length){return false}
        for(let i = 0; i < tile1.length; i++){
            if(tile1[i] != tile2[i]){return false}
        }
        return true
    }

    //These are the only 2 functions that directly changes what layers looks like
    const addTile = (coors) => {
        console.log('from add tile')
        let key = `${coors[0]}-${coors[1]}`
        let layer = layers.find(x => x.id == currentLayer)
        let edit = canEdit(layer, key)
        if(!edit){return}
        layer.data[key] = [selection[0], selection[1], currentTileSetId]
        draw()
    }

    const removeTile = (coors) => {
        console.log('from remove tile')
        let key = `${coors[0]}-${coors[1]}`
        let layer = layers.find(x => x.id == currentLayer)
        let edit = canEdit(layer, key)
        if(!edit){return}
        delete layer.data[key];
        draw()
    }
    //These are the only 2 functions that directly changes what layers looks like

    const canEdit = (layer, key) => {
        if(layer.locked || !editStore.editing){return false}
        //more fields go here

        if(!selectedTiles.length){return true}
        if(selectedTiles.includes(key)){return true}
        return false
    }

    const draw = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        layers.slice().reverse().forEach(layer => {
            if(layer.hidden){return}
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
        console.log('mouseDown')
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_down(event)}
            case TOOLS.BUCKET_FILL_TOOL:{return bucketfill_down(event)}
            case TOOLS.ERASER:{return eraser_down(event)}
            case TOOLS.SHAPE_FILL_TOOL:{return shapefill_down(event)}
        }
    }

    const onMouseUp = (event) => {
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_up()}
            case TOOLS.BUCKET_FILL_TOOL:{return bucketfill_up()}
            case TOOLS.ERASER:{return eraser_up()}
            case TOOLS.SHAPE_FILL_TOOL:{return shapefill_up(event)}
        }
        
    }

    const onMouseMove = (event) => {
        //console.log(currentButton)
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_move(event)}
            case TOOLS.BUCKET_FILL_TOOL:{return}
            case TOOLS.ERASER:{return eraser_move(event)}
            case TOOLS.SHAPE_FILL_TOOL:{return}
        }
    }

    const onMouseLeave = (event) => {
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_up()}
            case TOOLS.BUCKET_FILL_TOOL:{return bucketfill_up()}
            case TOOLS.ERASER:{return eraser_up()}
            case TOOLS.SHAPE_FILL_TOOL:{return shapefill_up(event)}
        }
    }

    return (<Flex>
        <Box className='mapWorkspace'>
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

const CanvasStyle = {
    border: "1px solid black"
}