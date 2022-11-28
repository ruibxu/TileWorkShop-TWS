import React, { useState, useContext, useEffect } from 'react'
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
import GlobalEditStoreContext from '../../store/EditStore';

const UploadTilesetModal = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext);
    const { auth } = useContext(AuthContext)
    const [name, setName] = useState('Untitled')
    const [height, setHeight] = useState(16)
    const [width, setWidth] = useState(16)
    const [pixel, setPixel] = useState(16)
    const [upload, setUpload] = useState("")
    const handleChange = (event) => {
        const reader = new FileReader()
        const file = document.querySelector('#input-tileset').files[0];
        reader.addEventListener('load', () => {
            setUpload(reader.result)
        }, false)
        reader.readAsDataURL(file)
    }

    const handleCreate = () => {
        editStore.addNewTileset({
            user_id: auth.user._id,
            tileset: {
                name: name,
                height: height,
                width: width,
                pixel: pixel
            }
        }, upload)
        props.onClose()
    }

    return (<Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent maxW='500px'>
            <ModalHeader>{`Upload TileSet:`}</ModalHeader>
            <ModalCloseButton />
            <Divider borderColor={'purple'} />
            <ModalBody>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Input Project Name:</FormLabel>
                        <Input size='md' borderColor={'purple'} defaultValue={name}
                            onChange={(event) => { setName(event.target.value) }} />
                    </FormControl>
                </Stack>
                <Flex gap={5}>
                    <FormControl>
                        <FormLabel>Height:</FormLabel>
                        <NumberInput defaultValue={height}>
                            <NumberInputField size='md' borderColor={'purple'}
                                onChange={(event) => { setHeight(event.target.value) }}
                            />
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Width:</FormLabel>
                        <NumberInput defaultValue={width}>
                            <NumberInputField size='md' borderColor={'purple'}
                                onChange={(event) => { setWidth(event.target.value) }}
                            />
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Pixel:</FormLabel>
                        <NumberInput defaultValue={pixel}>
                            <NumberInputField size='md' borderColor={'purple'}
                                onChange={(event) => { setPixel(event.target.value) }}
                            />
                        </NumberInput>
                    </FormControl>
                </Flex>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Upload Image:</FormLabel>
                        <Input
                            type="file"
                            onChange={(event) => handleChange(event)}
                            accept="image/*"
                            id='input-tileset'
                        />
                    </FormControl>
                </Stack>
            </ModalBody>
            <Divider borderColor={'purple'} />
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleCreate} minW={425}>
                    Upload
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}

export default UploadTilesetModal;