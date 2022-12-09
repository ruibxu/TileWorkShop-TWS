import { ColorPicker, ColorFormats} from "react-canvas-color-picker";
import React, { useContext, useEffect, useRef,useState, useCallback} from 'react'
import { HStack, IconButton,Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';


const TilesetColorPicker = (props) => {
    const { color, setColor, isEditing} = props
    const [formats, setFormats] = useState(["rgba"]);
    const [spectrum, setSpectrum] = useState("hsva");

    const handleChange = useCallback(({ colors }) => {
        setColor(colors.rgba);
        //console.log(props.color);
    }, [isEditing]);



    return (
        <Box paddingTop={'20%'}>
                <ColorPicker
                spectrum={spectrum}
                formats={formats}
                initialColor={color}
                onPanStart={handleChange}
                onPan={handleChange}
                ref={props.colorPickerRef}
                />
        </Box>
    )
                            
}

export default TilesetColorPicker;