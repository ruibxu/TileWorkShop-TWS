import React, { useState, useContext, useEffect, useRef } from 'react'
import {
    Box,
    Flex,
    HStack,
    Image,
    IconButton,
    Container,

} from '@chakra-ui/react';
import TilesetToolbar from './TilesetToolbar';
//import image from '../../img/tileset1.png';
import Canvas from './TilesetCanvas2';

const MapTileset = (props) => {
    /*
    React.useEffect(() => {    
        var image = new Image();
        var c = document.getElementById("myCanvas")
        var context = c.getContext("2d");
        image.src= "https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png";
        image.onload = function() {
            context.drawImage(image, 0, 0);
        };
       
    })*/
    /*
    React.useEffect(() => {
        var img1 = new Image();
        img1.src = '../../img/tileset1.png';
        var c = document.getElementById("myCanvas");
        var context = c.getContext("2d");
        img1.onload = function () {
            context.drawImage(img1, 0, 0);
        };
        
      }, []);

    //<Image src={image} alt={'Tileset1'} h ='330px' paddingLeft={3}/>    
    
    <canvas
    id="myCanvas"
    width="1200"
    height="1000"
    style={{ border: "1px solid #d3d3d3" }}
    >
                    <canvas
                    id="myCanvas"
                    width="1200"
                    height="1000"
                    style={{ border: "1px solid #d3d3d3" }}
                >
                </canvas>
 */
    return (

        <Box>
            <TilesetToolbar />
            <Box>
                <Canvas sourceRef={props.sourceRef} setSelection={props.setSelection} currentTileSetId={props.currentTileSetId}/>
            </Box>
        </Box>
        // <div>      <TilesetToolbar />      <Canvas /></div>

    )
}

export default MapTileset;