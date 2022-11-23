import React, { useState, useContext, useEffect } from 'react'
import GlobalStoreContext from '../../store/ProjectStore'
import GlobalEditStoreContext from '../../store/EditStore'
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

const ResizeMapModal = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext)
    const [height, setHeight] = useState(editStore.height)
    const [width, setWidth] = useState(editStore.width)
    //const [pixel, setPixel] = useState(16)
    
    const handleChange = () => {
        editStore.updateMapSize(height,width)
        props.onClose()
    }
    //console.log(height)

    return (<Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent maxW='500px'>
            <ModalHeader>{`Resize your map`}</ModalHeader>
            <ModalCloseButton />
            <Divider borderColor={'purple'} />
            <ModalBody>
                <Flex gap={5}>
                    <FormControl>
                        <FormLabel>Height(tiles):</FormLabel>
                        <NumberInput defaultValue={height}>
                            <NumberInputField size='md' borderColor={'purple'}
                                onChange={(event) => { setHeight(event.target.value) }}
                            />
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Width(tiles):</FormLabel>
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
                <Button colorScheme='blue' mr={3} onClick={handleChange}minW={425}>
                    Change
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}

export default ResizeMapModal;