import React, { useRef, useEffect, useState, useContext } from 'react'
import { Flex, Box,Spacer, Square } from '@chakra-ui/react'
import GlobalEditStoreContext from '../../../store/EditStore';
import { TOOLS } from '../../../translator-client/edit-options';
import MainOverlay from '../MapCanvasOverlay/MainOverlay';
import OverlayTile from '../MapCanvasOverlay/OverlayTiles';

const MapCanvas = (props) => {
    let { canvasRef, contextRef, currentLayer, selection, setSelection, currentTileSetId, currentButton, zoomValue, scrollRef} = props
    const { editStore } = useContext(GlobalEditStoreContext)
    const layers = JSON.parse(JSON.stringify(editStore.layers))

    let tilemapCrop= 64;
    let mouseDown = false
    const setMouseDown = (x) => {mouseDown = x}
    let makeNewTransaction = true
    const setMakeNewTransaction = (x) => {makeNewTransaction = x}
    let selectedTiles = []
    const setSelectedTiles = (x) => {selectedTiles = x}

    const overlayInfo = useRef({height: -1, width: -1, zoomValue: 8, overlayTiles:[]})
    const [overlayTiles, setOverlayTiles] = useState(overlayInfo.current.overlayTiles)

    useEffect(() => {
        const width = tilemapCrop*editStore.width
        const height = tilemapCrop*editStore.height 
        const canvas = canvasRef.current
        canvas.width = width * 2
        canvas.height = height * 2
        canvas.style.width = `${width*zoomValue}px`
        canvas.style.height = `${height*zoomValue}px`
        updateOverlayInfo(editStore.width, editStore.height, zoomValue)

        const context = canvas.getContext('2d')
        context.scale(2, 2)
        context.strokeStype = 'black'
        context.lineWidth = 5
        contextRef.current = context
        draw()
    }, [editStore.width, editStore.height, zoomValue, editStore.MapTileOverlay, editStore.currentId, canvasRef.current])//DO NOT PUT editStore.layers in here
    useEffect(() =>{
        draw()
    },[editStore.layers, currentLayer, currentTileSetId, contextRef.current])

    const updateOverlayInfo = (newWidth, newHeight, newZoomValue) => {
        const { width, height, zoomValue } = overlayInfo.current
        if(width == newWidth && height == newHeight && zoomValue == newZoomValue){return}
        let elements = []
        for(let x = 0; x < newWidth; x++){
            for(let y = 0; y < newHeight; y++){
                elements.push(<OverlayTile coords={[x,y]} zoomValue={newZoomValue}/>)
            }
        }
        overlayInfo.current = {width: newWidth, height: newHeight, zoomValue: newZoomValue, overlayTiles:elements}
        setOverlayTiles(overlayInfo.current.overlayTiles)
    }
    //Main switch call functions--------------------------------------------------
    // stampbrush functions
    const stampbrush_down = (event) => {
        setMouseDown(true)
        addTile(getCoords(event))
    }
    const stampbrush_up = () => {
        if (mouseDown && makeNewTransaction && currentLayer > 0) {
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
        setSelectedTiles(fillArray)
        addArray(fillArray)
        //addTile(getCoords(event))
    }
    const bucketfill_up = () => {
        if (mouseDown && makeNewTransaction && currentLayer > 0) {
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
        if (mouseDown && makeNewTransaction && currentLayer > 0) {
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
        }
        if (mouseDown && makeNewTransaction && currentLayer > 0) {
            editStore.addLayerStateTransaction(layers)
            editStore.changeLayer(layers)
        }
        setMouseDown(false)
        draw()
    }
    
    //move function
    let startX;
    let startY;
    let scrollX;
    let scrollY;

    const movehand_down = (event) => {
        setMouseDown(true)
        startX = event.clientX - scrollRef.current.offsetLeft
        startY = event.clientY - scrollRef.current.offsetTop
        scrollX = scrollRef.current.scrollLeft
        scrollY = scrollRef.current.scrollTop
    }

    const movehand_up = () => {
        setMouseDown(false)
    }

    const movehand_move = (event) =>{
        if (!mouseDown) {return}
        const x = event.clientX - scrollRef.current.offsetLeft;
        const y = event.clientY - scrollRef.current.offsetTop;
        const walkX = x - startX
        const walkY = y - startY
        scrollRef.current.scroll(scrollX-walkX, scrollY-walkY)
    }

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
        let success = false
        coorsArray.forEach((key) => {
            let newBol = addTile(key.split('-'), true)
            if(!success){success = newBol || success}
        })
        return success
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
    const addTile = (coors, drawLater) => {
        setMakeNewTransaction(false)
        let key = `${coors[0]}-${coors[1]}`
        let layer = layers.find(x => x.id == currentLayer)
        let edit = canEdit(layer, key)
        if(!edit){return false}
        if(!layer.data){layer.data = {}}
        setMakeNewTransaction(makeNewTransaction || true)
        layer.data[key] = [selection[0], selection[1], currentTileSetId]
        if(drawLater){return true}
        draw()
        return true
    }

    const removeTile = (coors, drawLater) => {
        setMakeNewTransaction(false)
        let key = `${coors[0]}-${coors[1]}`
        let layer = layers.find(x => x.id == currentLayer)
        let edit = canEdit(layer, key)
        if(!edit){return false}
        setMakeNewTransaction(makeNewTransaction || true)
        if(!layer.data){layer.data = {}}
        delete layer.data[key];
        if(drawLater){return true}
        draw()
        return true
    }
    //These are the only 2 functions that directly changes what layers looks like

    const canEdit = (layer, key) => {
        if(!layer){console.log('no layer selected');return false}
        if(layer.locked){console.log('locked'); return false}
        if(!editStore.editing){console.log('not edit mode', editStore.editing); return false}
        //more fields go here

        if(!selectedTiles.length){return true}
        if(selectedTiles.includes(key)){return true}
        return false
    }

    const draw = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        layers.slice().reverse().forEach(layer => {
            if(layer.hidden){return}
            if(!layer.data){return}
            Object.keys(layer.data).forEach(key => {
                let positions = key.split('-')
                let positionX = Number(positions[0])
                let positionY = Number(positions[1])
                let [tilesetX, tilesetY, tilesetId] = layer.data[key]
                const source = editStore.tilesets.find(x => x._id == tilesetId)
                //let image = <Image src={source.image.src} ref={tempRef}/>
                if (tilesetY == -1 || tilesetY == -1 || !source) { return }
                let tilesetCrop = source.pixel
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
        //e.target.getBoundingClientRect()
        const { x, y } = canvasRef.current.getBoundingClientRect()
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
        return [Math.floor((mouseX/zoomValue) / tilemapCrop), Math.floor((mouseY/zoomValue) / tilemapCrop)]//use tilemap scale here
    }
    //Helper functions -end-------------------------------------------------------

    const onMouseDown = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_down(event)}
            case TOOLS.BUCKET_FILL_TOOL:{return bucketfill_down(event)}
            case TOOLS.ERASER:{return eraser_down(event)}
            case TOOLS.SHAPE_FILL_TOOL:{return shapefill_down(event)}
            case TOOLS.MOVE:{return movehand_down(event)}
        }
    }

    const onMouseUp = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_up()}
            case TOOLS.BUCKET_FILL_TOOL:{return bucketfill_up()}
            case TOOLS.ERASER:{return eraser_up()}
            case TOOLS.SHAPE_FILL_TOOL:{return shapefill_up(event)}
            case TOOLS.MOVE:{return movehand_up(event)}
        }
        
    }

    const onMouseMove = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_move(event)}
            case TOOLS.BUCKET_FILL_TOOL:{return}
            case TOOLS.ERASER:{return eraser_move(event)}
            case TOOLS.SHAPE_FILL_TOOL:{return}
            case TOOLS.MOVE:{return movehand_move(event)}
        }
    }

    const onMouseLeave = (event) => {
        event.preventDefault();
        switch(currentButton){
            case TOOLS.STAMP_BRUSH:{return stampbrush_up()}
            case TOOLS.BUCKET_FILL_TOOL:{return bucketfill_up()}
            case TOOLS.ERASER:{return eraser_up()}
            case TOOLS.SHAPE_FILL_TOOL:{return shapefill_up(event)}
            case TOOLS.MOVE:{return movehand_up(event)}
        }
    }
    return (<Flex height={'100%'} width={'100%'} alignItems={'center'} padding={'20%'} >
        <Spacer/>
        <Box className='mapWorkspace'>
            <canvas id={'tilemap'}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                ref={canvasRef}
                className={CanvasStyle}
            />
            <MainOverlay
                elements={overlayTiles}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}/>
        </Box>
        <Spacer/>
    </Flex>
    );
}
export default MapCanvas

const CanvasStyle = {
    border: "1px solid black"
}