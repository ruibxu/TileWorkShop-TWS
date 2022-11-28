import React, { useContext, useEffect, useState, useRef} from 'react'
import { useDisclosure } from '@chakra-ui/react';
import { useHistory } from "react-router-dom";
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

//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const EditTileSetScreen = (props) => {
    const { auth } = useContext(AuthContext)
    const { store } = useContext(GlobalStoreContext);
    const { editTilesetStore } = useContext(GlobalEditTilesetStoreContext);
    const [isPublic, setPublic] = useState(store.currentItem.access.public)

    const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
    const [zoomValue, setZoomValue] = useState(1)





    if(!auth.loggedIn){redirect('/homescreen')}
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    let history = useHistory();
	const redirect = async (route, parameters) => {
        editTilesetStore.clearTransactions();
        history.push(route, parameters);
    }

    const showShareModal = useDisclosure()
    let TempInfo = [
        {username: 'Yibo', email: 'yibo.hu@stonybrook.edu', access: 'Owner', color:'red'},
        {username: 'NotYibo', email: 'Notyibo@stonybrook.edu', access: 'Editor', color:'blue'},
        {username: 'YiboLover', email: 'yiboLover@stonybrook.edu', access: 'Editor', color:'yellow'},
        {username: 'YiboHater', email: 'yiboHater.hu@stonybrook.edu', access: 'Viewer', color:'green'},
        {username: 'WhoseYibo', email: 'WhoseYibo.hu@stonybrook.edu', access: 'Viewer', color:'purple'},
        {username: 'YiboClone', email: 'YiboClone.hu@stonybrook.edu', access: 'Viewer', color:'orange'}
    ]

    return (
        <div className='tilemap'>
            <EditNavbar redirect={redirect} openShareModal={showShareModal.onOpen}
                isPublic={isPublic} setPublic={setPublic} name={store.currentItem.name}/>

            <Grid
                h='100%'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(6, 1fr)'
            >   
                <GridItem rowSpan={1} colSpan={1} width={'100%'} height='100%' className='tilesetTools'>
                    <TilesetTools zoomValue= {zoomValue} setZoomValue={setZoomValue} />
                </GridItem>

                <GridItem colSpan={5} rowSpan={2}width={'100%'} height={'100%'} className='tilesetWorkspace'>
                    <TilesetWorkspace canvasRef={canvasRef} contextRef={contextRef} color={color} zoomValue={zoomValue} />
                </GridItem>

                <GridItem  rowSpan={1} colSpan={1} width={'100%'} height='100%' className='tilesetTools'>
                    <TilesetColorPicker color={color} setColor={setColor}/>
                </GridItem>


            </Grid>
            {/* <div id="tldraw">
                <Tldraw />
            </div> */}
            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                list={TempInfo} isPublic={isPublic} setPublic={setPublic}
            />
        </div>)





}

export default EditTileSetScreen;