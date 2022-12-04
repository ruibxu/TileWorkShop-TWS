import React, { useContext, useEffect, useState, useRef } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/react';
import EditNavbar from '../Navbars/EditNavbar';

import { Box, Flex, Grid, GridItem} from '@chakra-ui/react'
import GlobalStoreContext from '../../store/ProjectStore';
import GlobalEditStoreContext from '../../store/EditStore';
import AuthContext from '../../auth';

import ShareModal from '../Modals/Share-Modal/Share-Modal';
import MapLayer from './LayerRelated/MapLayer';
import MapTileset from './TileSetRelated/MapTileset';
import MapToolbar from './MapRelated/MapToolbar';
import MapWorkspace from './MapRelated/MapWorkspace';
import Property from './PropertyRelated/Property';
import TilesetDrawer from './TilesetDrawer/TilesetDrawer';
import ResizeMapModal from '../Modals/ResizeMap-Modal';

import exportTM from '../../import-export/exportTM';
import { TOOLS } from '../../translator-client/edit-options';


const EditTileMapScreen = (props) => {
    const { auth } = useContext(AuthContext)
    const { store } = useContext(GlobalStoreContext);
    const { editStore } = useContext(GlobalEditStoreContext);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const sourceRef = useRef(null);
    const scrollRef = useRef(null);
    const [currentLayer, setCurrentLayer] = useState(0)
    const [selection, setSelection] = useState([1, 0, 'None'])
    const [currentTileSetId, setCurrentTileSetId] = useState('None')
    const [exporting, setExporting] = useState(false)
    const [currentButton, setCurrentButton] = useState("Drag");
    const [zoomValue, setZoomValue] = useState(1)
    let history = useHistory();
    const redirect = async (route, parameters) => {
        editStore.clearTransactions()
        editStore.clearItem()
        history.push(route, parameters);
    }
    if (!auth.loggedIn) { redirect('/homescreen') }

    let { id } = useParams();
    useEffect(() => {
        //------------------------------------REMEMBER TO UNCOMMENT WHEN TESTING IS DONE
        editStore.getTileMapById(id)
        // setCurrentTileSetId(editStore.tilesets[0]?editStore.tilesets[0]._id:'None')
        // setCurrentLayer(editStore.layers[0]?editStore.layers[0].id:0)
        //------------------------------------REMEMBER TO UNCOMMENT WHEN TESTING IS DONE
    }, [editStore.currentId])

    const [tilemap, setTilemap] = useState(editStore.currentItem)

    useEffect(() => {
        setTilemap(editStore.currentItem)
    }, [editStore.currentItem])

    const [isPublic, setPublic] = useState((editStore.access) ? editStore.access.public : false)
    
    useEffect(()=>{
        if(editStore.access){
            setPublic(editStore.access.public)
        }
    }, [editStore.access])
    let parts = []

    //exporting
    useEffect(() => {
        if(exporting){
            exportTM(editStore)
            setExporting(false)
        }
    }, [exporting])

    const saveProject = () => {
        const imageData = canvasRef.current.toDataURL()
        editStore.save(imageData)
    }

    const handleSetSelection = (value) => {
        setSelection(value)
        const nonDrawTools = [TOOLS.ERASER, TOOLS.MOVE]
        if(nonDrawTools.includes(currentButton) && editStore.editing == true){setCurrentButton(TOOLS.STAMP_BRUSH)}
    }
    
    //what ft

    const showShareModal = useDisclosure()
    const showResizeMapModal = useDisclosure()
    const showTilesetDrawer = useDisclosure()
    
    const tsRef = useRef()
    
    return (
        <div  className='tilemap' height='100%' width={'100%'}>
            <Flex height='100%' width={'100%'} flexDirection= 'column'>

                <EditNavbar height='6%' width='100%' redirect={redirect} openShareModal={showShareModal.onOpen} 
                            isPublic={isPublic} setPublic={setPublic} projectName={(tilemap) ? tilemap.name : 'loading...'}
                            exporting={exporting} setExporting={setExporting}
                            currentStore={editStore} save={saveProject}
                />

                <Box  className='mapToolbar' height='6%' width='100%'> 
                    <MapToolbar redirect={redirect} 
                        openResizeMapModal={showResizeMapModal.onOpen} 
                        currentButton={currentButton} setCurrentButton={setCurrentButton}
                        zoomValue={zoomValue}  setZoomValue={setZoomValue}
                        />
                </Box>

                <Box height='88%' width='100%'>
                    <Flex color='Black' height='100%' width='100%' overflow={'auto'}>
                        <Box bg='lightgrey' height='100%' width='20%' className='mapTileset'>
                            <MapTileset height={"100%"} redirect={redirect} parts={parts}
                                setSelection={handleSetSelection} sourceRef={sourceRef}
                                currentTileSetId={currentTileSetId} selection={selection}
                                tsRef={tsRef} openDrawer={showTilesetDrawer.onOpen}
                            />
                        </Box>
                        <Box bg='lightgrey' height='100%' width='60%' className='mapWorkspace' >
                            <MapWorkspace height='100%' width='100%' redirect={redirect} parts={parts}
                                canvasRef={canvasRef} contextRef={contextRef}
                                sourceRef={sourceRef} selectRef={contextRef}
                                currentLayer={currentLayer} setCurrentLayer={setCurrentLayer}
                                selection={selection} setSelection={setSelection}
                                currentTileSetId={currentTileSetId}
                                currentButton={currentButton} setCurrentButton={setCurrentButton}
                                zoomValue={zoomValue} scrollRef={scrollRef}
                            />
                        </Box>
                        <Box flex='1' height='100%'>
                            <Box bg='lightgrey' height='30%' className='mapLayer' >
                                <MapLayer redirect={redirect} currentLayer={currentLayer} setCurrentLayer={setCurrentLayer} />
                            </Box>
                            <Box bg='lightgrey' height='70%' className='mapLayer'>
                                <Property height='100%' redirect={redirect} currentLayer={currentLayer} setCurrentLayer={setCurrentLayer}   />
                            </Box>
                        </Box>
                    </Flex>
                </Box>

            </Flex>


            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                isPublic={isPublic} setPublic={setPublic} currentStore={editStore}
            />
            <ResizeMapModal isOpen={showResizeMapModal.isOpen} onClose={showResizeMapModal.onClose}
            />
            <TilesetDrawer isOpen={showTilesetDrawer.isOpen} tsRef={tsRef} onClose={showTilesetDrawer.onClose}
                currentTileSetId={currentTileSetId} setCurrentTileSetId={setCurrentTileSetId} setSelection={setSelection}
            />

        </div>
        )
}

export default EditTileMapScreen;