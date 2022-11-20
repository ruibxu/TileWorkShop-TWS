import React,{useContext} from 'react'
import {
    Box
  } from '@chakra-ui/react'

import GlobalEditStoreContext from '../../../store/EditStore'
import TilesetDrawerEntry from './TilesetDrawerEntry'

const TilesetDrawerList = (props) => {
    const { currentTileSetId } = props
    const { editStore } = useContext(GlobalEditStoreContext)
    const displaytilesets = editStore.tilesets.map(x => ({_id: x._id, name: x.name}))

    return <Box width={'100%'}>
        {displaytilesets.map((info) => (<TilesetDrawerEntry
            info={info} currentTileSetId={currentTileSetId}
            setCurrentTileSetId={props.setCurrentTileSetId}
            setSelection={props.setSelection}
            />))}
    </Box>
}

export default TilesetDrawerList;