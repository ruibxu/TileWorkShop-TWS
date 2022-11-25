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

import ShareModal from '../Modals/Share-Modal/Share-Modal';
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
            <Flex  bg='lightgrey' height={'100%'} overflow={'auto'}>
                <Box width={'100%'} height='100%' className='tilesetWorkspace'>
                    <TilesetWorkspace canvasRef={canvasRef} contextRef={contextRef}/>
                </Box>
            </Flex>
            {/* <div id="tldraw">
                <Tldraw />
            </div> */}
            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                list={TempInfo} isPublic={isPublic} setPublic={setPublic}
            />
        </div>)
}

export default EditTileSetScreen;