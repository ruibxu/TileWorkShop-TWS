import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDisclosure } from "@chakra-ui/react"
import AuthContext from "../auth"
import api, { updateTileMapAccess } from '../api'
import { ACCESS_TYPE, SORT_TYPE, SORT_ORDER, PROJECT_TYPE, SEARCH_TYPE, SHARE_ROLE } from "../translator-client/sort-options"
import LayerState_Transaction from "../transactions/LayerState_Transaction"
import jsTPS from "../common/jsTPS"
import { ImCrop } from "react-icons/im"
import { createAccessList, getAccessLevel } from "./sharedFunctions"
import DeniedAlert from "../components/Modals/Denied-Alert"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from '@chakra-ui/react'

export const GlobalEditStoreContext = createContext({});

export const GlobalEditStoreActionType = {
    GET_TILEMAP_BY_ID: "GET_TILEMAP_BY_ID",
    GET_TILESET_BY_ID: "GET_TILSET_BY_ID",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    UPDATE_LAYER: "UPDATE_LAYER",
    UPDATE_DISPLAY: "UPDATE_DISPLAY",
    UPDATE_TILESETS: "UPDATE_TILESETS",
    UPDATE_NAME: "UPDATE_NAME",
    UPDATE_CURRENT_ITEM: "UPDATE_CURRENT_ITEM",
    CLEAR_ITEM: "CLEAR_ITEM",
    UPDATE_ACCESS: "UPDATE_ACCESS",
    MARK_TILESET_FOR_DELETION: "MARK_TILESET_FOR_DELETION",
    UNMARK_TILESET_FOR_DELETION: "UNMARK_TILESET_FOR_DELETION",
    DELETE_TILESET: "DELETE_TILESET",
    TOGGLE_EDIT: "TOGGLE_EDIT",
    UPDATE_EDIT_REQUEST: "UPDATE_EDIT_REQUEST"

}
const tps = new jsTPS();

const createImage = (src) => {
    let img = new Image()
    img.src = src
    img.crossOrigin = "anonymous"
    return img
}

const GlobalEditStoreContextProvider = (props) => {
    const [open, setOpen] = useState(false)

    const [editStore, setEditStore] = useState({
        saved: false,
        name: '',
        currentId: null,
        currentItem: null,
        width: 10,
        height: 10,
        access: null,
        accessList: [],
        accessUsers: [],
        accessLevel: -1,
        type: null,
        editing: true,
        editingRequest: null,
        tilesetMarkedForDeletion: null,
        layers:
            [{
                id: 0, name: 'Layer 1', hidden: false, locked: false, data: {},
                properties: [
                    { name: 'bowlean', type: 'boolean', value: 'true' },
                    { name: 'something', type: 'string', value: 'print' },
                    { name: 'number', type: 'int', value: '5' }
                ]
            },
            {
                id: 1, name: 'Layer 2', hidden: true, locked: false, data: {},
                properties: [
                    { name: 'bowlean', type: 'boolean', value: 'false' },
                    { name: 'something', type: 'string', value: 'layer2' },
                ]
            },
            { id: 2, name: 'Layer 3', hidden: false, locked: true, data: {} },
            { id: 3, name: 'Layer 4', hidden: true, locked: true, data: {} }],
        tilesets: [{
            _id: 'test', name: 'testname', pixel: 128, height: 8, width: 5,
            image: createImage('https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png')
        },
        {
            _id: 'test2', name: 'pokemon', pixel: 16, height: 8, width: 16,
            image: createImage('https://res.cloudinary.com/dktmkohjw/image/upload/v1668971390/TileSet_Editor/tileset2_aqxdjx.png')
        }
        ]
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
                    accessList: payload.accessList,
                    accessUsers: payload.accessUsers,
                    accessLevel: payload.accessLevel,
                    type: PROJECT_TYPE.TILEMAP,
                    width: payload.width,
                    height: payload.height,
                    layers: payload.layers,
                    tilesets: payload.tilesets,
                    name: payload.name,
                    editing: false,
                    editId: '',
                    tilesetMarkedForDeletion: null
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
            case GlobalEditStoreActionType.UPDATE_DISPLAY: {
                return setEditStore({
                    ...editStore,
                    height: (payload.height) ? payload.height : editStore.height,
                    width: (payload.width) ? payload.width : editStore.width,
                    // zoomValue: (payload.zoomValue)?payload.zoomValue:editStore.zoomValue,
                    // MapTileOverlay: payload.MapTileOverlay?payload.MapTileOverlay:editStore.MapTileOverlay
                })
            }
            case GlobalEditStoreActionType.UPDATE_TILESETS: {
                return setEditStore({
                    ...editStore,
                    layers: (payload.layers) ? payload.layers : editStore.layers,
                    tilesets: payload.tilesets
                })
            }
            case GlobalEditStoreActionType.UPDATE_NAME: {
                return setEditStore({
                    ...editStore,
                    name: payload.name,
                    currentItem: payload.currentItem
                })
            }
            case GlobalEditStoreActionType.UPDATE_CURRENT_ITEM: {
                return setEditStore({
                    ...editStore,
                    currentItem: payload.currentItem
                })
            }
            case GlobalEditStoreActionType.CLEAR_ITEM: {
                return setEditStore({
                    ...editStore,
                    currentId: null,
                    currentItem: null,
                    access: null,
                    accessList: [],
                    accessUsers: [],
                    type: PROJECT_TYPE.TILEMAP,
                    width: -1,
                    height: -1,
                    layers: [],
                    tilesets: [],
                    name: 'item cleared',
                    editing: false,
                    editId: '',
                    accessLevel: -1
                })
            }
            case GlobalEditStoreActionType.UPDATE_ACCESS: {
                return setEditStore({
                    ...editStore,
                    access: payload.access,
                    accessList: (payload.accessList) ? payload.accessList : editStore.accessList,
                    accessUsers: (payload.accessUsers) ? payload.accessUsers : editStore.accessUsers
                })
            }
            case GlobalEditStoreActionType.MARK_TILESET_FOR_DELETION: {
                return setEditStore({
                    ...editStore,
                    tilesetMarkedForDeletion: payload.tilesetMarkedForDeletion
                })
            }
            case GlobalEditStoreActionType.UNMARK_TILESET_FOR_DELETION: {
                return setEditStore({
                    ...editStore,
                    tilesetMarkedForDeletion: null
                })
            }
            case GlobalEditStoreActionType.DELETE_TILESET: {
                return setEditStore({
                    ...editStore,
                    tilesetMarkedForDeletion: null,
                    tilesets: payload.tilesets
                })
            }
            case GlobalEditStoreActionType.TOGGLE_EDIT: {
                return setEditStore({
                    ...editStore,
                    editing: payload.editing,
                })
            }
            case GlobalEditStoreActionType.UPDATE_EDIT_REQUEST: {
                return setEditStore({
                    ...editStore,
                    editingRequest: payload.editingRequest,
                    editing: payload.editing

                })
            }
        }
    }

    editStore.toggleEditMode = (mode) => {
        console.log("called")
        storeReducer({
            type: GlobalEditStoreActionType.TOGGLE_EDIT,
            payload: { editing: mode }
        })
    }

    editStore.updateTilesetName = async (setid, newName) => {
        const id = editStore.currentId
        const payload = {
            user_id: auth.user._id,
            tileset_id: setid,
            name: newName
        }
        console.log('This is fine')
        const response = await api.updateTileSetinTileMap(id, payload);
        console.log('This is not fine')
        if (response.status == 200) {
            const result = response.data.result
            const newTilesets = result.tileset
            console.log(result)
            storeReducer({
                type: GlobalEditStoreActionType.UPDATE_TILESETS,
                payload: {
                    tilesets: newTilesets
                }
            })
        }
    }

    editStore.clearItem = () => {
        storeReducer({ type: GlobalEditStoreActionType.CLEAR_ITEM })
    }

    editStore.updateName = async (newName) => {
        console.log('updating name')
        const id = editStore.currentId
        const user_id = auth.user._id
        const payload = {
            user_id: user_id,
            name: newName
        }
        const response = await api.updateTileMap(id, payload)
        console.log(response.data)
        if (response.status == 200) {
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

    editStore.save = async (image) => {
        console.log('saving')
        const id = editStore.currentId
        const user_id = auth.user._id
        const { width, height, layers } = editStore
        const payload = {
            user_id: user_id,
            width: width,
            height: height,
            layers: layers
        }
        const response = await api.updateTileMap(id, payload)
        console.log(response.data)
        if (response.status == 200) {
            const item = response.data.item
            item.community = null
            const imageResponse = await api.updateTileMapThumbnail(id, { data: image })
            if (imageResponse.status == 200) {
                await api.updateTileMap(id, { user_id: user_id, url: imageResponse.data.resources.secure_url })
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

    editStore.addNewTileset = async function (payload, image) {
        console.log('payload', payload)
        const { name, pixel, height, width } = payload.tileset
        console.log(editStore.currentId)
        const response = await api.addTileSetToTileMap(editStore.currentId, payload);
        if (response.status === 200) {
            const tileset_id = response.data.tileset_id
            const response2 = await api.updateTileMapImage(tileset_id, { map_id: editStore.currentId, data: image })
            if (response2.status === 200) {
                const newTileset = {
                    _id: tileset_id, name: name, pixel: pixel, height: height, width: width,
                    image: createImage(response2.data.resources.url)
                }
                storeReducer({
                    type: GlobalEditStoreActionType.UPDATE_TILESETS,
                    payload: {
                        tilesets: [...editStore.tilesets, newTileset]
                    }
                })
            }
        }
    }
    editStore.getTileMapById = async function (id) {
        const response = await api.getTileMapById(id);
        if (response.status === 200) {
            const result = response.data.result
            const users = response.data.users
            console.log(response.data)
            result.community = null
            const access = result.access
            const accessList = createAccessList(access, users)
            const accessLevel = getAccessLevel(access, auth.user._id)
            console.log(accessLevel)
            let tilesets = result.tileset
            if (tilesets.length > 0) {
                const response2 = await api.getTileMapAllImage(id)
                if (response2.status == 200) {
                    const images = response2.data.resources
                    tilesets.map(x => x.imageFull = images.find(y => y.filename == x._id))
                    tilesets.map(x => x.imageURL = (x.imageFull) ? x.imageFull.url : null)
                    tilesets.map(x => x.image = createImage(x.imageURL))
                }
            }
            storeReducer({
                type: GlobalEditStoreActionType.GET_TILEMAP_BY_ID,
                payload: {
                    currentId: result._id,
                    currentItem: result,
                    access: result.access,
                    accessList: accessList,
                    accessUsers: users,
                    accessLevel: accessLevel,
                    width: result.width,
                    height: result.height,
                    layers: result.layers,
                    tilesets: tilesets,
                    name: result.name
                }
            })
        } else {
            console.log(response.data.errorMessage)
        }
    }

    editStore.addAccess = async (email, new_role) => {
        const userResponse = await api.searchUserByEmail({ email: email })
        console.log(userResponse)
        if (!userResponse.data.success) { console.log('no user found'); return false }
        console.log('User Found')
        const newUser = userResponse.data.user
        const oldList = editStore.accessUsers
        const newUserList = [...(oldList.filter(x => x._id != newUser._id)), newUser]
        console.log(newUser)
        const payload = {
            user_id: auth.user._id,
            new_user_id: newUser._id,
            new_role: new_role
        }
        const response = await api.updateTileMapAccess(editStore.currentId, payload)
        if (response.status == 200) {
            const { access } = response.data
            const newAccessList = createAccessList(access, newUserList)
            await storeReducer({
                type: GlobalEditStoreActionType.UPDATE_ACCESS,
                payload: {
                    access: access,
                    accessList: newAccessList,
                    accessUsers: newUserList
                }
            })
        }
        return false
    }

    editStore.updateAccess = async (new_user_id, old_role, new_role) => {
        const user_id = auth.user._id
        console.log('update Access running')
        const payload = {
            user_id: user_id,
            new_user_id: new_user_id,
            old_role: old_role,
            new_role: new_role,
        }
        const response = await api.updateTileMapAccess(editStore.currentId, payload)
        if (response.status == 200) {
            console.log('success')
            const { access } = response.data
            const newAccessList = createAccessList(access, editStore.accessUsers)
            storeReducer({
                type: GlobalEditStoreActionType.UPDATE_ACCESS,
                payload: {
                    access: access,
                    accessList: newAccessList,
                }
            })
        }
    }

    editStore.updatePublic = async () => {
        console.log('updating public')
        const payload = { user_id: auth.user._id, updatePublic: true }
        const response = await api.updateTileMapAccess(editStore.currentId, payload)
        if (response.status == 200) {
            const { access } = response.data
            storeReducer({
                type: GlobalEditStoreActionType.UPDATE_ACCESS,
                payload: {
                    access: access
                }
            })
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

    editStore.updateMapSize = async function (height, width) {
        storeReducer({
            type: GlobalEditStoreActionType.UPDATE_DISPLAY,
            payload: {
                height: height,
                width: width,
            }
        })
    }

    editStore.addLayerStateTransaction = function (newState, redoCallback, undoCallback) {
        let undoFunc = (undoCallback) ? undoCallback : false
        let redoFunc = (redoCallback) ? redoCallback : false
        let transaction = new LayerState_Transaction(editStore, editStore.layers, newState, redoFunc, undoFunc);
        tps.addTransaction(transaction);
        console.log(transaction)
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

    editStore.clearTransactions = () => {
        tps.clearAllTransactions();
    }

    editStore.markTilesetForDeletion = async (_id) => {
        const tileset = editStore.tilesets.find(x => x._id == _id)
        console.log(tileset)
        storeReducer({
            type: GlobalEditStoreActionType.MARK_TILESET_FOR_DELETION,
            payload: {
                tilesetMarkedForDeletion: tileset
            }
        })
    }
    editStore.unmarkTilesetForDeletion = async () => {
        storeReducer({
            type: GlobalEditStoreActionType.UNMARK_TILESET_FOR_DELETION
        })
    }
    editStore.deleteMarkedTileset = async () => {
        const cid = editStore.tilesetMarkedForDeletion._id
        console.log(editStore.tilesetMarkedForDeletion)
        const payload = {
            tileset_id: cid,
            user_id: auth.user._id
        }
        console.log(editStore.currentId)
        console.log(payload)
        const response = await api.deleteTileSetfromTileMap(editStore.currentId, payload);
        console.log(response)
        if (response.status === 200) {
            const imgresponse = await api.deleteTileMapImage(cid, editStore.currentId)
            const newTilesets = editStore.tilesets.filter(x => x._id != cid)
            storeReducer({
                type: GlobalEditStoreActionType.DELETE_TILESET,
                payload: {
                    tilesets: newTilesets
                }
            })
        }
    }

    editStore.sendRequest = async (payload) => {
        const response = await api.createRequest(payload)
        console.log(response)
        if (response.status === 200) {
            setOpen(!response.data.requestGranted)
            storeReducer({
                type: GlobalEditStoreActionType.UPDATE_EDIT_REQUEST,
                payload: {
                    editingRequest: response.data.request,
                    editing: response.data.requestGranted
                }
            })
        }
    }

    editStore.deleteRequest = async (payload) => {
        console.log('Delete Called')
        const response = await api.deleteRequest(payload)
        if (response.status === 200) {
            console.log(response.data.request)
            storeReducer({
                type: GlobalEditStoreActionType.UPDATE_EDIT_REQUEST,
                payload: {
                    editingRequest: null,
                    editing: false
                }
            })
        }
    }

    editStore.getRequest = async (payload) => {
        const response = await api.getRequest(payload)
        if (response.status === 200) {
            storeReducer({
                type: GlobalEditStoreActionType.UPDATE_EDIT_REQUEST,
                payload: {
                    editingRequest: response.data.request,
                    editing: editStore.editing
                }
            })
        }
    }
    return (
        <GlobalEditStoreContext.Provider value={{
            editStore
        }}>
            {props.children}
            <DeniedAlert isOpen={open} onClose={()=>setOpen(false)}
                header={'Edit Request Denied'}
                message={[`Someone is currently editing ${editStore.name}`, 'Please try again later']}
            />
        </GlobalEditStoreContext.Provider>
    )
}

export default GlobalEditStoreContext;
export { GlobalEditStoreContextProvider };