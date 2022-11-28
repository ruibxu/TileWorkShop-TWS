import React, { useContext, useEffect, useRef} from 'react'
import { HStack, IconButton,Flex, Box, Center, Container, Text, SimpleGrid} from '@chakra-ui/react';
import { HiOutlinePencil } from "react-icons/hi";

const TilesetTools = (props) => {
    /*<Flex alignItems={'center'} gap={5} fontSize = '22px'>


    </Flex>*/
    return (
        <Box px={4} >
            <SimpleGrid columns={4} spacing={1}>
                    <Box className='toolsfortileset' >
                        <IconButton bg='transparent' title="Draw"icon={<HiOutlinePencil className='md-icon'/>}
                            //onClick={}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Draw"icon={<HiOutlinePencil className='md-icon'/>}
                            //onClick={}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Draw"icon={<HiOutlinePencil className='md-icon'/>}
                            //onClick={}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Draw"icon={<HiOutlinePencil className='md-icon'/>}
                            //onClick={}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Draw"icon={<HiOutlinePencil className='md-icon'/>}
                            //onClick={}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Draw"icon={<HiOutlinePencil className='md-icon'/>}
                            //onClick={}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Draw"icon={<HiOutlinePencil className='md-icon'/>}
                            //onClick={}
                        />
                    </Box>
                    <Box className='toolsfortileset'>
                        <IconButton bg='transparent' title="Draw"icon={<HiOutlinePencil className='md-icon'/>}
                            //onClick={}
                        />
                    </Box>
            </SimpleGrid>
        </Box>)
                            
}

export default TilesetTools;