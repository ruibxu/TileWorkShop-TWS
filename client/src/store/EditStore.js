import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
import { ACCESS_TYPE, SORT_TYPE, SORT_ORDER, PROJECT_TYPE, SEARCH_TYPE, SHARE_ROLE } from "../translator-client/sort-options"
export const GlobalEditStoreContext = createContext({});

export const GlobalEditStoreActionType = {
    GET_TILEMAP_BY_ID: "GET_TILEMAP_BY_ID",
    GET_TILESET_BY_ID: "GET_TILSET_BY_ID",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME"

}

const GlobalEditStoreContextProvider = (props) => {
    const [editStore, setEditStore] = useState({
        currentId: null,
        currentItem: null,
    });
    const history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    const { auth } = useContext(AuthContext);
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalEditStoreActionType.GET_TILEMAP_BY_ID: {
                return setEditStore({
                    currentId: payload._id,
                    currentItem: payload.currentItem,
                })
            }
            case GlobalEditStoreActionType.GET_TILESET_BY_ID: {
                return setEditStore({
                    currentId: payload._id,
                    currentItem: payload.currentItem,
                })
            }
        }
    }

    editStore.getTileMapById = async function (id) {
        const response = await api.getTileMapById(id);
        result = response.data.result
        result.community = null
        if (response.status === 200) {
            storeReducer({
                type: GlobalEditStoreActionType.GET_TILEMAP_BY_ID,
                payload: {
                    currentId: result.id,
                    currentItem: result
                }
            })
        } else {
            console.log(response.data.errorMessage)
        }
    }

    editStore.getTilesetById = async function (id) {
        const response = await api.getTileSetById(id);
        result = response.data.result
        result.community = null
        if (response.status === 200) {
            storeReducer({
                type: GlobalEditStoreActionType.GET_TILESET_BY_ID,
                payload: {
                    currentId: result.id,
                    currentItem: result
                }
            })
        } else {
            console.log(response.data.errorMessage)
        }
    }
    return (
        <GlobalEditStoreContext.Provider value={{
            editStore
        }}>
            {props.children}
        </GlobalEditStoreContext.Provider>
    )
}

export default GlobalEditStoreContext;
export { GlobalEditStoreContextProvider };