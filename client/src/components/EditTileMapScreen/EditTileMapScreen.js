import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/react';
import EditNavbar from '../Navbars/EditNavbar';
import MapToolbar from './MapToolbar';
import MapWorkspace from './MapWorkspace';
import { SimpleGrid, Box, Grid, GridItem } from '@chakra-ui/react'
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';

import ShareModal from '../Modals/Share-Modal/Share-Modal';

const EditTileMapScreen = () => {
    let history = useHistory();
    const redirect = async (route) => {
        history.push(route, { reload: true });
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
            <EditNavbar redirect={redirect} openShareModal={showShareModal.onOpen}/>

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
                h= "100%"
                templateRows='repeat(3, 1fr)'
                templateColumns='repeat(3, 1fr)'
                gap={0.5}
            >
                <GridItem rowSpan={3} colSpan={2} bg='lightgrey'>
                <MapWorkspace redirect={redirect} />
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} bg='lightgrey' />
                <GridItem rowSpan={2} colSpan={1} bg='lightgrey' />
            </Grid>
            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                list={TempInfo}
            />
        </div>)
}

export default EditTileMapScreen;