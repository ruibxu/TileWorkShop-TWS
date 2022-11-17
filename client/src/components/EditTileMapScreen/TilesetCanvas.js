import React, { useRef, useEffect } from 'react'
import {
    Box,
    Flex,
} from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react'

const TilesetCanvas = (props) => {
    const canvasRef = useRef(null);
    // const contextRef = useRef(null);
    var canvas = document.createElement("canvas");
    canvas.height = 128;
    canvas.width = 128;
    var context = canvas.getContext("2d");
    var image = new Image();
    var parts =[];
    image.src =
    "https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png";
    image.crossOrigin="anonymous";
    var width = image.width;
    var height = image.height;
    var tilesize = 128;
    var w = width / tilesize;
    var h = height / tilesize;
    var x = 0;
    var y = 0;
    var count = w * h;

    useEffect(() => {
        split();
    }, [props]);

    function split() {
        for (let i = 0; i < h; i++) {
            y = i * tilesize;
            console.log(y);
            for (let j = 0; j < w; j++) {
                x = j * tilesize;
                console.log(x);
                context.drawImage(image, x, y, tilesize, tilesize, 0, 0, tilesize, tilesize);
                parts.push( canvas.toDataURL() );
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        for (let i = 0;i< count;i++){
          var slicedImage = document.createElement('img')
          slicedImage.src = parts[i];
          slicedImage.className = "tileset_img";
          var div = document.getElementById('canvas');
          // const div =canvasRef.current;
          div.appendChild( slicedImage );
        }
    };


  
  
      return <SimpleGrid id = "canvas" 
                columns={5}
                spacing={0}
                overflowX={"scroll"}
                overflowY={"scroll"}
                height={"90%"}
                width={"100%"}
    //   ref={ canvasRef }
     //display = {'flex'}
     //width = {'50px'}
        />
  }

export default TilesetCanvas