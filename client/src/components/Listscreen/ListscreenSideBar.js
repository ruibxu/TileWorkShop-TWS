import React, { useContext, useEffect, useState } from 'react'
import { Flex, Box, Container, Text, Radio, RadioGroup, Stack, Divider } from '@chakra-ui/react';
import { SORT_TYPE, SORT_ORDER, SEARCH_TYPE, ACCESS_TYPE, PROJECT_TYPE} from '../../translator-client/sort-options';


const ListscreenSideBar = (props) => {
    const [projectType, setProjectType] = useState(PROJECT_TYPE.TILEMAP)
    const [type, setType] = useState(SORT_TYPE.RECENT)
    const [order, setOrder] = useState(`{SORT_ORDER.DESCENDING}`)
    const [access, setAccess] = useState((props.default) ? props.default : `${ACCESS_TYPE.VIEWABLE}`)

    return (
        <Box w='250px' minW='250px' className={'left-sidebar'}>
            <Box paddingTop={2}>
                <Box paddingBottom={4}>
                    <Box paddingBottom={4}>
                        <Text className={'title-font'}>Project Type:</Text>
                    </Box>
                    <RadioGroup onChange={setProjectType} value={projectType} color={'red'} paddingBottom={4} paddingLeft={4}>
                        <Stack direction='column' gap={1}>
                            <Radio value={PROJECT_TYPE.TILEMAP} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>TileMap</Text>
                            </Radio>
                            <Radio value={PROJECT_TYPE.TILESET} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>TileSet</Text>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    <Divider borderColor='gray' />
                    <Box paddingBottom={4}>
                        <Text className={'title-font'}>Sort by:</Text>
                    </Box>
                    <RadioGroup onChange={setType} value={type} color={'red'} paddingBottom={4} paddingLeft={4}>
                        <Stack direction='column' gap={1}>
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
                    <Divider borderColor='gray' />
                </Box>
                <Box>
                    <Box paddingBottom={4}>
                        <Text className={'title-font'}>Sort Order:</Text>
                    </Box>
                    <RadioGroup onChange={setOrder} value={order} color={'red'} paddingBottom={4} paddingLeft={4}>
                        <Stack direction='column' gap={1}>
                            <Radio value={`{SORT_ORDER.ASCENDING}`} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Ascending</Text>
                            </Radio>
                            <Radio value={`{SORT_ORDER.DESCENDING}`} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Descending</Text>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    <Divider borderColor='gray' />
                    <Box paddingBottom={4}>
                        <Text className={'title-font'}>Access:</Text>
                    </Box>
                    <RadioGroup onChange={setAccess} value={access} color={'red'} paddingBottom={4} paddingLeft={4}>
                        <Stack direction='column' gap={1}>
                            <Radio value={`${ACCESS_TYPE.OWNER}`} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Owned</Text>
                            </Radio>
                            <Radio value={`${ACCESS_TYPE.EDITABLE}`} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Editable</Text>
                            </Radio>
                            <Radio value={`${ACCESS_TYPE.FAVORITE}`} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Favorite</Text>
                            </Radio>
                            <Radio value={`${ACCESS_TYPE.VIEWABLE}`} size='lg' colorScheme='blue' borderColor={'purple'}>
                                <Text className={'radio-font'}>Viewable</Text>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
            </Box>
        </Box>
    )
}

export default ListscreenSideBar;