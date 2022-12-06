import React, { useState, useContext, useEffect } from 'react'
import GlobalStoreContext from '../../store/ProjectStore'
import GlobalEditStoreContext from '../../store/EditStore'
import GlobalEditTilesetStoreContext from '../../store/EditTilesetStore'
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
    Spacer,
    Box,
    IconButton,
} from '@chakra-ui/react'
import { MdFolderOpen } from 'react-icons/md'
import importTM from '../../import-export/importTM'
import importTS from '../../import-export/importTS'

const CreateModal = (props) => {
    const [createType, setCreateType] = useState('TileSet')
    const { store } = useContext(GlobalStoreContext)
    const { auth } = useContext(AuthContext)
    const { editStore } = useContext(GlobalEditStoreContext);
    const { editTilesetStore } = useContext(GlobalEditTilesetStoreContext);
    const [name, setName] = useState('Untitled')
    const [height, setHeight] = useState(16)
    const [width, setWidth] = useState(16)
    const [pixel, setPixel] = useState(16)
    const [file,setFile] = useState();

    const handleCreate = () => {
        //import
        if(file && createType == "TileMap"){
            importTM(auth,store,editStore,file,name,height,width)
        }
        else if(file && createType == "TileSet"){
            importTS(auth,store,editTilesetStore, file,name,height,width,pixel)
        }//-Insert Create Backend call here
        else if (createType == "TileMap") {
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
                    pixel: pixel
                }
            })
            //props.redirect(`/tileset/${store.currentTileSet._id}`)
        }
        //--------------------------------
        props.onClose()
        setFile();
        setName('Untitled')
        setHeight(16)
        setWidth(16)
    }


	const handleChange = (event) => {
		setFile(event.target.files[0]);
		console.log(event.target.files[0])
	};




    return (<Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent maxW='500px'>
            <ModalHeader>{`Create ${createType}:`}</ModalHeader>
            <ModalCloseButton onClick={() =>setFile()}/>
            <Divider borderColor={'purple'} />
            <ModalBody>
                <RadioGroup onChange={setCreateType} value={createType}>
                    <Stack direction='row' gap={3}>
                        <Radio value='TileSet' size='lg'>TileSet</Radio>
                        <Radio value='TileMap' size='lg'>TileMap</Radio>
                        <Box>
                        <IconButton bg='transparent' icon={<MdFolderOpen className='md-icon' />} onClick={() => document.querySelector('#input-edit').click()} />
                        {(createType=='TileSet')?
                        <Input

                            type="file"
                            onChange={handleChange}
                            style = {{display:"none"}}
                            accept="image/png"
                            id='input-edit'
                        />:
                        <Input
                            type="file"
                            onChange={handleChange}
                            style = {{display:"none"}}
                            accept="application/zip"
                            id='input-edit'
                        />}
                        </Box>
                        <Box>
                            {(file)?
                            file.name:""}
                        </Box>
                        
                    </Stack>
                </RadioGroup>
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
                    {(createType == "TileSet")?<FormControl>
                        <FormLabel>Pixel:</FormLabel>
                        <NumberInput defaultValue={pixel}>
                            <NumberInputField size='md' borderColor={'purple'}
                                onChange={(event) => { setPixel(event.target.value) }}
                            />
                        </NumberInput>
                    </FormControl>:<></>}
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