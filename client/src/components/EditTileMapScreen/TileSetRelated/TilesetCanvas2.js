import React, { useRef, useEffect, useContext} from 'react'
import {
    Box,
    Flex,
} from '@chakra-ui/react';
import { SimpleGrid, Image} from '@chakra-ui/react'
import GlobalEditStoreContext from '../../../store/EditStore';




const TilesetCanvas = (props) => {
    const { sourceRef, currentTileSetId } = props
    console.log('Tileset Canvas 2')
    const { editStore } = useContext(GlobalEditStoreContext)

    const currentTS = editStore.tilesets.find(x => x._id == currentTileSetId)
    const tilesetCrop = currentTS.pixel;
    

    const handleSelect = (event) => {
        
        
        //attempting to highlight selected
        //const intendedSize = currentTS.pixel * currentTS.width
        const selectionC = getCoords(event)
        props.setSelection([...selectionC, currentTileSetId])
        // console.log([...selectionC, currentTileSetId])
        // console.log(sourceRef)
        // console.log(sourceRef.current.clientHeight)//scaled
        // console.log(sourceRef.current.clientWidth)
        // console.log(sourceRef.current.naturalHeight)//original
        // console.log(sourceRef.current.naturalWidth)
        //attempting to highlight selected ends
    }

    const getCoords = (e) => {
        const {x, y} = e.target.getBoundingClientRect()
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

    return (
    <Image src={currentTS.image.src}
        onMouseDown={handleSelect}
        ref={sourceRef}/>
        )
}

export default TilesetCanvas