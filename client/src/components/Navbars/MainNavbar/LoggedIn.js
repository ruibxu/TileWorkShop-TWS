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
  import NewsEntry from '../../Homescreen/HomescreenNewEntry';
  import { ACCESS_TYPE } from '../../../translator-client/sort-options';

const LoggedIn = (props) => {
    return(
        <Flex gap={3} alignItems={'center'} width='190px' className='align-right'>
            <IconButton icon={<MdFavoriteBorder className='md-icon'/>} onClick={()=>props.redirect('/listscreen', {default: ACCESS_TYPE.FAVORITE})} bg='transparent'/>
            <IconButton icon={<MdPersonOutline className='md-icon'/>} onClick={()=>props.redirect('/listscreen', {default: ACCESS_TYPE.OWNER})} bg='transparent'/>
            <IconButton icon={<MdListAlt className='md-icon'/>} onClick={()=>props.redirect('/listscreen')} bg='transparent'/>
        <Menu>
        <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}>
            <Avatar
            size={'sm'}
            name={props.user.username}
            />
        </MenuButton>
        <MenuList>
            <MenuItem onClick={()=>props.redirect('/forgetpassword/test', {changePassword: true})}>{props.user.username}</MenuItem>
            <MenuDivider />
            <MenuItem onClick={()=>props.openUpdateAccountModal()}>Update</MenuItem>
            <MenuItem onClick={()=>props.handleLogout()}>Logout</MenuItem>
        </MenuList>
        </Menu>
        </Flex>
    )
}

export default LoggedIn;