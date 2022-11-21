import React, {useContext} from "react";
import { Flex, Box, SimpleGrid } from '@chakra-ui/react'
import OverlayTile from "./OverlayTiles";
import GlobalEditStoreContext from "../../../store/EditStore";

const MainOverlay = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext)
    const {onMouseDown, onMouseUp, onMouseMove, onMouseLeave} = props
    const width = editStore.width;
    const height = editStore.height;
    
    let elements = []
    for(let i = 0; i < width*height; i++){
        elements.push(<OverlayTile/>)
    }

    return <SimpleGrid onClick={() => console.log('clicked')} className='cover-map'
        columns={width} spacing={'0px'}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        >
        {elements}
        
    </SimpleGrid>
}

export default MainOverlay