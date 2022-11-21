import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
import { ACCESS_TYPE, SORT_TYPE, SORT_ORDER, PROJECT_TYPE, SEARCH_TYPE, SHARE_ROLE } from "../translator-client/sort-options"
import LayerState_Transaction from "../transactions/LayerState_Transaction"
import jsTPS from "../common/jsTPS"
import { ImCrop } from "react-icons/im"
import OverlayTile from "../components/EditTileMapScreen/MapCanvasOverlay/OverlayTiles"
export const GlobalEditStoreContext = createContext({});


export const GlobalEditStoreActionType = {
    GET_TILEMAP_BY_ID: "GET_TILEMAP_BY_ID",
    GET_TILESET_BY_ID: "GET_TILSET_BY_ID",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    UPDATE_LAYER: "UPDATE_LAYER",
    UPDATE_DISPLAY: "UPDATE_DISPLAY"

}
const tps = new jsTPS();

const createImage = (src) => {
    let img = new Image()
    img.src = src
    img.crossOrigin = "anonymous"
    return img
}

const createOverlay = (width, height, zoomValue) => {
    let elements = []
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            elements.push(<OverlayTile coords={[x,y]} zoomValue={zoomValue}/>)
        }
    }
    return elements
}

const GlobalEditStoreContextProvider = (props) => {
    const [editStore, setEditStore] = useState({
        currentId: null,
        currentItem: null,
        width: 10,
        height: 10,
        scale: 64,
        zoomValue: 1,
        MapTileOverlay: createOverlay(10, 10),
        access: null,
        type: null,
        editing: true,
        layers:
            [{ id: 0, name: 'Layer 1', hidden: false, locked: false, data: {}, 
                properties: [
                    {name: 'bowlean', type:'boolean', value:'true'},
                    {name: 'something', type:'string', value:'print'},
                    {name: 'number', type:'number', value:'5'}
                ]
            },
            { id: 1, name: 'Layer 2', hidden: true, locked: false, data: {}, 
                properties: [
                    {name: 'bowlean', type:'boolean', value:'false'},
                    {name: 'something', type:'string', value:'layer2'},
                ]},
            { id: 2, name: 'Layer 3', hidden: false, locked: true, data: {} },
            { id: 3, name: 'Layer 4', hidden: true, locked: true, data: {} }],
        tilesets: [{_id:'test', name:'testname', pixel:128, height:8, width:5, 
                image: createImage('https://res.cloudinary.com/dktmkohjw/image/upload/v1668375792/TileSet_Editor/gameart2d-desert_n9lmkl.png')},
            {_id:'test2', name:'pokemon', pixel:16, height:8, width:16, 
                image: createImage('https://res.cloudinary.com/dktmkohjw/image/upload/v1668971390/TileSet_Editor/tileset2_aqxdjx.png')}
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
            case GlobalEditStoreActionType.UPDATE_DISPLAY: {
                return setEditStore({
                    ...editStore,
                    height: (payload.height)?payload.height:editStore.height,
                    width: (payload.width)?payload.width:editStore.width,
                    zoomValue: (payload.zoomValue)?payload.zoomValue:editStore.zoomValue,
                    MapTileOverlay: payload.MapTileOverlay?payload.MapTileOverlay:editStore.MapTileOverlay
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

    editStore.updateMapSize = async function (height, width) {
        let newOverlay = (false)
        if(editStore.height != height || editStore.width != width){
            newOverlay = createOverlay(width, height, editStore.zoomValue)
        }
        // createOverlay(payload.width, payload.height)
        storeReducer({
            type: GlobalEditStoreActionType.UPDATE_DISPLAY,
            payload: {
                height: height,
                width: width,
                MapTileOverlay: newOverlay
            }
        })
    }

    editStore.updateZoomValue = async function (zoom) {
        let newOverlay = (false)
        if(editStore.zoomValue != zoom){
            newOverlay = createOverlay(editStore.width, editStore.height, zoom)
        }
        // createOverlay(payload.width, payload.height)
        storeReducer({
            type: GlobalEditStoreActionType.UPDATE_DISPLAY,
            payload: {
                zoomValue: zoom,
                MapTileOverlay: newOverlay
            }
        })
    }

    editStore.addLayerStateTransaction = function (newState) {
        let transaction = new LayerState_Transaction(editStore, editStore.layers, newState);
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