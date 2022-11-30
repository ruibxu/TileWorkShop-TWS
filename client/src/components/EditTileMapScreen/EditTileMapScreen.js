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
    const [exporting, setExporting] = useState(false)
    const [currentButton, setCurrentButton] = useState("Stamp Brush");
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
        //------------------------------------REMEMBER TO UNCOMMENT WHEN TESTING IS DONE
    }, [editStore.currentId])

    const [tilemap, setTilemap] = useState(editStore.currentItem)

    useEffect(() => {
        setTilemap(editStore.currentItem)
    }, [editStore.currentItem])

    const [isPublic, setPublic] = useState((tilemap) ? tilemap.access.public : false)
    let parts = []
    console.log('reload EditTileMapScreen')

    //exporting
    useEffect(() => {
        if(exporting){
            console.log('exporting tilemap')
            const fileName = editStore.name;
            const json = JSON.stringify(editStore, null, 2);
            const blob = new Blob([json], { type: "application/json" });
            const href = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = href;
            link.download = fileName + ".json";
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
            
            setExporting(false)
        }
    }, [exporting])

    const getDataUrl = () => {
        console.log(canvasRef.current)
        return canvasRef.current.toDataURL()
    }
    
    //what ft

    const showShareModal = useDisclosure()
    const showResizeMapModal = useDisclosure()
    const showTilesetDrawer = useDisclosure()
    
    const tsRef = useRef()

    let TempInfo = [
        { username: 'Yibo', email: 'yibo.hu@stonybrook.edu', access: 'Owner', color: 'red' },
        { username: 'NotYibo', email: 'Notyibo@stonybrook.edu', access: 'Editor', color: 'blue' },
        { username: 'YiboLover', email: 'yiboLover@stonybrook.edu', access: 'Editor', color: 'yellow' },
        { username: 'YiboHater', email: 'yiboHater.hu@stonybrook.edu', access: 'Viewer', color: 'green' },
        { username: 'WhoseYibo', email: 'WhoseYibo.hu@stonybrook.edu', access: 'Viewer', color: 'purple' },
        { username: 'YiboClone', email: 'YiboClone.hu@stonybrook.edu', access: 'Viewer', color: 'orange' }
    ]
    
    return (
        <div  className='tilemap' height='100%' width={'100%'}>
            <Flex height='100%' width={'100%'} flexDirection= 'column'>

                <EditNavbar height='6%' width='100%' redirect={redirect} openShareModal={showShareModal.onOpen} 
                            isPublic={isPublic} setPublic={setPublic} projectName={(tilemap) ? tilemap.name : 'loading...'}
                            exporting={exporting} setExporting={setExporting}
                            currentStore={editStore} getDataUrl={getDataUrl}
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
                                setSelection={setSelection} sourceRef={sourceRef}
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
                                zoomValue={zoomValue}
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
                list={TempInfo} isPublic={isPublic} setPublic={setPublic} currentStore={editStore}
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