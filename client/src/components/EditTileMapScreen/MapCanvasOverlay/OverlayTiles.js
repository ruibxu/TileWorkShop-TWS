import React from "react";
import { Flex, Box } from '@chakra-ui/react'

const OverlayTile = (props) => {
    const {coords} = props
    console.log(coords)
    const key = `${coords[0]}-${coords[1]}`

    return <Box className='cover-map-tile'
        width={'64px'} height={'64px'}
        ></Box>
}

export default OverlayTile