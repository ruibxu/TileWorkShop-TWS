import React, { useState, useContext, useEffect } from 'react'
import {
  Box,
  Flex,
  HStack,
  Image,
  IconButton,

} from '@chakra-ui/react';
import { AiOutlineFileAdd } from "react-icons/ai"
import { RiDeleteBinLine } from "react-icons/ri"

const TilesetToolbar = (props) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);


    /*onFileChange = event => {
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    };*/

    /*const handleUpload= () => {
      if (!file) {
        return;
      }
  


    };*/

    return (
        <Box px={4} className="navbar" left={0}>
        <HStack h={12} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={5} fontSize = '22px'>
                Tilesets
                <IconButton bg='transparent' title="Add New Tileset"icon={<AiOutlineFileAdd className='md-icon'/>} />
                <IconButton bg='transparent' title="Delete Tileset" icon={<RiDeleteBinLine className='md-icon'/>}/>
            </Flex>
        </HStack>
      </Box>)
}

export default TilesetToolbar;