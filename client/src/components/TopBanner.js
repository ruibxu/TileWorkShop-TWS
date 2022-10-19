import React, { useContext, useEffect } from 'react'
import { MdPhone, MdNotifications } from "react-icons/md";
import { IconButton } from '@chakra-ui/react'
import logo from '../logo.png';
import { Image } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

const TopBanner = () => {
    return (
        
        <div id="TWS-top-banner">
            <div id="TWS-top-banner-content">
            
            <IconButton
                aria-label='Call Sage'
                fontSize='80px'
                icon={<MdNotifications />}
            />    
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /> 
            </div> 
        </div>)
}

export default TopBanner;