import React, { useContext, useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/react';
import { useHistory } from "react-router-dom";
import EditNavbar from '../Navbars/EditNavbar';
import { Container } from '@chakra-ui/react';
import { Tldraw } from '@tldraw/tldraw'

import ShareModal from '../Modals/Share-Modal/Share-Modal';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const EditTileSetScreen = () => {
    let history = useHistory();
	const redirect = async(route) => {
		history.push(route, {reload: true});
	}

    let TempInfo = [
        {username: 'Yibo', email: 'yibo.hu@stonybrook.edu', access: 'Owner', color:'red'},
        {username: 'NotYibo', email: 'Notyibo@stonybrook.edu', access: 'Editor', color:'blue'},
        {username: 'YiboLover', email: 'yiboLover@stonybrook.edu', access: 'Editor', color:'yellow'},
        {username: 'YiboHater', email: 'yiboHater.hu@stonybrook.edu', access: 'Viewer', color:'green'},
        {username: 'WhoseYibo', email: 'WhoseYibo.hu@stonybrook.edu', access: 'Viewer', color:'purple'},
        {username: 'YiboClone', email: 'YiboClone.hu@stonybrook.edu', access: 'Viewer', color:'orange'}
    ]

    const showShareModal = useDisclosure()

    return (
        <div>
            <EditNavbar redirect={redirect} openShareModal={showShareModal.onOpen}/>
            <div id="tldraw">
                <Tldraw />
            </div>
            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                list={TempInfo}
            />
        </div>)
}

export default EditTileSetScreen;