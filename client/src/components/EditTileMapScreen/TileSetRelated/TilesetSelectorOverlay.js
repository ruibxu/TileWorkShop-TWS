import React, {useContext} from "react";
import { Flex, Box, SimpleGrid } from '@chakra-ui/react'
// import GlobalEditStoreContext from "../../../store/EditStore";

const TilesetSelectorOverlay = (props) => {
    // const { editStore } = useContext(GlobalEditStoreContext)
    const {onMouseDown, width, height, elements} = props

    //const elements = editStore.MapTileOverlay
    console.log('force reload')

    return <SimpleGrid onClick={() => console.log('clicked')} className='cover-tileset-selector'
        columns={width} spacing={'0px'}
        onMouseDown={onMouseDown}
        >
        {elements}
    </SimpleGrid>
}

export default TilesetSelectorOverlay