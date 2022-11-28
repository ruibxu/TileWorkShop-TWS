import { ColorPicker, ColorFormats} from "react-canvas-color-picker";
import React, { useContext, useEffect, useRef,useState, useCallback} from 'react'
import { HStack, IconButton,Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';


const TilesetColorPicker = (props) => {

    const handleChange = useCallback(({ colors }) => {
        props.setColor({ ...colors.rgba });
        
        //console.log(props.color);
    }, []);


    return (
        <Box paddingTop={'20%'}>
                <ColorPicker
                spectrum="hsva"
                formats={["rgba"]}
                initialColor={props.color}
                onPanStart={handleChange}
                onPan={handleChange}
                />
        </Box>
    )
                            
}

export default TilesetColorPicker;