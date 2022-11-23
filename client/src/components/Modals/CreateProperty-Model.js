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
    Select,
    NumberInput,
    NumberInputField,
    Spacer
} from '@chakra-ui/react'

const CreatePropertyModal = (props) => {
    const { editStore } = useContext(GlobalEditStoreContext)
    const layer = editStore.layers.find(layer=>layer.id==props.currentLayer)
    const properties = (layer)?layer.properties?layer.properties:[]:[]
    const [type, setType] = useState("")
    const [name, setName] = useState("")

      
    const handleCreate = () => {
        console.log(type)
        console.log(name)
        let flag=0
        // problem
        for (const property in properties){
            console.log(property    )
            if (name===property.name){
                flag=1
            }
        }
        if (flag==1){
            props.onClose()
        }
        else{
            const layersClone = JSON.parse(JSON.stringify(editStore.layers))
            const layer = layersClone.find(x => x.id == props.currentLayer)

            if(type=='boolean'){
                layer.properties.push({name: name, type:'boolean', value:'true'})
            }
            else if(type=='int'){
                layer.properties.push({name: name, type:'int', value:'0'})
            }
            else if(type=='float'){
                layer.properties.push({name: name, type:'float', value:'0.0'})
            }
            else{
                layer.properties.push({name: name, type:'string', value:''})
            }
            
            const currentName = props.currentProperty
            const redoCallback = (()=>props.setCurrentProperty(props.setCurrentProperty(name)))
            const undoCallback =(()=>props.setCurrentProperty(currentName))
            props.setCurrentProperty(name)
            editStore.addLayerStateTransaction(layersClone, redoCallback, undoCallback)

            props.onClose()
            
        } 
    }
    

    
    return (<Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent maxW='500px'>
            <ModalHeader>{`Create New Property`}</ModalHeader>
            <ModalCloseButton />
            <Divider borderColor={'purple'} />
            <ModalBody>
                <Flex gap={5}>
                    <FormControl>
                        <FormLabel>Property Name:</FormLabel>
                        <NumberInput defaultValue={'Property Name'}>
                            <NumberInputField size='md' borderColor={'purple'}
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Type:</FormLabel>

                        <Select placeholder='choose property type' onChange={(event) => setType(event.target.value)} 
                        size='md' borderColor={'purple'}
                        >
                            <option value='int'>int</option>
                            <option value='float'>float</option>
                            <option value='boolean'>boolean</option>
                            <option value='string'>string</option>
                        </Select>

                    </FormControl>
                </Flex>
            </ModalBody>
            <Divider borderColor={'purple'} />
            <ModalFooter>
                <Button colorScheme='blue' mr={3} disabled={name=='Property Name' ||name==''|| type==''} onClick={handleCreate} minW={425}>
                    Create
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}

export default CreatePropertyModal;