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
    const [currentButton, setCurrentButton] = useState("Draw");

    const [exporting, setExporting]= useState(false);
    const colorPickerRef = useRef(null)
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    console.log('This is reloading too')
    const [tileset, setTileset] = useState(editTilesetStore.currentItem)

    // setInterval
    const INITIAL_TIMER = 3;
    const TARGET_TIMER = 0;
    const [timer, setTimer] = useState(INITIAL_TIMER);
    const interval = useRef();
    ////

    let { id } = useParams();
    useEffect(() => {
        //------------------------------------REMEMBER TO UNCOMMENT WHEN TESTING IS DONE
        editTilesetStore.getTileSetById(id)
        //------------------------------------REMEMBER TO UNCOMMENT WHEN TESTING IS DONE
    }, [editTilesetStore.currentId])

    
    useEffect(() => {
        setTileset(editTilesetStore.currentItem)
    }, [editTilesetStore.currentItem])

    const [isPublic, setPublic] = useState((tileset) ? tileset.access.public : false)

    //exporting
    useEffect(() => {
        if(exporting){
            exportTS(editTilesetStore,canvasRef)
            setExporting(false)
        }
    }, [exporting])

    // setInterval
    // useEffect(() => {
    //     var period = 3000
    //     const interval = setInterval(() => {
    //         console.log("setInterval initializes");
    //         console.log('This will run every ' + period/1000 + ' seconds!');
    //     }, period);
    //     console.log("clear setInterval");
    //     return () => clearInterval(interval);
    //   }, []);
    useEffect(() => {
        function handleTimer() {
            interval.current = setInterval(() => {
            console.log('Counting down! This will run every second!');
            setTimer((count) => count - 1);
          }, 1000);
        }
    
        if (timer <= TARGET_TIMER && interval.current) {
            console.log("clear setInterval in " + INITIAL_TIMER + " seconds");
            // stop editing
            clearInterval(interval.current);
        }
        if (timer === INITIAL_TIMER) {
          handleTimer();
        }
      }, [timer]);

//////////////////////////////////////////////////////////////////


    let history = useHistory();
	const redirect = async (route, parameters) => {
        editTilesetStore.clearTransactions();
        editTilesetStore.clearItem();
        history.push(route, parameters);
    }
    if(!auth.loggedIn){redirect('/homescreen')}

    const showShareModal = useDisclosure()
    let TempInfo = [
        {username: 'Yibo', email: 'yibo.hu@stonybrook.edu', access: 'Owner', color:'red'},
        {username: 'NotYibo', email: 'Notyibo@stonybrook.edu', access: 'Editor', color:'blue'},
        {username: 'YiboLover', email: 'yiboLover@stonybrook.edu', access: 'Editor', color:'yellow'},
        {username: 'YiboHater', email: 'yiboHater.hu@stonybrook.edu', access: 'Viewer', color:'green'},
        {username: 'WhoseYibo', email: 'WhoseYibo.hu@stonybrook.edu', access: 'Viewer', color:'purple'},
        {username: 'YiboClone', email: 'YiboClone.hu@stonybrook.edu', access: 'Viewer', color:'orange'}
    ]

    const saveProject = () => {
        const imageData = canvasRef.current.toDataURL()
        editTilesetStore.save(imageData)
    }

    return (
        <div className='tilemap'>
            <EditNavbar redirect={redirect} openShareModal={showShareModal.onOpen}
                isPublic={isPublic} setPublic={setPublic} projectName={(tileset) ? tileset.name : 'loading...'}
                exporting={exporting} setExporting={setExporting}
                currentStore={editTilesetStore} save={saveProject}
                />

            <Grid
                h='93.5%'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(6, 1fr)'
            >   
                <GridItem rowSpan={1} colSpan={1} width={'100%'} height='100%' className='tilesetTools'>
                    <TilesetTools zoomValue= {zoomValue} setZoomValue={setZoomValue} currentButton={currentButton} 
                    setCurrentButton={setCurrentButton}  toolWidth={toolWidth} setToolWidth={setToolWidth}
                    />
                </GridItem>

                <GridItem colSpan={5} rowSpan={2} minWidth={'100%'} maxWidth={'100%'} height={'100%'} className='tilesetWorkspace'>
                    <TilesetWorkspace canvasRef={canvasRef} contextRef={contextRef} color={color} setColor={setColor} 
                    zoomValue={zoomValue} currentButton={currentButton} setCurrentButton={setCurrentButton}
                    toolWidth={toolWidth} setToolWidth={setToolWidth}/>
                </GridItem>

                <GridItem  rowSpan={1} colSpan={1} width={'100%'} height='100%' className='tilesetTools'>
                    <TilesetColorPicker color={color} setColor={setColor} colorPickerRef={colorPickerRef}/>
                </GridItem>


            </Grid>
            {/* <div id="tldraw">
                <Tldraw />
            </div> */}
            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                list={TempInfo} isPublic={isPublic} setPublic={setPublic} currentStore={editTilesetStore}
            />
        </div>)





}

export default EditTileSetScreen;