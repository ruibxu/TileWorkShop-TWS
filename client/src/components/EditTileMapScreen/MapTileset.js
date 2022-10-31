import React, { useState, useContext, useEffect } from 'react'
import {
    Box,
    Flex,
    HStack,
    Image,
    IconButton,
    Container,

} from '@chakra-ui/react';
import TilesetToolbar from './TilesetToolbar';
import image from '../../img/tileset1.png';

const MapTileset = (props) => {


    return (
        <Box>
            <TilesetToolbar />
            <Box h ='100%' w = '100%'>
                <Image src={image} alt={'Tileset1'} h ='330px' paddingLeft={3}/>
            </Box>
        </Box>

    )
}

export default MapTileset;