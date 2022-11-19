import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams} from "react-router-dom";
import { useDisclosure } from '@chakra-ui/react';
import EditNavbar from '../Navbars/EditNavbar';
import MapToolbar from './MapToolbar';
import MapWorkspace from './MapWorkspace';
import { Box, Flex, Menu, MenuButton, MenuList, MenuItem, Button, Spacer} from '@chakra-ui/react'
import GlobalStoreContext from '../../store/ProjectStore';
import GlobalEditStoreContext from '../../store/EditStore';
import AuthContext from '../../auth';

import ShareModal from '../Modals/Share-Modal/Share-Modal';
import MapLayer from './MapLayer';
import LayerToolbar from './LayerToolbar';
import MapTileset from './MapTileset';

import EditButtonGroup from './ButtonGroups/EditButtonGroup';
import ExtraButtonGroup from './ButtonGroups/ZoomGroup';

const EditTileMapScreen = (props) => {
    const { auth } = useContext(AuthContext)
    const { store } = useContext(GlobalStoreContext);
    const { editStore } = useContext(GlobalEditStoreContext);
    let history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    //if(!auth.loggedIn){redirect('/homescreen')}
    //let { id } = useParams();
    const [tilemap, setTilemap] = useState({access:{}})
    const [isPublic, setPublic] = useState((tilemap)?tilemap.access.public:false)


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
            <EditNavbar redirect={redirect} openShareModal={showShareModal.onOpen} 
                isPublic={isPublic} setPublic={setPublic} name={(tilemap)?tilemap.name:'empty'}
            />
            <Box height={'100%'} bg='grey'>
            <Flex>
                <Menu>
                    <MenuButton as={Button} size='sm' borderColor={'purple'} variant='outline'>
                        File
                    </MenuButton>
                    <MenuList>
                        <MenuItem value={'1'} onClick={(e)=>console.log(e.target.value)}>Name</MenuItem>
                        <MenuItem value={'2'} onClick={(e)=>console.log(e.target.value)}>Creator</MenuItem>
                    </MenuList>
                </Menu>
                <Spacer/>
                <EditButtonGroup/>
                <Spacer/>
                <ExtraButtonGroup/>
                <Spacer/>
                <Button>Ok</Button>
            </Flex>
            <Flex bg='red' height={'100%'}>
                
            </Flex>
            </Box>
            
            

            <ShareModal isOpen={showShareModal.isOpen} onClose={showShareModal.onClose}
                list={TempInfo} isPublic={isPublic} setPublic={setPublic}
            />
        </div>)
}

export default EditTileMapScreen;