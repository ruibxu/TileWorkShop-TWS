import React, { useRef, useEffect } from 'react'
import {
    Box,
    Flex,
} from '@chakra-ui/react';

const TilesetCanvas = (props) => {
    const canvasRef = useRef(null);
    // const contextRef = useRef(null);
  
    useEffect(() => {
      // var canvas2 = document.getElementById("canvas");
      // canvasRef.current = canvas2;
      var canvas = document.createElement("canvas");
      canvas.height = 128;
      canvas.width = 128;
      var context = canvas.getContext("2d");
      var image = new Image();
      var parts =[];
      image.src =
      "https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png";
      //
    //   contextRef.current = context;
      image.crossOrigin="anonymous";
      var width = image.width;
      var height = image.height;
      var tilesize = 128;
      var w = width / tilesize;
      var h = height / tilesize;
      var x = 0;
      var y = 0;
      var count = w * h;
    //   image.onload = split();
      split();
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
          // context.drawImage(this, 128, 128, tilesize, tilesize, x, y, tilesize, tilesize);
          // context.drawImage(image, x, y, width, height); 
      };
    }, []);
  
      return <Box id = "canvas" 
    //   ref={ canvasRef }
     display = {'flex'}
     width = {'50px'}
    />
  }

export default TilesetCanvas