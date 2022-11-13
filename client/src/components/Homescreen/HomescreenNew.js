import React, { useContext, useEffect } from 'react'
import { Flex, Container, Box, Divider} from '@chakra-ui/react';
import ItemCardSmall from '../ItemCards/ItemCardSmall';
import NewsEntry from './HomescreenNewEntry';
import GlobalStoreContext from '../../store/ProjectStore';
//import { GlobalStoreContext } from '../store'
//import ListCard from './ListCard.js'
//import { Fab, Typography } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
//import List from '@mui/material/List';
const HomescreenNew = (props) => {
    const { store } = useContext(GlobalStoreContext);
    //const notifications = (props.list)?props.list:[];
    let notifications = [
        {username: 'Yibo', action: 'created', projectName: 'Super Mario Bros 1', content: 'Super Mario Bros 1',notificationTime:'12:59 pm'},
        {username: 'NotYibo', action: 'commented', projectName: 'Super Mario Bros 2', content: "\"nice work\"",notificationTime:'9/22/2022'},
        {username: 'YiboLover', action: 'commented', projectName: 'Super Mario Bros 3', content: "\"nice work\"", notificationTime:'8/22/2022'},
        {username: 'YiboHater', action: 'created', projectName: 'Super Mario Bros 4', content: 'Super Mario Bros 4',notificationTime:'8/20/2022'},
        {username: 'WhoseYibo', action: 'created', projectName: 'Super Mario Bros 5', content: 'Super Mario Bros 5',notificationTime:'8/19/2022'},
        {username: 'WhoseYibo', action: 'created', projectName: 'Super Mario Bros 5', content: 'Super Mario Bros 5',notificationTime:'8/19/2022'},
        {username: 'WhoseYibo', action: 'created', projectName: 'Super Mario Bros 5', content: 'Super Mario Bros 5',notificationTime:'8/19/2022'},
        {username: 'YiboClone', action: 'created', projectName: 'Super Mario Bros 6', content: 'Super Mario Bros 6',notificationTime:'7/1/2022'}
    ]

    console.log(store.whatsList)
    return (
        <Container minW={'21%'} >
            <Box borderWidth='2px' borderRadius='xl' overflow='hidden' borderColor={'purple'}  height={'100%'}>
                <Box className={'title-font'}>
                    What's New:
                </Box>
                <Divider />
                <Box overflowY={'scroll'} maxH={'1100px'} height={'1100px'}> 
                    {store.whatsList.map((x) => (
                        <NewsEntry info={x}/>
                    ))}
                </Box>
            </Box>
        </Container>
        )
}

export default HomescreenNew;