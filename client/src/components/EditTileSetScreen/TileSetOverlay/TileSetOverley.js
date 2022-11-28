import React from "react";
import { SimpleGrid } from '@chakra-ui/react'
// import GlobalEditStoreContext from "../../../store/EditStore";

const TilesetOverlay = (props) => {
    // const { editStore } = useContext(GlobalEditStoreContext)
    const {width, height, elements} = props
    const {onMouseDown, onMouseUp, onMouseMove} = props

    return <SimpleGrid onClick={() => console.log('clicked')} className='cover-tileset'
        columns={width} spacing={'0px'}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseUp}
        >
        {elements}
    </SimpleGrid>
}

export default TilesetOverlay