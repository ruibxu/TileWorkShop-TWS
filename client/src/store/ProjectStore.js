import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
import { ACCESS_TYPE, SORT_TYPE, SORT_ORDER, PROJECT_TYPE, SEARCH_TYPE, SHARE_ROLE } from "../translator-client/sort-options"
export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    VIEW_HOMEPAGE: "VIEW_HOMEPAGE",
    VIEW_MYPAGE: "VIEW_MYPAGE",
    VIEW_LISTVIEW: "VIEW_LISTVIEW",
    VIEW_EDITTILEMAP: "VIEW_EDITTILEMAP",
    VIEW_EDITTILESET: "VIEW_EDITTILESET",
    MARK_ITEM_FOR_DELETION: "MARK_ITEM_FOR_DELETION",
    UNMARK_ITEM_FOR_DELETION: "UNMARK_ITEM_FOR_DELTEION",
    CREATE_NEW_TILESET: "CREATE_NEW_TILESET",
    CREATE_NEW_TILEMAP: "CREATE_NEW_TILEMAP",
    CLOSE_CURRENT_ITEM: "CLOSE_CURRENT_ITEM",
    SET_CURRENT_ITEM: "SET_CURRENT_ITEM",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    GET_TILEMAP_BY_ID: "GET_TILEMAP_BY_ID",
    GET_TILESET_BY_ID: "GET_TILSET_BY_ID",
    UPDATE_ITEM_COMMUNITY: "UPDATE_ITEM_COMMUNITY",
    UPDATE_SORT_OPTIONS: "UPDATE_SORT_OPTIONS",
    SEARCH: "SEARCH",
    WHATS_NEW: "WHATS_NEW",
    DELETE_ITEM: "DELETE_ITEM"
}

const GlobalStoreContextProvider = (props) => {
    const [store, setStore] = useState({
        tileSetList: [],
        tileMapList: [],
        yourList: [],
        currentItem: null,
        tilesetEditActive: false,
        tileMapEditActive: false,
        markedItemforDeletion: null,
        search_term: '',
        search_by: SEARCH_TYPE.NAME,
        project_type: PROJECT_TYPE.TILEMAP,
        sort_type: SORT_TYPE.RECENT,
        sort_order: `${SORT_ORDER.DESCENDING}`,
        access_type: ACCESS_TYPE.VIEWABLE,
        whatsList: []
    });

    const history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    const { auth } = useContext(AuthContext);
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.VIEW_HOMEPAGE: {
                return setStore({
                    ...store,
                    tileSetList: payload.tileSetList,
                    tileMapList: payload.tileMapList,
                    yourList: payload.yourList,
                    whatsList: payload.whatsList,
                    currentItem: null,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                })
            }
            case GlobalStoreActionType.VIEW_MYPAGE: {
                return setStore({
                    ...store,
                })
            }
            case GlobalStoreActionType.VIEW_LISTVIEW: {
                return setStore({
                    ...store,
                    tileSetList: payload.tileSetList,
                    tileMapList: payload.tileMapList,
                    yourList: payload.yourList,
                    currentItem: null,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                })
            }
            case GlobalStoreActionType.VIEW_EDITTILESET: {
                return setStore({
                    ...store,

                })
            }
            case GlobalStoreActionType.VIEW_EDITTILEMAP: {
                return setStore({
                    ...store,

                })
            }
            case GlobalStoreActionType.MARK_ITEM_FOR_DELETION: {
                return setStore({
                    ...store,
                    markedItemforDeletion: payload.markedItemforDeletion,
                })
            }
            case GlobalStoreActionType.UNMARK_ITEM_FOR_DELETION: {
                return setStore({
                    ...store,
                    markedItemforDeletion: null,
                })
            }
            case GlobalStoreActionType.DELETE_ITEM: {
                return setStore({
                    ...store,
                    currentItem: payload.currentItem,
                    markedItemforDeletion: null,
                })
            }
            case GlobalStoreActionType.CREATE_NEW_TILESET: {
                return setStore({
                    ...store,
                    tileSetList: [],
                    tileMapList: [],
                    yourList: [],
                    currentItem: payload.currentItem,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                })
            }
            case GlobalStoreActionType.CREATE_NEW_TILEMAP: {
                return setStore({
                    ...store,
                    tileSetList: [],
                    tileMapList: [],
                    yourList: [],
                    currentItem: payload.currentItem,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                })
            }
            case GlobalStoreActionType.CLOSE_CURRENT_ITEM: {
                return setStore({
                    ...store,

                })
            }
            case GlobalStoreActionType.SET_CURRENT_ITEM: {
                return setStore({
                    ...store,
                    tileSetList: store.tileSetList,
                    tileMapList: store.tileMapList,
                    yourList: store.yourList,
                    currentItem: payload.currentItem,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                })
            }
            case GlobalStoreActionType.CHANGE_ITEM_NAME: {
                return setStore({
                    ...store,

                })
            }
            case GlobalStoreActionType.GET_TILEMAP_BY_ID: {
                return setStore({
                    ...store,
                    tileSetList: store.tileSetList,
                    tileMapList: store.tileMapList,
                    yourList: store.yourList,
                    currentItem: payload.currentItem,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                })
            }
            case GlobalStoreActionType.GET_TILESET_BY_ID: {
                return setStore({
                    ...store,
                    tileSetList: store.tileSetList,
                    tileMapList: store.tileMapList,
                    yourList: store.yourList,
                    currentItem: payload.currentItem,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                })
            }
            case GlobalStoreActionType.UPDATE_ITEM_COMMUNITY: {
                return setStore({
                    ...store,
                    tileSetList: store.tileSetList,
                    tileMapList: store.tileMapList,
                    yourList: store.yourList,
                    currentItem: payload.currentItem,
                    tilesetEditActive: false,
                    tileMapEditActive: false,
                })
            }
            case GlobalStoreActionType.UPDATE_SORT_OPTIONS: {
                return setStore({
                    ...store,
                    search_term: payload.search_term ? payload.search_term : (payload.search_term == '')?'':store.search_term,
                    search_by: payload.search_by ? payload.search_by : store.search_by,
                    project_type: payload.project_type ? payload.project_type : store.project_type,
                    sort_type: payload.sort_type ? payload.sort_type : store.sort_type,
                    sort_order: payload.sort_order ? payload.sort_order : store.sort_order,
                    access_type: payload.access_type ? payload.access_type : store.access_type,
                })
            }
            case GlobalStoreActionType.SEARCH: {
                return setStore({
                    ...store,
                    yourList: payload.yourList
                })
            }
            case GlobalStoreActionType.WHATS_NEW:{
                return setStore({
                    ...store,
                    whatsList: payload.whatsList
                })
            }
            default:
                return store;
        }
    }
    store.markItemforDeletion = async (item) => {
        storeReducer({
            type: GlobalStoreActionType.MARK_ITEM_FOR_DELETION,
            payload: {
                markedItemforDeletion: item
            }
        })
        console.log(store.markedItemforDeletion)
    }

    store.unmarkItemforDeletion = async () => {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_ITEM_FOR_DELETION,
            payload: null
        })
    }

    store.deleteItem = async () => {
        const user_id = ((auth.loggedIn)?auth.user._id:'not logged in');
        console.log(user_id)
        console.log(store.markedItemforDeletion)
        const id = store.markedItemforDeletion._id
        const type = store.markedItemforDeletion.type
        let response = null
        if(type == PROJECT_TYPE.TILEMAP){response = await api.deleteTileMap(id, user_id)}
        else {response = await api.deleteTileSet(id, user_id)}
        if (response.status == 200){
            console.log(response.data.result)
            storeReducer({
                type: GlobalStoreActionType.DELETE_ITEM,
                payload: {
                    currentItem: store.markedItemforDeletion
                }
            })
        }else{
            console.log(response.data.errorMessage)
        }
    }

    store.getWhatsNew = async () =>{
        const id = (auth.loggedIn)?auth.user._id:'guest'
        const response = await api.getWhatsNew(id)
        const {comments, projects, users} = response.data
        projects.map(x => x.owner = users.find(y => y._id == x.access.owner_id))
        comments.map(x => x.owner = users.find(y => y._id == x.user_id))
        comments.map(x => x.project = projects.find(y => y._id == x.project_id))
        const render_info = comments.map(x => ({
            _id: x._id,
            print: `${(x.owner)?x.owner.username:'Unnamed'} ${(x.project_id == x.link_id)?'commented':'replied'} \"${x.content}\"`,
            dateCreated: x.dateCreated,
            edited: x.edited,
            project_id: x.project_id,
            project_type: x.project.type,
            project_name: x.project.name,
            user_id: x.user_id
        }))
        if(response.status === 200){
            storeReducer({
                type: GlobalStoreActionType.WHATS_NEW,
                payload:{
                    whatsList: render_info
                }
            })
            console.log(render_info)
        }
    }
    store.search = async () => {
        const response = await api.searchProjects2(store.project_type, {
            searcher_id: (auth.loggedIn) ? auth.user._id : '',
            access: store.access_type,
            search_type: store.search_by,
            search_value: store.search_term,
            sort_type: store.sort_type,
            sort_order: store.sort_order
        })
        // console.log(store.access_type)
        // console.log(store.search_by)
        // console.log(store.search_term)
        // console.log(store.sort_type)
        // console.log(store.sort_order)
        // console.log(response.data.results)
        const results = response.data.results;
        const users = response.data.users;
        results.map(x => x.owner = users.find(y => y._id == x.access.owner_id))
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.SEARCH,
                payload: {
                    yourList: response.data.results
                }
            })
        }
    }
    store.update_sort_options = (pair) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_SORT_OPTIONS,
            payload: pair
        })
    }

    store.createNewTilemap = async function (tmd) {
        const response = await api.createTileMap(tmd);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_TILEMAP,
                payload: {
                    currentItem: response.data.tileMap
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
                    currentItem: response.data.tileSet
                }
            })
            redirect(`/tileset/${response.data.tileSet._id}`)
        } else {
            console.log(response.data.errorMessage)
        }
    }

    store.viewHomePage = async function () {
        console.log('refetching homescreen view')
        const response1 = await api.searchProjects2(PROJECT_TYPE.TILESET, {
            sort_type: 'community.likes',
            sort_order: -1,
            limit: 2
        });
        if (response1.status === 200) {
            const response2 = await api.searchProjects2(PROJECT_TYPE.TILEMAP, {
                sort_type: 'community.likes',
                sort_order: -1,
                limit: 2
            });
            if (response2.status !== 200) {
                console.log(response2.data.errorMessage)
            } else {
                console.log((auth.loggedIn) ? auth.user._id : 'not logged in')
                const response3 = await api.searchProjects2(PROJECT_TYPE.TILEMAP, {
                    searcher_id: (auth.loggedIn) ? auth.user._id : '',
                    access: ACCESS_TYPE.OWNER,
                    limit: 2
                })
                if (response3.status !== 200) {
                    console.log(response3.data.errorMessage)
                } else {
                    const id = (auth.loggedIn)?auth.user._id:'guest'
                    const response = await api.getWhatsNew(id)
                    const {comments, projects, users} = response.data
                    projects.map(x => x.owner = users.find(y => y._id == x.access.owner_id))
                    comments.map(x => x.owner = users.find(y => y._id == x.user_id))
                    comments.map(x => x.project = projects.find(y => y._id == x.project_id))
                    const render_info = comments.map(x => ({
                        _id: x._id,
                        print: `${(x.owner)?x.owner.username:'Unnamed'} ${(x.project_id == x.link_id)?'commented':'replied'} \"${x.content}\"`,
                        dateCreated: x.dateCreated,
                        edited: x.edited,
                        project_id: x.project_id,
                        project_type: x.project.type,
                        project_name: x.project.name,
                        user_id: x.user_id
                    }))
                    response1.data.results.map(x => x.owner = response1.data.users.find(y => y._id == x.access.owner_id))
                    response2.data.results.map(x => x.owner = response2.data.users.find(y => y._id == x.access.owner_id))
                    response3.data.results.map(x => x.owner = response3.data.users.find(y => y._id == x.access.owner_id))
                    console.log(response1.data.users)
                    storeReducer({
                        type: GlobalStoreActionType.VIEW_HOMEPAGE,
                        payload: {
                            tileSetList: response1.data.results,
                            tileMapList: response2.data.results,
                            yourList: response3.data.results,
                            whatsList: render_info
                        }
                    })
                }
            }
        } else {
            console.log(response1.data.errorMessage)
        }
    }

    store.viewListView = async function () {
        const response = await api.searchProjects2(PROJECT_TYPE.TILEMAP, {
            sort_type: 'community.likes',
            sort_order: 1,
            limit: 0
        });
        if (response.status === 200) {
            const results = response.data.results
            const users = response.data.users
            results.map(x => { x.owner = users.find(y => y._id == x.access.owner_id) })
            console.log(results)
            storeReducer({
                type: GlobalStoreActionType.VIEW_LISTVIEW,
                payload: {
                    tileMapList: [],
                    tileSetList: [],
                    yourList: results,

                }
            })
        } else {
            console.log(response.data.errorMessage)
        }

    }

    store.getTileMapById = async function (id) {
        const response = await api.getTileMapById(id);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.GET_TILEMAP_BY_ID,
                payload: {
                    currentItem: response.data.result
                }
            })
        } else {
            console.log(response.data.errorMessage)
        }
    }

    store.getTileSetById = async function (id) {
        const response = await api.getTileSetById(id);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.GET_TILESET_BY_ID,
                payload: {
                    currentItem: response.data.result
                }
            })
        } else {
            console.log(response.data.errorMessage)
        }
    }
    store.setCurrentItem = async function (obj) {
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_ITEM,
            payload: {
                currentItem: obj
            }
        })
    }
    store.updateTileMapCommunity = async function (id, payload) {
        const response = await api.updateTileMapCommunity(id, payload)
        if (response.status === 200) {
            const result = response.data.result
            const list = store.tileMapList
            const update = list.find(x => x._id == result._id)
            if (update) { update.community = result.community }

            const yourlist = store.yourList
            const update2 = yourlist.find(x => x._id == result._id)
            if (update2) { update2.community = result.community }
            storeReducer({
                type: GlobalStoreActionType.UPDATE_ITEM_COMMUNITY,
                payload: {
                    currentItem: result
                }
            })
            console.log(response.data.result)
        } else {
            console.log(response.data.errorMessage)
        }
    }

    store.updateTileSetCommunity = async function (id, payload) {
        const response = await api.updateTileSetCommunity(id, payload)
        if (response.status === 200) {
            const result = response.data.result
            const list = store.tileSetList
            const update = list.find(x => x._id == result._id)
            if (update) { update.community = result.community }

            const yourlist = store.yourList
            const update2 = yourlist.find(x => x._id == result._id)
            if (update2) { update2.community = result.community }
            storeReducer({
                type: GlobalStoreActionType.UPDATE_ITEM_COMMUNITY,
                payload: {
                    currentItem: result
                }
            })
        } else {
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