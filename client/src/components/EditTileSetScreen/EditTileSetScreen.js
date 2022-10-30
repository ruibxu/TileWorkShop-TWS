import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import EditNavbar from '../Navbars/EditNavbar';
import { Container } from '@chakra-ui/react';
import { Tldraw } from '@tldraw/tldraw'
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

    return (
        <div>
            <EditNavbar redirect={redirect}/>
            <div id="tldraw">
                <Tldraw />
            </div>
        </div>)
}

export default EditTileSetScreen;