import React, { useRef, useEffect } from 'react'
import {
    Box,
    Flex,
} from '@chakra-ui/react';
import { SimpleGrid, Image} from '@chakra-ui/react'




const TilesetCanvas = (props) => {
    const { sourceRef } = props
    console.log('Tileset Canvas 2')
    let tilesetCrop = 128;

    const handleSelect = (event) => {
        console.log(getCoords(event))
        //attempting to highlight selected
        const selectionC = getCoords(event)
        props.setSelection(selectionC)
        //attempting to highlight selected ends
    }

    const getCoords = (e) => {
        const {x, y} = e.target.getBoundingClientRect()
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
        return [Math.floor(mouseX/tilesetCrop), Math.floor(mouseY/tilesetCrop)]//use tilemap scale here
    }

    return (
    <Image src='https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png' 
        onMouseDown={handleSelect}
        ref={sourceRef}/>
        )
}

export default TilesetCanvas