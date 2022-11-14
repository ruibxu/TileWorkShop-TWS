import React, { useRef, useEffect } from 'react'

const TilesetCanvas = props => {
    var image = new Image();
    const canvasRef = useRef(null)
    image.src= "https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png";
    const draw = ctx => {
        ctx.drawImage(image, 0, 0,320,512);
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        draw(context)
    }, [draw])


    return <canvas   width="1200"
    height="1000" ref={canvasRef} {...props}/>
}

export default TilesetCanvas