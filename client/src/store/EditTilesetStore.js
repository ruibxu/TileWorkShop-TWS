import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
import { ACCESS_TYPE, SORT_TYPE, SORT_ORDER, PROJECT_TYPE, SEARCH_TYPE, SHARE_ROLE } from "../translator-client/sort-options"
import LayerState_Transaction from "../transactions/LayerState_Transaction"
import jsTPS from "../common/jsTPS"
import { ImCrop } from "react-icons/im"
export const GlobalEditTilesetStoreContext = createContext({});


export const GlobalEditStoreActionType = {
    GET_TILESET_BY_ID: "GET_TILSET_BY_ID",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    UPDATE_DISPLAY: "UPDATE_DISPLAY"
}

const tps = new jsTPS();

const createImage = (src) => {
    let img = new Image()
    img.src = src
    img.crossOrigin = "anonymous"
    return img
}

const GlobalEditTilesetStoreContextProvider = (props) => {
    const [editTilesetStore, setEditTilesetStore] = useState({
        currentId: null,
        currentItem: null,
        width: 10,
        height: 10,
        scale: 64,
        img: null,
        access: null,
        editing: true,
    });
    const { auth } = useContext(AuthContext);
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalEditStoreActionType.GET_TILESET_BY_ID: {
                return setEditTilesetStore({
                    ...editTilesetStore,
                    currentId: payload.currentId,
                    currentItem: payload.currentItem,
                    access: payload.currentItem.access,
                    type: PROJECT_TYPE.TILESET
                })
            }

        }
    }

    editTilesetStore.getTileSetById = async function (id) {
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
            console.log(editTilesetStore.currentItem)
        } else {
            console.log(response.data.errorMessage)
        }
    }

    editTilesetStore.addLayerStateTransaction = function (newState, redoCallback, undoCallback) {
        let undoFunc = (undoCallback)?undoCallback:false
        let redoFunc = (redoCallback)?redoCallback:false
        let transaction = new LayerState_Transaction(editTilesetStore, editTilesetStore.layers, newState, redoFunc, undoFunc);
        tps.addTransaction(transaction);
        console.log(transaction)
    }

    editTilesetStore.undo = function () {
        tps.undoTransaction();
    }

    editTilesetStore.redo = function () {
        tps.doTransaction();
    }

    editTilesetStore.canUndo = function () {
        return tps.hasTransactionToUndo();
    }

    editTilesetStore.canRedo = function () {
        return tps.hasTransactionToRedo();
    }

    editTilesetStore.clearTransactions = () => {
        tps.clearAllTransactions();
    }

    return (
        <GlobalEditTilesetStoreContext.Provider value={{
            editTilesetStore
        }}>
            {props.children}
        </GlobalEditTilesetStoreContext.Provider>
    )
}

export default GlobalEditTilesetStoreContext;
export { GlobalEditTilesetStoreContextProvider };