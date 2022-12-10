import React, { useContext, useEffect, useState, useRef} from 'react'
import { useDisclosure } from '@chakra-ui/react';
import { useHistory, useParams} from "react-router-dom";
import EditNavbar from '../Navbars/EditNavbar';
import { Container, Box, Flex } from '@chakra-ui/react';
import { Tldraw } from '@tldraw/tldraw'
import GlobalStoreContext from '../../store/ProjectStore';
import GlobalEditStoreContext from '../../store/EditStore';
import GlobalEditTilesetStoreContext from '../../store/EditTilesetStore';
import AuthContext from '../../auth';
import TilesetWorkspace from './TileSetCanvasRelated/TileSetWorkspace';
import { Grid, GridItem } from '@chakra-ui/react'

import ShareModal from '../Modals/Share-Modal/Share-Modal';
import TilesetTools from './TileSetToolsRelated/TileSetTools';
import TilesetColorPicker from './TileSetToolsRelated/TileSetColorPicker';
import exportTS from '../../import-export/exportTS';
import { TOOLSFORTILESET } from '../../translator-client/edit-options';

//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const EditTileSetScreen = (props) => {
    const { auth } = useContext(AuthContext)
    const { store } = useContext(GlobalStoreContext);
    
    const { editTilesetStore } = useContext(GlobalEditTilesetStoreContext);

    const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
    const [zoomValue, setZoomValue] = useState(1)
    const [toolWidth, setToolWidth] = useState(3)
    const [currentButton, setCurrentButton] = useState("Drag");

    const [exporting, setExporting]= useState(false);
    const colorPickerRef = useRef(null)
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const scrollRef = useRef(null)

    // setInterval
    const INITIAL_TIMER = 300;
    const TARGET_TIMER = 0;
    const timer = useRef(INITIAL_TIMER);
    const interval = useRef();

    const deleteRequest = () => {
        editTilesetStore.deleteRequest({
            expire: 600,
            data: {
                request_type: "EDIT_PROJECT",
                user_id: auth.user._id,
                related_id: editTilesetStore.currentId
            }
        })
        clearInterval(interval.current);
    }

    useEffect(() => {
        function handleTimer() {
            interval.current = setInterval(() => {
            console.log('Counting down! This will run every second!');
            timer.current = (timer.current -1);
            console.log(timer.current);
            if (timer.current <= TARGET_TIMER) {
                console.log("clear setInterval in " + INITIAL_TIMER + " seconds");
                // stop editing
                deleteRequest()
            }
          }, 1000);
        }
        if (timer.current === INITIAL_TIMER) {
          handleTimer();
        }
        return () => {clearInterval(interval.current);}
      }, [timer.current]);
    ////

    let { id } = useParams();
    useEffect(() => {
        //------------------------------------REMEMBER TO UNCOMMENT WHEN TESTING IS DONE
        editTilesetStore.getTileSetById(id)
        //------------------------------------REMEMBER TO UNCOMMENT WHEN TESTING IS DONE
    }, [editTilesetStore.currentId])


    
    useEffect(() => {
        tileset = editTilesetStore.currentItem
    }, [editTilesetStore.currentItem])

    let tileset = editTilesetStore.currentItem
    const [isPublic, setPublic] = useState((tileset) ? tileset.access.public : false)

    //exporting
    useEffect(() => {
        if(exporting){
            exportTS(editTilesetStore,canvasRef)
            setExporting(false)
        }
    }, [exporting])

    const handleSetCurrentButton = (newButton) => {
        setCurrentButton((editTilesetStore.editing)?newButton:TOOLSFORTILESET.MOVE)
    }

    const handleSetColor = (rgba) => {
        setColor({...rgba})
        const nonDrawTools = [TOOLSFORTILESET.MOVE, TOOLSFORTILESET.COLOR_PICKER, TOOLSFORTILESET.ERASER]
        if(nonDrawTools.includes(currentButton) && editTilesetStore.editing){
            handleSetCurrentButton(TOOLSFORTILESET.DRAW)
        }
    }

//////////////////////////////////////////////////////////////////

    const onbeforeunload = () => {
        console.log('before unload')
        deleteRequest()
    }
    window.onbeforeunload = onbeforeunload

    let history = useHistory();
	const redirect = async (route, parameters) => {
        onbeforeunload()
        editTilesetStore.clearTransactions();
        editTilesetStore.clearItem();
        history.push(route, parameters);
    }
    if(!auth.loggedIn){redirect('/homescreen')}

    

    window.onbeforeunload = () => {
        //if(editTilesetStore.editing){
            editTilesetStore.deleteRequest({
                expire: 600,
                data: {
                    request_type: "EDIT_PROJECT",
                    user_id: auth.user._id,
                    related_id: editTilesetStore.currentId
                }
            })
            clearInterval(interval.current);
        //}
    }

    const showShareModal = useDisclosure()

    const toDataURL = () => {
        return canvasRef.current.toDataURL()
    }

    const saveProject = () => {
        const imageData = toDataURL()
        editTilesetStore.save(imageData)
    }

    return (
        <div className='tilemap'>
            <EditNavbar redirect={redirect} openShareModal={showShareModal.onOpen}
                isPublic={isPublic} setPublic={setPublic} projectName={(tileset) ? tileset.name : 'loading...'}
                exporting={exporting} setExporting={setExporting} toDataURL={toDataURL}
                currentStore={editTilesetStore} save={saveProject} isEditing={editTilesetStore.editing}
                />

            <Grid
                h='93.5%'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(6, 1fr)'
            >   
                <GridItem rowSpan={1} colSpan={1} width={'100%'} height='100%' className='tilesetTools'>
                    <TilesetTools zoomValue= {zoomValue} setZoomValue={setZoomValue} currentButton={currentButton} 
                    setCurrentButton={handleSetCurrentButton}  toolWidth={toolWidth} setToolWidth={setToolWidth}
                    isEditing={editTilesetStore.editing}
                    />
                </GridItem>

                <GridItem colSpan={5} rowSpan={2} minWidth={'100%'} maxWidth={'100%'} height={'100%'} className='tilesetWorkspace'>
                    <TilesetWorkspace canvasRef={canvasRef} contextRef={contextRef} scrollRef={scrollRef}
                    color={color} setColor={setColor} zoomValue={zoomValue}
                    currentButton={currentButton} setCurrentButton={handleSetCurrentButton}
                    toolWidth={toolWidth} setToolWidth={setToolWidth}/>
                </GridItem>

                <GridItem  rowSpan={1} colSpan={1} width={'100%'} height='100%' className='tilesetTools'>
                    <TilesetColorPicker color={color} setColor={handleSetColor} colorPickerRef={colorPickerRef}
                    isEditing={editTilesetStore.editing}
                    />
                </GridItem>


            </Grid>
            {/* <div id="tldraw">
                <Tldraw />
            </div> */}
            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                isPublic={isPublic} setPublic={setPublic} currentStore={editTilesetStore}
            />
        </div>)





}

export default EditTileSetScreen;