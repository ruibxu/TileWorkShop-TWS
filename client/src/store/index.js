import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"

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
    SORT_BY_ALPHAORDER: "SORT_BY_ALPHAORDER",
    SORT_BY_MOST_VIEWED: "SORT_BY_MOST_VIEWED",
    SORT_BY_MOST_LIKED: "SORT_BY_MOST_LIKED",
    SORT_BY_MOST_RECENT: "SORT_BY_MOST_RECENT",
    SEARCH_BY_NAME: "SEARCH_BY_NAME",
    SEARCH_BY_CREATOR: "SEARCH_BY_CREATOR",
    MARK_ITEM_FOR_DELETION: "MARK_ITEM_FOR_DELETION",
    UNMARK_ITEM_FOR_DELTEION: "UNMARK_ITEM_FOR_DELTEION",
    CREATE_NEW_TILESET: "CREATE_NEW_TILESET",
    CREATE_NEW_TILEMAP: "CREATE_NEW_TILEMAP",
    CLOSE_CURRENT_ITEM: "CLOSE_CURRENT_ITEM",
    SET_CURRENT_ITEM: "SET_CURRENT_ITEM",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME"
}

const GlobalStoreContextProvider = (props) => {
    const [store, setStore] = useState({
        tileSetList: [],
        tileMapList: [],
        currentTileset: null,
        currentTileMap: null,
        tilesetEditActive: false,
        tileMapEditActive: false,
        isPublic: false,
        currentAccess: null,
        viewHomePage: false,
        viewMyPage: false,
        viewListView: false,
        viewEditTileMap: false,
        viewEditTileSet: false,
        sortByAlphaOrder: false,
        sortByMostViewed: false,
        sortByMostLiked: false,
        sortByMostRecent: false,
        searchByName: false,
        searchByCreator: false,
        markItemforDeletion: false,
        isEdit: false
    });
    const history = useHistory();
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
                    currentTileset: null,
                    currentTileMap: null,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                    isPublic: false,
                    currentAccess: null,
                    viewHomePage: payload.viewHomePage,
                    viewMyPage: false,
                    viewListView: false,
                    viewEditTileMap: false,
                    viewEditTileSet: false,
                    sortByAlphaOrder: payload.sortByAlphaOrder,
                    sortByMostViewed: payload.sortByMostViewed,
                    sortByMostLiked: payload.sortByMostLiked,
                    sortByMostRecent: payload.sortByMostRecent,
                    searchByName: payload.searchByName,
                    searchByCreator: payload.searchByCreator,
                    markItemforDeletion: false,
                    isEdit: false
                })
            }
            case GlobalStoreActionType.VIEW_MYPAGE: {
                return setStore({
                })
            }
            case GlobalStoreActionType.VIEW_LISTVIEW: {
                return setStore({

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
            case GlobalStoreActionType.SORT_BY_ALPHAORDER: {
                return setStore({

                })
            }
            case GlobalStoreActionType.SORT_BY_MOST_VIEWED: {
                return setStore({

                })
            }
            case GlobalStoreActionType.SORT_BY_MOST_LIKED: {
                return setStore({

                })
            }
            case GlobalStoreActionType.SORT_BY_MOST_RECENT: {
                return setStore({

                })
            }
            case GlobalStoreActionType.SEARCH_BY_NAME: {
                return setStore({

                })
            }
            case GlobalStoreActionType.SEARCH_BY_CREATOR: {
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

                })
            }
            case GlobalStoreActionType.CREATE_NEW_TILEMAP: {
                return setStore({

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
            default:
                return store;
        }
    }

    store.viewHomePage = async function(){
        
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