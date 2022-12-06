import React,{ useContext } from "react";
import {IconButton} from '@chakra-ui/react';
import { PROJECT_TYPE } from "../../translator-client/sort-options";

import { MdShoppingCart, MdAddShoppingCart, MdRemoveShoppingCart } from 'react-icons/md';
import GlobalShopStoreContext from "../../store/ShopStore";
import AuthContext from "../../auth";

const ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    NONE: "NONE"
}

const ShoppingCart = (props) => {
    const {auth} = useContext(AuthContext)
    const {shopStore} = useContext(GlobalShopStoreContext)
    const {mr, type, _id, name} = props

    const buttonType = (type == PROJECT_TYPE.TILEMAP)?(_id == shopStore._id)?ACTION_TYPE.REMOVE:ACTION_TYPE.ADD:ACTION_TYPE.NONE

    const handleOnClick = () => {
        switch (buttonType){
            case ACTION_TYPE.ADD:{
                shopStore.addShopper(_id, name)
                break;
            }
            case ACTION_TYPE.REMOVE:{
                shopStore.clearShopper()
                break;
            }
            case ACTION_TYPE.NONE:{
                console.log(shopStore.recentlyAddedId)
                props.redirect(`/${PROJECT_TYPE.TILEMAP}/${shopStore._id}`)
                break;
            }
        }
    }

    return <IconButton visibility={(!auth.loggedIn) ? 'hidden' : ''} icon={
        (buttonType == ACTION_TYPE.ADD)?<MdAddShoppingCart className='md-icon'/>:
        (buttonType == ACTION_TYPE.REMOVE)?<MdRemoveShoppingCart className='md-icon'/>:
        <MdShoppingCart className='md-icon'/>
    } 
    mr={(mr)?mr:0} bg='transparent' title={shopStore.name} isDisabled={(buttonType == ACTION_TYPE.NONE)?!shopStore.exist:false}
        onClick={handleOnClick}
    />
}

export default ShoppingCart;