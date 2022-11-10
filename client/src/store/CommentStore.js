import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
import { ACCESS_TYPE } from "../translator-client/sort-options"
export const GlobalCommentStoreContext = createContext({});

export const GlobalCommentStoreActionType = {
    CREATE_COMMENT: "CREATE_COMMENT",
    GET_COMMENTS_BY_LINK: "GET_COMMENTS_BY_LINK",
    UPDATE_COMMENT: "UPDATE_COMMENT"
}

const GlobalCommentStoreContextProvider = (props) => {
    const [commentStore, setCommentStore] = useState({
        currentCommentList: [],
        currentComment: null,
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
            case GlobalCommentStoreActionType.CREATE_COMMENT: {
                return setCommentStore({
                    currentComment: payload.currentComment,
                    currentCommentList: commentStore.currentCommentList,
                    markItemforDeletion: false
                })
            }
            case GlobalCommentStoreActionType.GET_COMMENTS_BY_LINK: {
                return setCommentStore({
                    currentComment: null,
                    currentCommentList: payload.currentCommentList,
                    markItemforDeletion: false
                })
            }
            case GlobalCommentStoreActionType.UPDATE_COMMENT: {
                return setCommentStore({
                    currentComment: payload.currentComment,
                    currentCommentList: commentStore.currentCommentList,
                    markItemforDeletion: false
                })
            }
            default:
                return commentStore;
        }
    }


    commentStore.createComment = async function (){
        const response = await api.createComment();
        if(response.status === 200){
            storeReducer({
                type: GlobalCommentStoreActionType.CREATE_COMMENT,
                payload:{
                    currentComment: response.data.result // result returns both comment and community. I intended currentComment to just be an id. 
                }
            })
        }else{
            console.log(response.data.errorMessage)
        }
    }
    commentStore.getCommentsByLink = async function(id){
        const response = await api.getCommentsByLink(id);
        if(response.status === 200){
            storeReducer({
                type: GlobalCommentStoreActionType.GET_COMMENTS_BY_LINK,
                payload:{
                    currentCommentList: response.data.comments  
                }
            })
        }else{
            console.log(response.data.errorMessage)
        }
    }
    commentStore.updateComment = async function(id, data){
        const response = await api.updateComment(id, data);
        if(response.status === 200){
            storeReducer({
                type: GlobalCommentStoreActionType.UPDATE_COMMENT,
                payload:{
                    currentComment: response.data.id  // I intended it to be something like this. Function returns an id. 
                }
            })
        }else{
            console.log(response.data.errorMessage)
        }
    }
    return (
        <GlobalCommentStoreContext.Provider value={{
            comment_store
        }}>
            {props.children}
        </GlobalCommentStoreContext.Provider>
    )
}

export default GlobalCommentStoreContext;
export { GlobalCommentStoreContextProvider };