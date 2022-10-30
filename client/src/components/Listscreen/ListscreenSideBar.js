import React, { useContext, useEffect, useState} from 'react'
import { Flex, Box, Container, Text, Radio, RadioGroup, Stack, Divider} from '@chakra-ui/react';
import { SORT_TYPE, SORT_ORDER, SEARCH_TYPE } from '../../translator-client/sort-options'


const ListscreenSideBar = (props) => {
    const [type, setType] = useState(SORT_TYPE.RECENT)
    const [order, setOrder] = useState(SORT_ORDER.DESCENDING)

    return (
        <Box w='250px' minW='250px' className={'left-sidebar'}>
            <Box paddingLeft={4} paddingTop={2}>
                <Box paddingBottom={4}>
                    <Box paddingBottom={4}>
                        <Text className={'title-font'}>Sort by:</Text>
                    </Box>
                    <RadioGroup onChange={setType} value={type}  color={'red'} paddingBottom={4}>
                        <Stack direction='column' gap={2}>
                            <Radio value={SORT_TYPE.NAME} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Aphlabetical Order</Text>
                            </Radio>
                            <Radio value={SORT_TYPE.VIEW} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Most Viewed</Text>
                            </Radio>
                            <Radio value={SORT_TYPE.LIKE} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Most Liked</Text>
                            </Radio>
                            <Radio value={SORT_TYPE.RECENT} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Most Recent</Text>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    <Divider borderColor='gray'/>
                </Box>
                <Box>
                    <Box paddingBottom={4}>
                        <Text className={'title-font'}>Sort Order:</Text>
                    </Box>
                    <RadioGroup onChange={setType} value={type}  color={'red'} paddingBottom={4}>
                        <Stack direction='column' gap={2}>
                            <Radio value={SORT_ORDER.DESCENDING} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Descending</Text>
                            </Radio>
                            <Radio value={SORT_ORDER.ASCENDING} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Ascending</Text>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    <Divider borderColor='gray'/>
                </Box>
            </Box>
        </Box>
        )
}

export default ListscreenSideBar;