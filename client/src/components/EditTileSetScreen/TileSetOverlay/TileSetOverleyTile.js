import React from "react";
import { Box } from '@chakra-ui/react'

const TileSetOverlayTile = (props) => {
    const {coords} = props
    const key = `${coords[0]}-${coords[1]}`

    return <Box className='cover-map-tile'
        width={'100%'} height={'100%'}
        ></Box>
}

export default TileSetOverlayTile