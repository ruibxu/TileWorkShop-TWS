import React, { useState, useContext, useEffect } from 'react'
import GlobalStoreContext from '../../store/ProjectStore'
import AuthContext from '../../auth'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    Input,
    Divider,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Flex,
    NumberInput,
    NumberInputField,
    Spacer
} from '@chakra-ui/react'

const CreateModal = (props) => {
    const [createType, setCreateType] = useState('TileSet')
    const { store } = useContext(GlobalStoreContext)
    const { auth } = useContext(AuthContext)
    const [name, setName] = useState('Untitled')
    const [height, setHeight] = useState(16)
    const [width, setWidth] = useState(16)

    const handleCreate = () => {
        //-Insert Create Backend call here
        if (createType == "TileMap") {
            store.createNewTilemap({
                user_id: auth.user._id,
                data: {
                    name: name,
                    height: height,
                    width: width,
                    layers: [],
                    tileset: []
                }
            })
            //props.redirect(`/tilemap/${store.currentTileMap._id}`)
        } else {
            store.createNewTileset({
                user_id: auth.user._id,
                data: {
                    name: name,
                    height: height,
                    width: width,
                    pixel: 16
                }
            })
            //props.redirect(`/tileset/${store.currentTileSet._id}`)
        }
        //--------------------------------
        props.onClose()
        setName('Untitled')
        setHeight(16)
        setWidth(16)
    }

    //console.log(height)

    return (<Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent maxW='500px'>
            <ModalHeader>{`Create ${createType}:`}</ModalHeader>
            <ModalCloseButton />
            <Divider borderColor={'purple'} />
            <ModalBody>
                <RadioGroup onChange={setCreateType} value={createType}>
                    <Stack direction='row' gap={3}>
                        <Radio value='TileSet' size='lg'>TileSet</Radio>
                        <Radio value='TileMap' size='lg'>TileMap</Radio>
                    </Stack>
                </RadioGroup>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Input Project Name:</FormLabel>
                        <Input size='md' borderColor={'purple'} defaultValue={name}
                            onChange={(event) => { setName(event.target.value) }} />
                    </FormControl>
                </Stack>
                <Flex>
                    <FormControl mr={5}>
                        <FormLabel>Height:</FormLabel>
                        <NumberInput defaultValue={height}>
                            <NumberInputField size='md' borderColor={'purple'}
                                onChange={(event) => { setHeight(event.target.value) }}
                            />
                        </NumberInput>
                    </FormControl>
                    <Spacer />
                    <FormControl ml={5}>
                        <FormLabel>Width:</FormLabel>
                        <NumberInput defaultValue={width}>
                            <NumberInputField size='md' borderColor={'purple'}
                                onChange={(event) => { setWidth(event.target.value) }}
                            />
                        </NumberInput>
                    </FormControl>
                </Flex>
            </ModalBody>
            <Divider borderColor={'purple'} />
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleCreate} minW={425}>
                    Create
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}

export default CreateModal;