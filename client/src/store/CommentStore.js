import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
export const GlobalCommentStoreContext = createContext({});

export const GlobalCommentStoreActionType = {
    CREATE_COMMENT: "CREATE_COMMENT",
    GET_COMMENTS_BY_LINK: "GET_COMMENTS_BY_LINK",
    UPDATE_COMMENT: "UPDATE_COMMENT",
    MARK_COMMMENT_FOR_DELETION: "MARK_COMMMENT_FOR_DELETION",
    UNMARK_COMMENT_FOR_DELETION: "UNMARK_COMMENT_FOR_DELETION",
    UPDATE_COMMENT_COMMUNITY: "UPDATE_COMMENT_COMMUNITY"
}

const GlobalCommentStoreContextProvider = (props) => {
    const [commentStore, setCommentStore] = useState({
        currentCommentList: [],
        currentComment: null,
        commentMarkedForDeletion: null,
        refetch: true
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
                    commentMarkedForDeletion: null,
                    refetch: true
                })
            }
            case GlobalCommentStoreActionType.GET_COMMENTS_BY_LINK: {
                return setCommentStore({
                    currentComment: commentStore.currentComment,
                    currentCommentList: payload.currentCommentList,
                    commentMarkedForDeletion: null,
                    refetch: false
                })
            }
            case GlobalCommentStoreActionType.UPDATE_COMMENT: {
                return setCommentStore({
                    currentComment: payload.currentComment,
                    currentCommentList: commentStore.currentCommentList,
                    commentMarkedForDeletion: null,
                    refetch: true
                })
            }
            case GlobalCommentStoreActionType.MARK_COMMMENT_FOR_DELETION: {
                return setCommentStore({
                    currentComment: commentStore.currentComment,
                    currentCommentList: commentStore.currentCommentList,
                    commentMarkedForDeletion: payload.commentMarkedForDeletion,
                    refetch: true
                })
            }
            case GlobalCommentStoreActionType.UNMARK_COMMENT_FOR_DELETION: {
                return setCommentStore({
                    currentComment: null,
                    currentCommentList: commentStore.currentCommentList,
                    commentMarkedForDeletion: null,
                    refetch: true
                })
            }
            case GlobalCommentStoreActionType.UPDATE_COMMENT_COMMUNITY: {
                return setCommentStore({
                    currentComment: payload.currentComment,
                    currentCommentList: commentStore.currentCommentList,
                    commentMarkedForDeletion: null,
                    refetch: true
                })
            }
            default:
                return commentStore;
        }
    }


    commentStore.createComment = async function (data) {
        const response = await api.createComment(data);
        if (response.status === 200) {
            console.log(response.data.result)
            storeReducer({
                type: GlobalCommentStoreActionType.CREATE_COMMENT,
                payload: {
                    currentComment: response.data.result // result returns both comment and community. I intended currentComment to just be an id. 
                }
            })
        } else {
            console.log(response.data.errorMessage)
        }
    }
    commentStore.getCommentsByLink = async function (id) {
        const response = await api.getCommentsByLink(id);
        if (response.status === 200) {
            const comments = [...response.data.comments, ...response.data.replies]
            const users = response.data.users
            comments.map(x => x.owner = users.find(y => y._id == x.user_id))
            storeReducer({
                type: GlobalCommentStoreActionType.GET_COMMENTS_BY_LINK,
                payload: {
                    currentCommentList: comments
                }
            })
            console.log(commentStore.currentCommentList)
        } else {
            console.log(response.data.errorMessage)
        }
    }
    commentStore.updateComment = async function (id, data) {
        const response = await api.updateComment(id, data);
        console.log('outside status')
        if (response.status === 200) {
            storeReducer({
                type: GlobalCommentStoreActionType.UPDATE_COMMENT,
                payload: {
                    currentComment: response.data.result  // I intended it to be something like this. Function returns an id. 
                }
            })
            console.log(commentStore.currentComment)
        } else {
            console.log(response.data.errorMessage)
        }
    }
    commentStore.markCommentForDeletion = async function (id) {
        storeReducer({
            type: GlobalCommentStoreActionType.MARK_COMMMENT_FOR_DELETION,
            payload: {
                currentComment: response.data.result
            }
        })
    }
    commentStore.deleteMarkedComment = async function () {
        const response = await api.deleteComment(commentStore.currentComment)
        if (response.status === 200) {
            commentStore.getCommentsByLink()
        }
    }
    commentStore.unmarkCommentForDeletion = async function () {
        storeReducer({
            type: GlobalCommentStoreActionType.UNMARK_COMMENT_FOR_DELETION,
            payload: null
        })
    }
    commentStore.updateCommentCommunity = async function (id, payload) {
        const response = await api.updateCommentCommunity(id, payload);
        if (response.status === 200) {
            storeReducer({
                type: GlobalCommentStoreActionType.UPDATE_COMMENT_COMMUNITY,
                payload: {
                    currentComment: response.data.result
                }
            })
        }
    }
    return (
        <GlobalCommentStoreContext.Provider value={{
            commentStore
        }}>
            {props.children}
        </GlobalCommentStoreContext.Provider>
    )
}

export default GlobalCommentStoreContext;
export { GlobalCommentStoreContextProvider };