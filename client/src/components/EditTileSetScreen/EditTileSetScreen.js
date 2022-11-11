import React, { useContext, useEffect, useState} from 'react'
import { useDisclosure } from '@chakra-ui/react';
import { useHistory } from "react-router-dom";
import EditNavbar from '../Navbars/EditNavbar';
import { Container } from '@chakra-ui/react';
import { Tldraw } from '@tldraw/tldraw'
import GlobalStoreContext from '../../store/ProjectStore';

import ShareModal from '../Modals/Share-Modal/Share-Modal';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const EditTileSetScreen = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const [isPublic, setPublic] = useState(store.currentItem.access.public)
    console.log(store.currentItem)

    let history = useHistory();
	const redirect = async (route, parameters) => {
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
        <div>
            <EditNavbar redirect={redirect} openShareModal={showShareModal.onOpen}
                isPublic={isPublic} setPublic={setPublic} name={store.currentItem.name}/>
            <div id="tldraw">
                <Tldraw />
            </div>
            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                list={TempInfo} isPublic={isPublic} setPublic={setPublic}
            />
        </div>)
}

export default EditTileSetScreen;