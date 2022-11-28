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

const UploadTilesetModal = (props) => {
    const { store } = useContext(GlobalStoreContext)
    const { auth } = useContext(AuthContext)
    const [name, setName] = useState('Untitled')
    const [height, setHeight] = useState(16)
    const [width, setWidth] = useState(16)
    const [pixel, setPixel] = useState(16)

    const handleCreate = () => {
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