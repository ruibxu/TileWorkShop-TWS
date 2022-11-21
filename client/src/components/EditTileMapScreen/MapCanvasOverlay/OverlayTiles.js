import React from "react";
import { Flex, Box } from '@chakra-ui/react'

const OverlayTile = (props) => {
    const {coords, zoomValue} = props
    const key = `${coords[0]}-${coords[1]}`

    return <Box className='cover-map-tile'
        width={`${64*zoomValue}px`} height={`${64*zoomValue}px`}
        ></Box>
}

export default OverlayTile