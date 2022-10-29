import React, { useContext, useEffect, useHistory } from 'react'
import EditNavbar from '../Navbars/EditNavbar';
import { Container } from '@chakra-ui/react';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const EditTileMapScreen = () => {
    let history = useHistory();
	const redirect = async(route) => {
		history.push(route, {reload: true});
	}

    return (
        <div>
            <EditNavbar/>
            Edit Map
        </div>)
}

export default EditTileMapScreen;