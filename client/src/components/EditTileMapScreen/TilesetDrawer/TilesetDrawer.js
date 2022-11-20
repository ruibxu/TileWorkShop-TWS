import React from 'react'
import {
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
    Spacer, Flex, IconButton
  } from '@chakra-ui/react'
import TilesetDrawerList from './TilesetDrawerList'
import { AiOutlineFileAdd } from "react-icons/ai"


const TilesetDrawer = (props) => {
    const {isOpen, onClose, btnRef, currentTileSetId} = props

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
            <Input placeholder='Search...' mb={2} mt={2}/>
          </DrawerHeader>
            <Divider width={'100%'} borderColor={'purple'}/>
          <DrawerBody>
            <TilesetDrawerList currentTileSetId={currentTileSetId} setCurrentTileSetId={props.setCurrentTileSetId}
            setSelection={props.setSelection}
            />
          </DrawerBody>
          <Divider width={'100%'} borderColor={'purple'}/>
          <DrawerFooter>
            <Flex width={'100%'}>
              <IconButton bg='transparent' title="Add New Tileset" icon={<AiOutlineFileAdd className='md-icon' variant={'outline'} colorScheme='purple'/>} />
              <Spacer/>
              <Button colorScheme='purple' variant={'outline'}>Done</Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
}

export default TilesetDrawer;