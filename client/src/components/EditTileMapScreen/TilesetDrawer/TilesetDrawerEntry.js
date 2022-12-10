import React, { useEffect, useState, useContext } from 'react'
import {
    Flex,
    Spacer,
    Input,
    Text, Icon, IconButton, Box
} from '@chakra-ui/react'
import { RiDeleteBinLine } from "react-icons/ri"
import GlobalEditStoreContext from '../../../store/EditStore';

const TilesetDrawerEntry = (props) => {
    const { info, currentTileSetId } = props
    const { _id, name } = info
    const { editStore } = useContext(GlobalEditStoreContext)
    const [edit, setEdit] = useState(false)

    const style = (_id == currentTileSetId) ? 'tileset-entry-selected' : 'tileset-entry'
    let _name = name

    const handleSelect = () => {
        props.setCurrentTileSetId(_id)
        props.setSelection([0, 0, _id])
    }

    const handleFinishEdit = (e) => {
        const newName = e.target.value
        if (newName == '') { setEdit(false); return }
        editStore.updateTilesetName(_id, newName)
        _name = newName
        setEdit(false)
    }

    const handleDelete = () => {
        editStore.markTilesetForDeletion(_id)
        props.openDeleteModal.onOpen()
        
    }

    return <Flex width={'100%'} alignItems={'center'} borderRadius={'lg'} className={style}
        onClick={handleSelect}
    >
        {
            (edit) ?
                <Input defaultValue={_name} autoFocus={true} onBlur={handleFinishEdit} /> :
                <Box ml={3} onDoubleClick={() => setEdit(true)}>{_name}</Box>
        }
        <Spacer />
        <IconButton icon={<RiDeleteBinLine />} bg='transparent' onClick={handleDelete} isDisabled={!props.isEditing}/>
    </Flex>
}

export default TilesetDrawerEntry;