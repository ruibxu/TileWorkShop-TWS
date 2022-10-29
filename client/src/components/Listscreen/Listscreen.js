import React, { useContext, useEffect, useHistory } from 'react'
import MainNavbar from '../Navbars/MainNavbar';
import { Container } from '@chakra-ui/react';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const Listscreen = () => {
    let history = useHistory();
	const redirect = async(route) => {
		history.push(route, {reload: true});
	}

    return (
        <div>
            <MainNavbar/>
            Listscreen
        </div>)
}

export default Listscreen;