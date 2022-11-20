import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
import { ACCESS_TYPE, SORT_TYPE, SORT_ORDER, PROJECT_TYPE, SEARCH_TYPE, SHARE_ROLE } from "../translator-client/sort-options"
import LayerState_Transaction from "../transactions/LayerState_Transaction"
import jsTPS from "../common/jsTPS"
export const GlobalEditStoreContext = createContext({});


export const GlobalEditStoreActionType = {
    GET_TILEMAP_BY_ID: "GET_TILEMAP_BY_ID",
    GET_TILESET_BY_ID: "GET_TILSET_BY_ID",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    UPDATE_LAYER: "UPDATE_LAYER"

}
const tps = new jsTPS();

const createImage = (src) => {
    let img = new Image()
    img.src = src
    img.crossOrigin = "anonymous"
    return img
}

const GlobalEditStoreContextProvider = (props) => {
    const [editStore, setEditStore] = useState({
        currentId: null,
        currentItem: null,
        access: null,
        type: null,
        editing: false,
        layers:
            [{ id: 0, name: 'Layer 1', hidden: false, locked: false, data: {} },
            { id: 1, name: 'Layer 2', hidden: true, locked: false, data: {} },
            { id: 2, name: 'Layer 3', hidden: false, locked: true, data: {} },
            { id: 3, name: 'Layer 4', hidden: true, locked: true, data: {} }],
        tilesets: [{_id:'test', name:'testname', pixel:128, height:8, width:5, 
            image: createImage('https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png')}]
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
                    ...editStore,
                    currentId: payload.currentId,
                    currentItem: payload.currentItem,
                    access: payload.currentItem.access,
                    type: PROJECT_TYPE.TILEMAP
                })
            }
            case GlobalEditStoreActionType.GET_TILESET_BY_ID: {
                return setEditStore({
                    ...editStore,
                    currentId: payload.currentId,
                    currentItem: payload.currentItem,
                    access: payload.currentItem.access,
                    type: PROJECT_TYPE.TILESET
                })
            }
            case GlobalEditStoreActionType.UPDATE_LAYER: {
                return setEditStore({
                    ...editStore,
                    layers: payload.layers
                })
            }

        }
    }
    editStore.getTileMapById = async function (id) {
        const response = await api.getTileMapById(id);
        if (response.status === 200) {
            const result = response.data.result
            result.community = null
            storeReducer({
                type: GlobalEditStoreActionType.GET_TILEMAP_BY_ID,
                payload: {
                    currentId: result._id,
                    currentItem: result
                }
            })
        } else {
            console.log(response.data.errorMessage)
        }
    }

    editStore.getTileSetById = async function (id) {
        const response = await api.getTileSetById(id);
        const result = response.data.result
        result.community = null
        if (response.status === 200) {
            storeReducer({
                type: GlobalEditStoreActionType.GET_TILESET_BY_ID,
                payload: {
                    currentId: result._id,
                    currentItem: result
                }
            })
            console.log(editStore.currentItem)
        } else {
            console.log(response.data.errorMessage)
        }
    }

    editStore.changeLayer = async function (state) {
        storeReducer({
            type: GlobalEditStoreActionType.UPDATE_LAYER,
            payload: {
                layers: state
            }
        })
    }

    editStore.addLayerStateTransaction = function (newState) {
        let transaction = new LayerState_Transaction(editStore, editStore.layers, newState);
        tps.addTransaction(transaction);
    }

    editStore.undo = function () {
        tps.undoTransaction();
    }

    editStore.redo = function () {
        tps.doTransaction();
    }

    editStore.canUndo = function () {
        return tps.hasTransactionToUndo();
    }

    editStore.canRedo = function () {
        return tps.hasTransactionToRedo();
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