import React, {useRef} from 'react'
const MapCanvas= (props) => {
    //const canvasRef = useRef(null);

    return(
        <canvas 
            width= {props.width}  // replace with props.
            height= {props.height} 
            style ={CanvasStyle}
        />
    );
}
export default MapCanvas

const CanvasStyle ={
    border: "1px solid black"
}