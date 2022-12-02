import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
import { ACCESS_TYPE, SORT_TYPE, SORT_ORDER, PROJECT_TYPE, SEARCH_TYPE, SHARE_ROLE } from "../translator-client/sort-options"
import Canvas_Transaction from "../transactions/Canvas_Transaction"
import jsTPS from "../common/jsTPS"
import { ImCrop } from "react-icons/im"
import { createAccessList } from "./sharedFunctions"

export const GlobalEditTilesetStoreContext = createContext({});


export const GlobalEditStoreActionType = {
    GET_TILESET_BY_ID: "GET_TILSET_BY_ID",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    UPDATE_NAME: "UPDATE_NAME",
    SET_REFS: "SET_REFS"
}

const tps = new jsTPS();

const GlobalEditTilesetStoreContextProvider = (props) => {
    const [editTilesetStore, setEditTilesetStore] = useState({
        currentId: null,
        currentItem: null,
        name: '',
        width: 10,
        height: 10,
        pixel: 16,
        img: null,
        access: null,
        accessList: [],
        accessUsers: [],
        editing: true,
        canvas: null,
        context: null
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
                    access: payload.access,
                    accessList: payload.accessList,
                    accessUsers: payload.accessUsers,
                    width: payload.width,
                    height: payload.height,
                    pixel: payload.pixel,
                    img: payload.img,
                    name: payload.name,
                    type: PROJECT_TYPE.TILESET,
                    canvas: null,
                    context: null
                })
            }
            case GlobalEditStoreActionType.UPDATE_NAME:{
                return setEditTilesetStore({
                    ...editTilesetStore,
                    name: payload.name,
                    currentItem: payload.currentItem
                })
            }
            case GlobalEditStoreActionType.SET_REFS: {
                return setEditTilesetStore({
                    ...editTilesetStore,
                    canvas: payload.canvas,
                    context: payload.context
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
        const users = response.data.users
        result.community = null
        if (response.status === 200) {
            const responseImage = await api.getTileSetImage(id)
            const tilesetImage = responseImage.data.resources[0]
            console.log(tilesetImage)
            const image = (tilesetImage)?tilesetImage.url:null
            const access = result.access
            const accessList = createAccessList(access, users)
            storeReducer({
                type: GlobalEditStoreActionType.GET_TILESET_BY_ID,
                payload: {
                    currentId: result._id,
                    currentItem: result,
                    access: result.access,
                    accessList: accessList,
                    width: result.width,
                    height: result.height,
                    pixel: result.pixel,
                    name: result.name,
                    img: image,
                }
            })
            console.log(editTilesetStore.currentItem)
        } else {
            console.log(response.data.errorMessage)
        }
    }

    editTilesetStore.setRefs = (canvas, context) => {
        storeReducer({
            type: GlobalEditStoreActionType.SET_REFS,
            payload: {
                canvas: canvas,
                context: context
            }
        })
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