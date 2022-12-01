import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
import { ACCESS_TYPE, SORT_TYPE, SORT_ORDER, PROJECT_TYPE, SEARCH_TYPE, SHARE_ROLE } from "../translator-client/sort-options"
import Canvas_Transaction from "../transactions/Canvas_Transaction"
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
        pixel: 16,
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

    editTilesetStore.updateName = async (newName) => {
        console.log('updating name')
        const id = editTilesetStore.currentId
        const user_id = auth.user._id
        const payload = {
            user_id: user_id,
            name: newName
        }
        const response = await api.updateTileSet(id, payload)
        console.log(response.data)
        if (response.status == 200){
            const item = response.data.item
            item.community = null
            storeReducer({
                type: GlobalEditStoreActionType.UPDATE_NAME,
                payload: {
                    name: newName,
                    currentItem: item
                }
            })
        }
    }

    editTilesetStore.save = async (image) => {
        console.log('saving')
        const id = editTilesetStore.currentId
        const user_id = auth.user._id
        const payload = {
            user_id: user_id,
        }
        const response = await api.updateTileSet(id, payload)
        console.log(response.data)
        if (response.status == 200){
            const item = response.data.item
            item.community = null
            const imageResponse = await api.updateTileSetImage(id, {data: image})
            if(imageResponse == 200){
                console.log('Thumbnail update success')
            }
            storeReducer({
                type: GlobalEditStoreActionType.UPDATE_CURRENT_ITEM,
                payload: {
                    currentItem: item
                }
            })
        }
    }

    editTilesetStore.getTileSetById = async function (id) {
        const response = await api.getTileSetById(id);
        const result = response.data.result
        result.community = null
        if (response.status === 200) {
            const responseImage = await api.getTileSetImage(id)
            const tilesetImage = responseImage.data.resources[0]
            console.log(tilesetImage)
            storeReducer({
                type: GlobalEditStoreActionType.GET_TILESET_BY_ID,
                payload: {
                    currentId: result._id,
                    currentItem: result,
                    img: tilesetImage
                }
            })
            console.log(editTilesetStore.currentItem)
        } else {
            console.log(response.data.errorMessage)
        }
    }

    editTilesetStore.addCanvasTransaction = function (redoCallback, undoCallback) {
        let transaction = new Canvas_Transaction(redoCallback, undoCallback);
        tps.addTransaction(transaction);
        console.log(transaction)
    }

    editTilesetStore.undo = function () {
        console.log(editTilesetStore.canUndo())
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