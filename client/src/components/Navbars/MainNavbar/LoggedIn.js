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
const LoggedIn = (props) => {
    return(
        <Flex gap={3} alignItems={'center'} width='240px' className='align-right'>
            <IconButton icon={<MdFavoriteBorder className='md-icon'/>} onClick={()=>props.redirect('/listscreen', {default: ACCESS_TYPE.FAVORITE})} bg='transparent'/>
            <IconButton icon={<MdPersonOutline className='md-icon'/>} onClick={()=>props.redirect('/listscreen', {default: ACCESS_TYPE.OWNER})} bg='transparent'/>
            <IconButton icon={<MdListAlt className='md-icon'/>} onClick={()=>props.redirect('/listscreen')} bg='transparent'/>
        <Menu>
            <MenuButton
            as={Button}
            variant={'link'}
            colorScheme={'black'}>
            <IconButton icon={<MdNotificationsNone className='md-icon'/>} bg='transparent'/>
            </MenuButton>

            <MenuList overflowY={'scroll'} maxH={'300px'}>
                {notifications.map((notification) => (
                    <MenuItem><NewsEntry info={notification}/></MenuItem>
                ))}
            </MenuList>

        </Menu>
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
            <MenuItem onClick={()=>props.redirect('/forgetpassword/test', {changePassword: true})}>Account</MenuItem>
            <MenuDivider />
            <MenuItem onClick={()=>props.openUpdateAccountModal()}>Update</MenuItem>
            <MenuItem onClick={()=>props.handleLogout()}>Logout</MenuItem>
            <MenuDivider />
            <MenuItem onClick={()=>props.redirect('/tileset')}>TileSet</MenuItem>
            <MenuItem onClick={()=>props.redirect('/tilemap')}>TileMap</MenuItem>
        </MenuList>
        </Menu>
        </Flex>
    )
}

export default LoggedIn;