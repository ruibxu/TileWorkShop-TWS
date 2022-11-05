import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/react';
import EditNavbar from '../Navbars/EditNavbar';
import MapToolbar from './MapToolbar';
import MapWorkspace from './MapWorkspace';
import { Box, Flex } from '@chakra-ui/react'
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';

import ShareModal from '../Modals/Share-Modal/Share-Modal';
import MapLayer from './MapLayer';
import LayerToolbar from './LayerToolbar';
import MapTileset from './MapTileset';

const EditTileMapScreen = (props) => {
    let history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }

    const showShareModal = useDisclosure()
    let TempInfo = [
        { username: 'Yibo', email: 'yibo.hu@stonybrook.edu', access: 'Owner', color: 'red' },
        { username: 'NotYibo', email: 'Notyibo@stonybrook.edu', access: 'Editor', color: 'blue' },
        { username: 'YiboLover', email: 'yiboLover@stonybrook.edu', access: 'Editor', color: 'yellow' },
        { username: 'YiboHater', email: 'yiboHater.hu@stonybrook.edu', access: 'Viewer', color: 'green' },
        { username: 'WhoseYibo', email: 'WhoseYibo.hu@stonybrook.edu', access: 'Viewer', color: 'purple' },
        { username: 'YiboClone', email: 'YiboClone.hu@stonybrook.edu', access: 'Viewer', color: 'orange' }
    ]

    return (
        <div className='tilemap'>
            <EditNavbar redirect={redirect} openShareModal={showShareModal.onOpen} />

            <div className='mapToolbar'><MapToolbar redirect={redirect} /></div>

            <Flex color='Black' height={'100%'}>
                <Box flex='1' bg='lightgrey'>
                <MapWorkspace redirect={redirect} />
                </Box>
                <Box width='30%'>
                    <Box bg= 'lightgrey' height='40%' className='mapLayer'>
                    <MapLayer redirect={redirect} />
                    </Box>
                    <Box bg= 'lightgrey' height='60%' className='mapTileset'>
                    <MapTileset redirect={redirect} />
                    </Box>
                </Box>
            </Flex>


            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                list={TempInfo}
            />
        </div>)
}

export default EditTileMapScreen;