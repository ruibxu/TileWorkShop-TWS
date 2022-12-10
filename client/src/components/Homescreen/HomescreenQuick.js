import React, { useContext, useEffect } from 'react'
import { Flex, Container, Box, Divider, SimpleGrid} from '@chakra-ui/react';
import ItemCardSmall from '../ItemCards/ItemCardSmall';
import AuthContext from '../../auth';

const HomescreenQuick = (props) => {
    const { auth } = useContext(AuthContext);
    const {data, display} = props

    return (
        <Container minW={'21%'}>
            <Box borderWidth='2px' borderRadius='xl' borderColor={'purple'} justify-content='space-between' minH='100%' block-size={'fit-content'}className={'popular-box-divider'}>
                <Box className={'title-font'}>
                    {(auth.loggedIn)?'Your Projects:':'Recent Projects:'}
                </Box>
                <Divider />
                <SimpleGrid minW={'100%'} minH={'90%'} maxH={'100%'} className='popular-box-divider' columns={1} spacing={'10%'} paddingTop={'8%'} paddingBottom={'8%'}>
                    <Container><ItemCardSmall size={'100%'} data={display[0]} openItemCard={props.openItemCard} redirect={props.redirect}/></Container>
                    <Container><ItemCardSmall size={'100%'} data={display[1]} openItemCard={props.openItemCard} redirect={props.redirect}/></Container>
                </SimpleGrid>
            </Box>
        </Container>
        )
}

export default HomescreenQuick;