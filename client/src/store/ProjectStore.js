import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
import { ACCESS_TYPE } from "../translator-client/sort-options"
export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    UPDATE_ACCESS: "UPDATE_ACCESS",
    UPDATE_TILESET: "UPDATE_TILESET",
    UPDATE_TILEMAP: "UPDATE_TILEMAP",
    UPDATE_VISIBILITY: "UPDATE_VISIBILITY",
    VIEW_HOMEPAGE: "VIEW_HOMEPAGE",
    VIEW_MYPAGE: "VIEW_MYPAGE",
    VIEW_LISTVIEW: "VIEW_LISTVIEW",
    VIEW_EDITTILEMAP: "VIEW_EDITTILEMAP",
    VIEW_EDITTILESET: "VIEW_EDITTILESET",
    MARK_ITEM_FOR_DELETION: "MARK_ITEM_FOR_DELETION",
    UNMARK_ITEM_FOR_DELTEION: "UNMARK_ITEM_FOR_DELTEION",
    CREATE_NEW_TILESET: "CREATE_NEW_TILESET",
    CREATE_NEW_TILEMAP: "CREATE_NEW_TILEMAP",
    CLOSE_CURRENT_ITEM: "CLOSE_CURRENT_ITEM",
    SET_CURRENT_ITEM: "SET_CURRENT_ITEM",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    GET_TILEMAP_BY_ID: "GET_TILEMAP_BY_ID",
    GET_TILESET_BY_ID: "GET_TILSET_BY_ID",
    CREATE_COMMENT: "CREATE_COMMENT",
    GET_COMMENTS_BY_LINK: "GET_COMMENTS_BY_LINK",
    UPDATE_COMMENT: "UPDATE_COMMENT"
}

const GlobalStoreContextProvider = (props) => {
    const [store, setStore] = useState({
        tileSetList: [],
        tileMapList: [],
        yourList: [],
        currentTileSet: null,
        currentTileMap: null,
        tilesetEditActive: false,
        tileMapEditActive: false,
        markItemforDeletion: false
    });
    const history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    const { auth } = useContext(AuthContext);
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.UPDATE_ACCESS: {
                return setStore({

                })
            }
            case GlobalStoreActionType.UPDATE_TILESET: {
                return setStore({

                })
            }
            case GlobalStoreActionType.UPDATE_TILEMAP: {
                return setStore({

                })
            }
            case GlobalStoreActionType.UPDATE_VISIBILITY: {
                return setStore({

                })
            }
            case GlobalStoreActionType.VIEW_HOMEPAGE: {
                return setStore({
                    tileSetList: payload.tileSetList,
                    tileMapList: payload.tileMapList,
                    yourList: payload.yourList,
                    currentTileSet: null,
                    currentTileMap: null,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                    markItemforDeletion: false
                })
            }
            case GlobalStoreActionType.VIEW_MYPAGE: {
                return setStore({
                })
            }
            case GlobalStoreActionType.VIEW_LISTVIEW: {
                return setStore({
                    tileSetList: payload.tileSetList,
                    tileMapList: payload.tileMapList,
                    yourList: payload.yourList,
                    currentTileSet: null,
                    currentTileMap: null,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                    markItemforDeletion: false
                })
            }
            case GlobalStoreActionType.VIEW_EDITTILESET: {
                return setStore({

                })
            }
            case GlobalStoreActionType.VIEW_EDITTILEMAP: {
                return setStore({

                })
            }
            case GlobalStoreActionType.MARK_ITEM_FOR_DELETION: {
                return setStore({

                })
            }
            case GlobalStoreActionType.UNMARK_ITEM_FOR_DELTEION: {
                return setStore({

                })
            }
            case GlobalStoreActionType.CREATE_NEW_TILESET: {
                return setStore({
                    tileSetList: [],
                    tileMapList: [],
                    yourList: [],
                    currentTileSet: payload.currentTileSet,
                    currentTileMap: null,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                    markItemforDeletion: false
                })
            }
            case GlobalStoreActionType.CREATE_NEW_TILEMAP: {
                return setStore({
                    tileSetList: [],
                    tileMapList: [],
                    yourList: [],
                    currentTileSet: null,
                    currentTileMap: payload.currentTileMap,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                    markItemforDeletion: false
                })
            }
            case GlobalStoreActionType.CLOSE_CURRENT_ITEM: {
                return setStore({

                })
            }
            case GlobalStoreActionType.SET_CURRENT_ITEM: {
                return setStore({

                })
            }
            case GlobalStoreActionType.CHANGE_ITEM_NAME: {
                return setStore({

                })
            }
            case GlobalStoreActionType.GET_TILEMAP_BY_ID: {
                return setStore({
                    tileSetList: store.tileSetList,
                    tileMapList: store.tileMapList,
                    yourList: store.yourList,
                    currentTileSet: null,
                    currentTileMap: payload.currentTileMap,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                    markItemforDeletion: false
                })
            }
            case GlobalStoreActionType.GET_TILESET_BY_ID: {
                return setStore({
                    tileSetList: store.tileSetList,
                    tileMapList: store.tileMapList,
                    yourList: store.yourList,
                    currentTileSet: payload.currentTileSet,
                    currentTileMap: null,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                    markItemforDeletion: false
                })
            }
            default:
                return store;
        }
    }
    store.createNewTilemap = async function (tmd) {
        const response = await api.createTileMap(tmd);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_TILEMAP,
                payload: {
                    currentTileMap: response.data.tileMap
                }
            })
            redirect(`/tilemap/${response.data.tileMap._id}`)
        } else {
            console.log(response.data.errorMessage)
        }
    }

    store.createNewTileset = async function (tsd) {
        const response = await api.createTileSet(tsd);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_TILESET,
                payload: {
                    currentTileSet: response.data.tileSet
                }
            })
            redirect(`/tileset/${response.data.tileSet._id}`)
        } else {
            console.log(response.data.errorMessage)
        }
    }

    store.viewHomePage = async function () {
        console.log('refetching homescreen view')
        const response1 = await api.searchProjects2('Tileset', {
            sort_type: 'community.likes',
            sort_order: 1,
            limit: 2
        });
        if (response1.status === 200) {
            const response2 = await api.searchProjects2('Tilemap', {
                sort_type: 'community.likes',
                sort_order: 1,
                limit: 2
            });
            if (response2.status !== 200) {
                console.log(response2.data.errorMessage)
            } else {
                console.log((auth.loggedIn) ? auth.user._id : 'not logged in')
                const response3 = await api.searchProjects2('Tilemap', {
                    searcher_id: (auth.loggedIn) ? auth.user._id : '',
                    access: ACCESS_TYPE.OWNER,
                    limit: 2
                })
                if (response3.status !== 200) {
                    console.log(response3.data.errorMessage)
                } else {
                    response1.data.results.map(x => x.owner = response1.data.users.find(y => y._id == x.access.owner_id))
                    response2.data.results.map(x => x.owner = response2.data.users.find(y => y._id == x.access.owner_id))
                    response3.data.results.map(x => x.owner = response3.data.users.find(y => y._id == x.access.owner_id))
                    console.log(response1.data.users)
                    storeReducer({
                        type: GlobalStoreActionType.VIEW_HOMEPAGE,
                        payload: {
                            tileSetList: response1.data.results,
                            tileMapList: response2.data.results,
                            yourList: response3.data.results
                        }
                    })
                }
            }
        } else {
            console.log(response1.data.errorMessage)
        }
    }

    store.viewListView = async function () {
        const response = await api.searchProjects2('Tilemap', {
            sort_type: 'community.likes',
            sort_order: 1,
            limit: 0
        });
        if (response.status === 200) {
            const results = response.data.results
            const users = response.data.users
            results.map(x => {x.owner = users.find(y => y._id == x.access.owner_id)})
            console.log(results)
            storeReducer({
                type: GlobalStoreActionType.VIEW_LISTVIEW,
                payload: {
                    tileMapList: results,
                    tileSetList: [],
                    yourList: []
                }
            })
        } else {
            console.log(response.data.errorMessage)
        }

    }

    store.getTileMapById = async function (id){
        const response = await api.getTileMapById(id);
        if(response.status === 200){
            storeReducer({
                type: GlobalStoreActionType.GET_TILEMAP_BY_ID,
                payload:{
                    currentTileMap: response.data.result
                }
            })
        }else{
            console.log(response.data.errorMessage)
        }
    }

    store.getTilesetById = async function (id){
        const response = await api.getTilesetById(id);
        if(response.status === 200){
            storeReducer({
                type: GlobalStoreActionType.GET_TILESET_BY_ID,
                payload:{
                    currentTileSet: response.data.result
                }
            })
        }else{
            console.log(response.data.errorMessage)
        }
    }
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    )
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };