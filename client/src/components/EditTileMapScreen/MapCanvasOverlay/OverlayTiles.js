import React from "react";
import { Flex, Box } from '@chakra-ui/react'

const OverlayTile = (props) => {
    const {onMouseDown, onMouseUp, onMouseMove, onMouseLeave} = props

    return <Box className='cover-map-tile'
        width={'64px'} height={'64px'}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}

        />
}

export default OverlayTile