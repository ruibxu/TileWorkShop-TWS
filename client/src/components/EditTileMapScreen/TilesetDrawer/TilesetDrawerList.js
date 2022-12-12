import React,{useContext, useEffect, useState} from 'react'
import {
    Box
  } from '@chakra-ui/react'

import GlobalEditStoreContext from '../../../store/EditStore'
import TilesetDrawerEntry from './TilesetDrawerEntry'
import { RiContactsBookLine } from 'react-icons/ri'

const TilesetDrawerList = (props) => {
    const { currentTileSetId } = props
    const { editStore } = useContext(GlobalEditStoreContext)
    const [displaytilesets, setDisplaytilesets] = useState((editStore.tilesets)?editStore.tilesets.map(x => ({_id: x._id, name: x.name})):[])

    useEffect(()=>{
        console.log('triggered this effect')
        setDisplaytilesets((editStore.tilesets)?editStore.tilesets.map(x => ({_id: x._id, name: x.name})):[])
    }, [editStore.tilesets])

    console.log(editStore.tilesets)

    return <Box width={'100%'} height={'100%'} overflowY={'auto'} className={'scroll-bar'}>
        {editStore.tilesets.map((info) => (<TilesetDrawerEntry
            info={info} currentTileSetId={currentTileSetId}
            setCurrentTileSetId={props.setCurrentTileSetId}
            setSelection={props.setSelection}
            openDeleteModal = {props.openDeleteModal}
            />))}
    </Box>
}

export default TilesetDrawerList;