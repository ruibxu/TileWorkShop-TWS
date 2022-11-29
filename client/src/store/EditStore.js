import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
import { ACCESS_TYPE, SORT_TYPE, SORT_ORDER, PROJECT_TYPE, SEARCH_TYPE, SHARE_ROLE } from "../translator-client/sort-options"
import LayerState_Transaction from "../transactions/LayerState_Transaction"
import jsTPS from "../common/jsTPS"
import { ImCrop } from "react-icons/im"
export const GlobalEditStoreContext = createContext({});


export const GlobalEditStoreActionType = {
    GET_TILEMAP_BY_ID: "GET_TILEMAP_BY_ID",
    GET_TILESET_BY_ID: "GET_TILSET_BY_ID",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    UPDATE_LAYER: "UPDATE_LAYER",
    UPDATE_DISPLAY: "UPDATE_DISPLAY",
    UPDATE_TILESETS: "UPDATE_TILESETS",
    UPDATE_NAME: "UPDATE_NAME",
    UPDATE_CURRENT_ITEM: "UPDATE_CURRENT_ITEM"

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
        name: '',
        currentId: null,
        currentItem: null,
        width: 10,
        height: 10,
        scale: 64,
        // zoomValue: 1,
        // MapTileOverlay: createOverlay(10, 10),
        access: null,
        type: null,
        editing: true,
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
                    type: PROJECT_TYPE.TILEMAP,
                    width: payload.width,
                    height: payload.height,
                    layers: payload.layers,
                    tilesets: payload.tilesets,
                    name: payload.name
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
        }
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

    editStore.save = async (image) => {
        console.log('saving')
        const id = editStore.currentId
        const user_id = auth.user._id
        const {width, height, layers} = editStore
        const payload = {
            user_id: user_id,
            width: width,
            height: height,
            layers: layers
        }
        const response = await api.updateTileMap(id, payload)
        console.log(response.data)
        if (response.status == 200){
            const item = response.data.item
            item.community = null
            const imageResponse = await api.updateTileMapThumbnail(id, {data: image})
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

    editStore.addNewTileset = async function (payload, image) {
        const { name, pixel, height, width } = payload
        console.log(editStore.currentId)
        const response = await api.addTileSetToTileMap(editStore.currentId, payload);
        if (response.status === 200) {
            const tileset_id = response.data.tileset_id
            const response2 = await api.updateTileMapImage(tileset_id, { map_id: editStore.currentId, data: image })
            if (response2.status === 200) {
                const newTileset = {
                    id: tileset_id, name: name, pixel: pixel, height: height, width: width,
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
            result.community = null
            console.log(result)
            let tilesets = result.tileset
            if(tilesets.length > 0){
                const response2 = await api.getTileMapAllImage(id)
                if(response2.status == 200){
                    const images = response2.data.resources
                    tilesets.map(x => x.imageFull = images.find(y => y.filename == x._id))
                    tilesets.map(x => x.imageURL = x.imageFull.url)
                    tilesets.map(x => x.image = createImage(x.imageURL))
                }
            }
            storeReducer({
                type: GlobalEditStoreActionType.GET_TILEMAP_BY_ID,
                payload: {
                    currentId: result._id,
                    currentItem: result,
                    access: result.access,
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
        // let newOverlay = (false)
        // if(editStore.height != height || editStore.width != width){
        //     newOverlay = createOverlay(width, height, editStore.zoomValue)
        // }
        // createOverlay(payload.width, payload.height)
        storeReducer({
            type: GlobalEditStoreActionType.UPDATE_DISPLAY,
            payload: {
                height: height,
                width: width,
                // MapTileOverlay: newOverlay
            }
        })
    }

    // editStore.updateZoomValue = async function (zoom) {
    //     let newOverlay = (false)
    //     if(editStore.zoomValue != zoom){
    //         newOverlay = createOverlay(editStore.width, editStore.height, zoom)
    //     }
    //     // createOverlay(payload.width, payload.height)
    //     storeReducer({
    //         type: GlobalEditStoreActionType.UPDATE_DISPLAY,
    //         payload: {
    //             zoomValue: zoom,
    //             MapTileOverlay: newOverlay
    //         }
    //     })
    // }

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