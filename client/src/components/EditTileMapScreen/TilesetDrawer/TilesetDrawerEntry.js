import React from 'react'
import {
    Flex,
    Spacer,
    Text, Icon, IconButton, Box
  } from '@chakra-ui/react'
import { RiDeleteBinLine } from "react-icons/ri"

const TilesetDrawerEntry = (props) => {
    const { info, currentTileSetId} = props
    const { _id, name} = info
    
    const style = (_id == currentTileSetId)?'tileset-entry-selected':'tileset-entry'

    const handleSelect = () => {
        props.setCurrentTileSetId(_id)
        props.setSelection([0,0,_id])

    }

    return <Flex width={'100%'} alignItems={'center'} borderRadius={'lg'} className={style}
        onClick={handleSelect}
        >
        <Box ml={3}>{name}</Box>
        <Spacer/>
        <IconButton icon={<RiDeleteBinLine/>} bg='transparent'/>
    </Flex>
}

export default TilesetDrawerEntry;