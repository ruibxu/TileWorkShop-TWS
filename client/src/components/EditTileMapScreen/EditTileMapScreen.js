import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import EditNavbar from '../Navbars/EditNavbar';
import MapToolbar from './MapToolbar';
import { SimpleGrid, Box, Grid, GridItem } from '@chakra-ui/react'
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const EditTileMapScreen = () => {
    let history = useHistory();
    const redirect = async (route) => {
        history.push(route, { reload: true });
    }

    return (
        <div className='overlay'>
            <EditNavbar redirect={redirect} />

            <div className='mapToolbar'><MapToolbar redirect={redirect} /></div>
            {/* <SimpleGrid columns={[2, [1, 2]]} spacing={0.5} height="100%">
                <Box bg='grey'>
                    Edit Map Workspace
                </Box>
                <Box bg='grey'>Layer</Box>
                <Box bg='grey'>Layer</Box>
                <Box bg='grey'>Layer</Box>
            </SimpleGrid>

            <div className='mapLayer'>Layer box</div>
            <div className='mapTileset'>Tileset box</div> */}

            <Grid
                h='200px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)'
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={2} bg='red' />
                <GridItem colSpan={1} bg='grey' />
                <GridItem colSpan={1} bg='grey' />
            </Grid>

        </div>)
}

export default EditTileMapScreen;