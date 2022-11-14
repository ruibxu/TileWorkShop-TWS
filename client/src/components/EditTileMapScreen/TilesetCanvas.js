import React, { useRef, useEffect } from 'react'

const TilesetCanvas = props => {
    // var image = new Image();
    // const canvasRef = useRef();
    // image.src= "https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png";
    // const draw = ctx => {
    //     ctx.drawImage(image, 0, 0,320,512);
    // }

    // useEffect(() => {
    //     const canvas = canvasRef.current
    //     const context = canvas.getContext('2d')

    //     draw(context)
    // }, [draw])
    useEffect(() => {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var image = new Image();
        var parts =[];

        image.src =
            "https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png";
        var width = image.width;
        var height = image.height;
        var tilesize = 128;
        var w = width / tilesize;
        var h = height / tilesize;
        var x = 0;
        var y = 0;
        var count = w * h;
        image.onload = split;
        function split() {
            for (var i = 0; i < h; i++) {
                y = i * tilesize;
                for (var j = 0; j < w; j++) {
                    x = j * tilesize;
                    context.drawImage(image, x, y, tilesize, tilesize, x, y, tilesize, tilesize);
                    parts.push( canvas.toDataURL() );
                }
            }
            for (var i = 0;i< count;i++){
                var slicedImage = document.createElement('img')
                slicedImage.src = parts[i];
                var div = document.getElementById('canvas');
                div.appendChild( slicedImage );
            }
            // context.drawImage(this, 128, 128, tilesize, tilesize, x, y, tilesize, tilesize);
            // context.drawImage(image, x, y, width, height); 
        };


        //       image.onload = () => {

        //  for(var i=0; i<count; i++) {
        //   var x = (-w*i) % (w*2);
        //   var y = (h*i)<=h? 0 : -h;
        //   context.drawImage(image, x, y, tilesize, tilesize);
        //  }



    // };
    
      }, []);


return <canvas id = "canvas" width="640"
    height="1024" />
}

export default TilesetCanvas