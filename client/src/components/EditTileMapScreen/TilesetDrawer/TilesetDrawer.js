import React, { useState, useContext, useEffect } from 'react'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Divider,
  Spacer, Flex, IconButton, useDisclosure
} from '@chakra-ui/react'
import TilesetDrawerList from './TilesetDrawerList'
import { AiOutlineFileAdd } from "react-icons/ai"
import UploadTilesetModal from '../../Modals/UploadTilesetModal'
import DeleteTilesetAlert from '../../Modals/DeleteTileset-Alert'

const TilesetDrawer = (props) => {
  const { isOpen, onClose, btnRef, currentTileSetId } = props
  const showUploadTilesetModal = useDisclosure()
  const showDeleteTilesetModal = useDisclosure()
  return <Drawer
    isOpen={isOpen}
    placement='right'
    onClose={onClose}
    finalFocusRef={btnRef}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>
        Tilesets:
        <Input placeholder='Search...' mb={2} mt={2} />
      </DrawerHeader>
      <Divider width={'100%'} borderColor={'purple'} />
      <DrawerBody>
        <TilesetDrawerList currentTileSetId={currentTileSetId} setCurrentTileSetId={props.setCurrentTileSetId}
          setSelection={props.setSelection} openDeleteModal = {showDeleteTilesetModal}
        />
      </DrawerBody>
      <Divider width={'100%'} borderColor={'purple'} />
      <DrawerFooter>
        <Flex width={'100%'}>
            <IconButton bg='transparent' title="Add New Tileset" icon={<AiOutlineFileAdd className='md-icon' variant={'outline'} colorScheme='purple' onClick={showUploadTilesetModal.onOpen} />} />
          <Spacer />
          <Button colorScheme='purple' variant={'outline'} onClick = {props.onClose}>Done</Button>
        </Flex>
      </DrawerFooter>
    </DrawerContent>
    <UploadTilesetModal isOpen={showUploadTilesetModal.isOpen} onClose={showUploadTilesetModal.onClose}/>
    <DeleteTilesetAlert isOpen={showDeleteTilesetModal.isOpen} onClose={showDeleteTilesetModal.onClose}/>
  </Drawer>
}

export default TilesetDrawer;