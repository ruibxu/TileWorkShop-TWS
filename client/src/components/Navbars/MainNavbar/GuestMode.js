import {
    Flex,
    Spacer,
    Avatar,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
  } from '@chakra-ui/react';
  import { MdListAlt, MdFavoriteBorder, MdNotificationsNone, MdPersonOutline} from "react-icons/md";


const GuestMode = (props) => {
    return(
        <Flex gap={2} alignItems={'center'}>
            <IconButton icon={<MdListAlt className='md-icon'/>} bg='transparent'/>
            <Button variant={'outline'} colorScheme={'purple'} onClick={()=>props.showLoginModal.onOpen()}>Login</Button>
            <Button variant={'solid'} colorScheme={'blue'} onClick={()=>props.showSignUpModal.onOpen()}>Sign Up</Button>
        </Flex>
    )
}

export default GuestMode;