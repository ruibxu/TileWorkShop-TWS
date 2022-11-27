import React, { useRef, useEffect, useContext, useState} from 'react'
import {
    Box,
    Flex,
} from '@chakra-ui/react';
import { SimpleGrid, Image} from '@chakra-ui/react'
import GlobalEditStoreContext from '../../../store/EditStore';
import TilesetSelectorOverlay from './TilesetSelectorOverlay';
import TilesetSelectorTile from './TilesetSelectorTile';




const TilesetCanvas = (props) => {
    const { sourceRef, currentTileSetId, selection} = props
    const { editStore } = useContext(GlobalEditStoreContext)

    const currentTS = (editStore.tilesets)?editStore.tilesets.find(x => x._id == currentTileSetId):{height: -1, width:-1, pixel:-1, image: false}
    const tilesetCrop = currentTS.pixel;

    const TilesetOverlayRef = useRef({width: 0, height: 0, pixel: 16, overlayTiles:[], selectedString:`${selection[0]}-${selection[1]}`})
    const [TilesetOverlay, setTilesetOverlay] = useState(TilesetOverlayRef.current)
    useEffect(()=>{
        updateOverlayTiles(`${selection[0]}-${selection[1]}`)
    },[currentTileSetId, selection])

    useEffect(()=>{
        const selectString = `${selection[0]}-${selection[1]}`
    }, [selection])

    const updateOverlayTiles = (selectedString) => {
        console.log('attemp remake overlay')
        const {height, width, pixel} = currentTS
        if(width == TilesetOverlayRef.current.width && height == TilesetOverlayRef.current.height && pixel == TilesetOverlayRef.current.pixel && selectedString == TilesetOverlayRef.current.selectedString){return;}
        let elements = []
        for(let y = 0; y < height; y++){
            for(let x = 0; x < width; x++){
                let keyString = `${x}-${y}`
                elements.push(<TilesetSelectorTile coords={[x,y]} keyString={keyString} selectedTile={selectedString == keyString}/>)
            }
        }
        TilesetOverlayRef.current = {width: width, height: height, pixel: pixel, overlayTiles:elements, selectedString:selectedString}
        setTilesetOverlay(TilesetOverlayRef.current)
    }
    

    const handleSelect = (event) => {
        event.preventDefault()
        const selectionC = getCoords(event)
        props.setSelection([...selectionC, currentTileSetId])
    }

    const getCoords = (e) => {
        const {x, y} = sourceRef.current.getBoundingClientRect()
        const displayY = sourceRef.current.clientHeight;
        const displayX = sourceRef.current.clientWidth;
        const naturalY = sourceRef.current.naturalHeight;
        const naturalX = sourceRef.current.naturalWidth;
        const scaleX = naturalX/displayX
        const scaleY = naturalY/displayY
        
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
        console.log(`X: ${mouseX}`)
        console.log(`Y: ${mouseY}`)
        return [Math.floor(mouseX*scaleX/tilesetCrop), Math.floor(mouseY*scaleY/tilesetCrop)]//use tilemap scale here
    }

    return ((currentTS.image)?
            <Box position={'relative'} maxW={'max-content'}>
                <Image src={currentTS.image.src}
                    onMouseDown={handleSelect}
                    ref={sourceRef}/>
                <TilesetSelectorOverlay 
                    onMouseDown={handleSelect}
                    width={TilesetOverlay.width}
                    height={TilesetOverlay.height}
                    elements={TilesetOverlay.overlayTiles}/>
            </Box>:<></>
        )
}

export default TilesetCanvas