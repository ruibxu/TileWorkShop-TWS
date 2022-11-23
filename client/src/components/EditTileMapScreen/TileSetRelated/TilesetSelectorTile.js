import React, {useEffect, useState} from "react";
import { Flex, Box } from '@chakra-ui/react'

const TilesetSelectorTile = (props) => {
    const {coords, selectedTile, keyString} = props
    const key = keyString

    return <Box id={key} className={selectedTile?'cover-tileset-selector-tile-selected':'cover-tileset-selector-tile'}
        onClick={() => console.log(selectedTile)}
        width={`100%`} height={`100%`}
        ></Box>
}

export default TilesetSelectorTile