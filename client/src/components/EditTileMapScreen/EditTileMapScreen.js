import React, { useContext, useEffect, useState, useRef } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/react';
import EditNavbar from '../Navbars/EditNavbar';

import { Box, Flex } from '@chakra-ui/react'
import GlobalStoreContext from '../../store/ProjectStore';
import GlobalEditStoreContext from '../../store/EditStore';
import AuthContext from '../../auth';

import ShareModal from '../Modals/Share-Modal/Share-Modal';
import MapLayer from './LayerRelated/MapLayer';
import MapTileset from './TileSetRelated/MapTileset';
import MapToolbar from './MapRelated/MapToolbar';
import MapWorkspace from './MapRelated/MapWorkspace';

const EditTileMapScreen = (props) => {
    const { auth } = useContext(AuthContext)
    const { store } = useContext(GlobalStoreContext);
    const { editStore } = useContext(GlobalEditStoreContext);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const sourceRef = useRef(null);
    const selectRef = useRef(null);
    const [currentLayer, setCurrentLayer] = useState(0)
    const [selection, setSelection] = useState([1, 0, 'test'])
    const [currentTileSetId, setCurrentTileSetId] = useState('test')
    const [currentButton, setCurrentButton] = useState("test");
    let history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    if (!auth.loggedIn) { redirect('/homescreen') }

    let { id } = useParams();
    useEffect(() => {
        editStore.getTileMapById(id)
    }, [editStore.currentId])

    const [tilemap, setTilemap] = useState(editStore.currentItem)

    useEffect(() => {
        setTilemap(editStore.currentItem)
    }, [editStore.currentItem])
    
    const [isPublic, setPublic] = useState((tilemap) ? tilemap.access.public : false)
    let parts = []

    //what ft

    const showShareModal = useDisclosure()
    let TempInfo = [
        { username: 'Yibo', email: 'yibo.hu@stonybrook.edu', access: 'Owner', color: 'red' },
        { username: 'NotYibo', email: 'Notyibo@stonybrook.edu', access: 'Editor', color: 'blue' },
        { username: 'YiboLover', email: 'yiboLover@stonybrook.edu', access: 'Editor', color: 'yellow' },
        { username: 'YiboHater', email: 'yiboHater.hu@stonybrook.edu', access: 'Viewer', color: 'green' },
        { username: 'WhoseYibo', email: 'WhoseYibo.hu@stonybrook.edu', access: 'Viewer', color: 'purple' },
        { username: 'YiboClone', email: 'YiboClone.hu@stonybrook.edu', access: 'Viewer', color: 'orange' }
    ]
    console.log(currentLayer)

    return (
        <div className='tilemap'>
            <EditNavbar redirect={redirect} openShareModal={showShareModal.onOpen}
                isPublic={isPublic} setPublic={setPublic} name={(tilemap) ? tilemap.name : 'empty'}
            />

            <div className='mapToolbar'><MapToolbar redirect={redirect} currentButton={props.currentButton} setCurrentButton={setCurrentButton}/></div>

            <Flex color='Black' height={'100%'} overflow={'auto'}>
                <Box bg='lightgrey' height='100%' width='30%' className='mapTileset'>
                    <MapTileset height={"100%"} redirect={redirect} parts={parts}
                        setSelection={setSelection} sourceRef={sourceRef}
                        currentTileSetId={currentTileSetId}
                    />
                </Box>
                <Box flex='1' bg='lightgrey' >
                    <MapWorkspace redirect={redirect} parts={parts}
                        canvasRef={canvasRef} contextRef={contextRef}
                        sourceRef={sourceRef} selectRef={contextRef}
                        currentLayer={currentLayer} setCurrentLayer={setCurrentLayer}
                        selection={selection} setSelection={setSelection}
                        currentTileSetId={currentTileSetId}
                    />
                </Box>
                <Box width='15%'>
                    <Box bg='lightgrey' height='100%' className='mapLayer'>
                        <MapLayer redirect={redirect} currentLayer={currentLayer} setCurrentLayer={setCurrentLayer} />
                    </Box>
                </Box>
            </Flex>


            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                list={TempInfo} isPublic={isPublic} setPublic={setPublic}
            />
        </div>)
}

export default EditTileMapScreen;