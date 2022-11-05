import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    LOAD_TILESET_ID_NAME_PAIRS: "LOAD_TILESET_ID_NAME_PAIRS",
    LOAD_TILEMAP_ID_NAME_PAIRS: "LOAD_TILEMAP_ID_NAME_PAIRS",
    UPDATE_ACCESS: "UPDATE_ACCESS",
    UPDATE_TILESET: "UPDATE_TILESET",
    UPDATE_TILEMAP: "UPDATE_TILEMAP",
    UPDATE_VISIBILITY: "UPDATE_VISIBILITY",
    VIEW_HOMEPAGE: "VIEW_HOMEPAGE",
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

const GlobalStoreProvider = (props) => {
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
            case GlobalStoreActionType.LOAD_TILESET_ID_NAME_PAIRS: {

            }
            case GlobalStoreActionType.LOAD_TILEMAP_ID_NAME_PAIRS: {

            }
            case GlobalStoreActionType.UPDATE_ACCESS: {

            }
            case GlobalStoreActionType.UPDATE_TILESET: {

            }
            case GlobalStoreActionType.UPDATE_TILEMAP: {

            }
            case GlobalStoreActionType.UPDATE_VISIBILITY: {

            }
            case GlobalStoreActionType.VIEW_HOMEPAGE: {

            }
            case GlobalStoreActionType.VIEW_LISTVIEW: {

            }
            case GlobalStoreActionType.VIEW_EDITTILESET: {

            }
            case GlobalStoreActionType.VIEW_EDITTILEMAP: {

            }
            case GlobalStoreActionType.SORT_BY_ALPHAORDER: {

            }
            case GlobalStoreActionType.SORT_BY_MOST_VIEWED: {

            }
            case GlobalStoreActionType.SORT_BY_MOST_LIKED: {

            }
            case GlobalStoreActionType.SORT_BY_MOST_RECENT: {

            }
            case GlobalStoreActionType.SEARCH_BY_NAME: {

            }
            case GlobalStoreActionType.SEARCH_BY_CREATOR: {

            }
            case GlobalStoreActionType.MARK_ITEM_FOR_DELETION: {

            }
            case GlobalStoreActionType.UNMARK_ITEM_FOR_DELTEION: {

            }
            case GlobalStoreActionType.CREATE_NEW_TILESET: {

            }
            case GlobalStoreActionType.CREATE_NEW_TILEMAP: {

            }
            case GlobalStoreActionType.CLOSE_CURRENT_ITEM: {

            }
            case GlobalStoreActionType.SET_CURRENT_ITEM: {

            }
            case GlobalStoreActionType.CHANGE_ITEM_NAME: {

            }
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
export { GlobalStoreProvider };