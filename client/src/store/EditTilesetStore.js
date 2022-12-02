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


export const GlobalEditTilesetStoreActionType = {
    GET_TILESET_BY_ID: "GET_TILSET_BY_ID",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    UPDATE_NAME: "UPDATE_NAME",
    SET_REFS: "SET_REFS",
    UPDATE_ACCESS: "UPDATE_ACCESS",
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
            case GlobalEditTilesetStoreActionType.GET_TILESET_BY_ID: {
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
            case GlobalEditTilesetStoreActionType.UPDATE_NAME:{
                return setEditTilesetStore({
                    ...editTilesetStore,
                    name: payload.name,
                    currentItem: payload.currentItem
                })
            }
            case GlobalEditTilesetStoreActionType.SET_REFS: {
                return setEditTilesetStore({
                    ...editTilesetStore,
                    canvas: payload.canvas,
                    context: payload.context
                })
            }
            case GlobalEditTilesetStoreActionType.UPDATE_ACCESS: {
                return setEditTilesetStore({
                    ...editTilesetStore,
                    access: payload.access,
                    accessList: (payload.accessList)?payload.accessList:editTilesetStore.accessList,
                    accessUsers: (payload.accessUsers)?payload.accessUsers:editTilesetStore.accessUsers
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
                type: GlobalEditTilesetStoreActionType.UPDATE_NAME,
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
                type: GlobalEditTilesetStoreActionType.UPDATE_CURRENT_ITEM,
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
                type: GlobalEditTilesetStoreActionType.GET_TILESET_BY_ID,
                payload: {
                    currentId: result._id,
                    currentItem: result,
                    access: result.access,
                    accessList: accessList,
                    accessUsers: users,
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

    editTilesetStore.addAccess = async (email, new_role) => {
        const userResponse = await api.searchUserByEmail({email: email})
        console.log(userResponse)
        if(!userResponse.data.success) {console.log('no user found'); return false}
        console.log('User Found')
        const newUser = userResponse.data.user
        const oldList = editTilesetStore.accessUsers
        const newUserList = [...(oldList.filter(x => x._id != newUser._id)), newUser]
        console.log(newUser)
        const payload = {
            user_id: auth.user._id,
            new_user_id: newUser._id,
            new_role: new_role
        }
        console.log('reached?')
        const response = await api.updateTileSetAccess(editTilesetStore.currentId, payload)
        console.log(response)
        if(response.status == 200){
            const { access } = response.data
            const newAccessList = createAccessList(access, newUserList)
            console.log(access)
            await storeReducer({
                type: GlobalEditTilesetStoreActionType.UPDATE_ACCESS,
                payload: {
                    access: access,
                    accessList: newAccessList,
                    accessUsers: newUserList
                }
            })
        }
        return false
    }

    editTilesetStore.updateAccess = async (new_user_id, old_role, new_role) => {
        const user_id = auth.user._id
        console.log('update Access running')
        const payload = {
            user_id: user_id,
            new_user_id: new_user_id,
            old_role: old_role,
            new_role: new_role,
        }
        const response = await api.updateTileSetAccess(editTilesetStore.currentId, payload)
        if(response.status == 200){
            console.log('success')
            const { access } = response.data
            const newAccessList = createAccessList(access, editTilesetStore.accessUsers)
            storeReducer({
                type: GlobalEditTilesetStoreActionType.UPDATE_ACCESS,
                payload: {
                    access: access,
                    accessList: newAccessList,
                }
            })
        }
    }

    editTilesetStore.updatePublic = async () => {
        console.log('updating public')
        const payload = {user_id: auth.user._id, updatePublic: true}
        const response = await api.updateTileSetAccess(editTilesetStore.currentId, payload)
        if(response.status == 200){
            const { access } = response.data
            storeReducer({
                type: GlobalEditTilesetStoreActionType.UPDATE_ACCESS,
                payload: {
                    access: access
                }
            })
        }
    }

    editTilesetStore.setRefs = (canvas, context) => {
        storeReducer({
            type: GlobalEditTilesetStoreActionType.SET_REFS,
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