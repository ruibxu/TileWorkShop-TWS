import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
export const GlobalShopStoreContext = createContext({});

export const GlobalShopStoreActionType = {
    ADD_SHOPPER: "ADD_SHOPPER",
    CLEAR_SHOPPER: "CLEAR_SHOPPER"
}

const GlobalShopStoreContextProvider = (props) => {
    const [shopStore, setShopStore] = useState({
        _id: '',
        name: 'No Tilemap Selected',
        exist: false,
    });
    const history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    const { auth } = useContext(AuthContext);
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalShopStoreActionType.ADD_SHOPPER:{
                return setShopStore({
                    ...shopStore,
                    _id: payload._id,
                    name: payload.name,
                    exist: true
                })
            }
            case GlobalShopStoreActionType.CLEAR_SHOPPER:{
                return setShopStore({
                    ...shopStore,
                    _id: '',
                    name: 'No Tilemap Selected',
                    exist: false
                })
            }
        }
    }
    shopStore.addShopper = (id, name) => {
        console.log('adding ', name, id)
        if(!id || !name){
            console.log('add failed')
            return;
        }
        storeReducer({
            type: GlobalShopStoreActionType.ADD_SHOPPER,
            payload: {
                _id: id,
                name: name
            }
        })
    }

    shopStore.clearShopper = () => {
        storeReducer({type: GlobalShopStoreActionType.CLEAR_SHOPPER})
    }

    return (
        <GlobalShopStoreContext.Provider value={{
            shopStore
        }}>
            {props.children}
        </GlobalShopStoreContext.Provider>
    )
}

export default GlobalShopStoreContext;
export { GlobalShopStoreContextProvider };