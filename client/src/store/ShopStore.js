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
        recentlyAdded: []
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
                    exist: true,
                    recentlyAdded: []
                })
            }
            case GlobalShopStoreActionType.CLEAR_SHOPPER:{
                return setShopStore({
                    ...shopStore,
                    _id: '',
                    name: 'No Tilemap Selected',
                    exist: false,
                    recentlyAdded: []
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

    shopStore.addTileset = async (tileset) => {
        const id = shopStore._id
        const user_id = (auth.loggedIn)?auth.user._id:null
        const url = tileset.src
        console.log(tileset)
        if(!user_id){console.log('not logged in'); return;}
        if(!url){console.log('No Image');  return;}
        const newTileset = {
            name: tileset.name,
            height: tileset.height,
            width: tileset.width,
            pixel: tileset.pixel,
        }
        const payload1 = {user_id: user_id, tileset: newTileset}
        const response = await api.addTileSetToTileMap(id, payload1)
        if (response.status === 200) {
            const tileset_id = response.data.tileset_id
            const response2 = await api.updateTileMapImage(tileset_id, { map_id: id, data: url })
            if (response2.status === 200) {
                console.log(response)
            }
        }
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