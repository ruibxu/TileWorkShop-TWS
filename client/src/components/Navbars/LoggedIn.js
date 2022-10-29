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


const LoggedIn = (props) => {
    return(
        <Flex gap={3} alignItems={'center'} width='240px' className='align-right'>
            <IconButton icon={<MdFavoriteBorder className='md-icon'/>} bg='transparent'/>
            <IconButton icon={<MdPersonOutline className='md-icon'/>} bg='transparent'/>
            <IconButton icon={<MdListAlt className='md-icon'/>} bg='transparent'/>
            <IconButton icon={<MdNotificationsNone className='md-icon'/>} bg='transparent'/>
        <Menu>
        <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}>
            <Avatar
            size={'sm'}
            />
        </MenuButton>
        <MenuList>
            <MenuItem>Account</MenuItem>
            <MenuDivider />
            <MenuItem>Update</MenuItem>
            <MenuItem>Logout</MenuItem>
        </MenuList>
        </Menu>
        </Flex>
    )
}

export default LoggedIn;