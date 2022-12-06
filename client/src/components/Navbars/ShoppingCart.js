import React,{ useContext } from "react";
import {IconButton} from '@chakra-ui/react';
import { PROJECT_TYPE } from "../../translator-client/sort-options";

import { MdShoppingCart, MdAddShoppingCart, MdRemoveShoppingCart } from 'react-icons/md';
import GlobalShopStoreContext from "../../store/ShopStore";

const ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    NONE: "NONE"
}

const ShoppingCart = (props) => {
    const {shopStore} = useContext(GlobalShopStoreContext)
    const {mr, type, _id, name} = props

    const buttonType = (type == PROJECT_TYPE.TILEMAP)?(_id == shopStore._id)?ACTION_TYPE.REMOVE:ACTION_TYPE.ADD:ACTION_TYPE.NONE

    const handleOnClick = () => {
        console.log(_id, name)
        switch (buttonType){
            case ACTION_TYPE.ADD:{
                shopStore.addShopper(_id, name)
                break;
            }
            case ACTION_TYPE.REMOVE:{
                shopStore.clearShopper()
                break;
            }
        }
    }

    return <IconButton icon={
        (buttonType == ACTION_TYPE.ADD)?<MdAddShoppingCart className='md-icon'/>:
        (buttonType == ACTION_TYPE.REMOVE)?<MdRemoveShoppingCart className='md-icon'/>:
        <MdShoppingCart className='md-icon'/>
    } 
    mr={(mr)?mr:0} bg='transparent' title={shopStore.name} isDisabled={(buttonType == ACTION_TYPE.NONE)?!shopStore.exist:false}
        onClick={handleOnClick}
    />
}

export default ShoppingCart;