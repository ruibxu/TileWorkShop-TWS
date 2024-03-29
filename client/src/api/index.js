import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: (window.location.href.includes('localhost')) ? "http://localhost:4000" : "https://tileworkshop.herokuapp.com/"

})

export const getLoggedIn = () => api.get(`auth/loggedIn/`)
export const registerUser = (payload) => api.post(`auth/register/`, payload)
export const loginUser = (payload) => api.post(`auth/login/`, payload)
export const logoutUser = () => api.get(`auth/logout/`)
export const changePassword = (payload) => api.put(`auth/changePassword/`, payload)
export const updateAccount = (id, payload) => api.put(`auth/updateAccount/${id}`, payload)
export const verifyAccount = (id) => api.put(`auth/verifyAccount/${id}`)
export const forgetPassword = (payload) => api.put(`auth/forgetPassword/`, payload)

// export const getUsernameByIds = () => api.get(`api/username/map`)
// export const getViewableProjects = (type) => api.get(`api/viewable/${type}`)
// export const getEditableProjects = (type) => api.get(`api/editable/${type}`)
// export const getFavoriteProjects = (type) => api.get(`api/favorite/${type}`)
// export const searchProject = (type) => api.get(`api/name/${type}`)
// export const searchUsers = () => api.get(`api/user`)
// export const searchProjectByUsers = (type) => api.get(`api/user/${type}`)
export const searchProjects2 = (type, payload) => api.put(`api/search/${type}`, payload)
export const getWhatsNew = (id) => api.get(`api/new/${id}`)
export const searchUserByEmail = (payload) => api.put(`api/searchUser`, payload)

export const getTileMapById = (id) => api.get(`api/tilemap/${id}`)
export const createTileMap = (payload) => api.post(`api/tilemap`, payload)
export const deleteTileMap = (id, user_id) => api.delete(`api/tilemap/${id}/${user_id}`)
export const updateTileMap = (id, payload) => api.put(`api/tilemap/${id}`, payload)
export const updateTileMapAccess = (id, payload) => api.put(`api/tilemap/access/${id}`, payload)
export const updateTileMapCommunity = (id, payload) => api.put(`api/tilemap/community/${id}`, payload)
export const addTileSetToTileMap = (id, payload) => api.put(`api/tilemap/set/${id}`, payload)
export const updateTileSetinTileMap = (id, payload) => api.put(`api/tilemap/set/update/${id}`, payload)
export const deleteTileSetfromTileMap = (id, payload) => api.put(`api/tilemap/deleteSet/${id}`, payload)

export const getTileMapImage = (id) => api.get(`cloud/tilemap/image/${id}`)
export const getTileMapAllImage = (id) => api.get(`cloud/tilemap/allimage/${id}`)
export const updateTileMapImage = (id, payload) => api.put(`cloud/tilemap/image/${id}`, payload)
export const deleteTileMapImage = (id, map_id) => api.delete(`cloud/tilemap/image/${id}/${map_id}`)
export const deleteTileMapAllImage = (id) => api.delete(`cloud/tilemap/allImage/${id}`)
export const getTileMapThumbnail = (id) => api.get(`cloud/tilemap/thumbnail/${id}`)
export const updateTileMapThumbnail = (id, payload) => api.put(`cloud/tilemap/thumbnail/${id}`, payload)
export const deleteTileMapThumbnail = (id) => api.delete(`cloud/tilemap/thumbnail/${id}`)


export const getTileSetById = (id) => api.get(`api/tileset/${id}`)
export const createTileSet = (payload) => api.post(`api/tileset`, payload)
export const deleteTileSet = (id, user_id) => api.delete(`api/tileset/${id}/${user_id}`)
export const updateTileSet = (id, payload) => api.put(`api/tileset/${id}`, payload)
export const updateTileSetAccess = (id, payload) => api.put(`api/tileset/access/${id}`, payload)
export const updateTileSetCommunity = (id, payload) => api.put(`api/tileset/community/${id}`, payload)

export const getTileSetImage = (id) => api.get(`cloud/tileset/image/${id}`)
export const updateTileSetImage = (id, payload) => api.put(`cloud/tileset/image/${id}`, payload)
export const deleteTileSetImage = (id) => api.delete(`cloud/tileset/image/${id}`)

export const getCommentById = (id) => api.get(`api/comment/${id}`)
export const getCommentsByLink = (id) => api.get(`api/comments/${id}`)
export const createComment = (payload) => api.post(`api/comment`, payload)
export const updateComment = (id, payload) => api.put(`api/comment/${id}`, payload)
export const deleteComment = (id, user_id) => api.delete(`api/comment/${id}/${user_id}`)
export const updateCommentCommunity = (id, payload) => api.put(`api/comment/community/${id}`, payload)


export const sendConfirmEmail = (id, payload) => api.post(`api/confirmEmail/${id}`, payload)
export const sendPasswordResetEmail = (id, payload) => api.post(`api/passwordReset/${id}`, payload)

export const createRequest = (payload) => api.post(`api/sendRequest`,payload)
export const deleteRequest = (payload) => api.put(`api/deleteRequest`,payload)
export const getRequest = (payload) => api.put(`api/getRequest`,payload)
export const getRequestById = (id,payload) => api.put(`api/getRequestbyId/${id}`,payload)
const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    updateAccount,
    verifyAccount,
    forgetPassword,

    // getUsernameByIds,
    // getViewableProjects,
    // getEditableProjects,
    // getFavoriteProjects,
    // searchProject,
    // searchUsers,
    // searchProjectByUsers,
    searchProjects2,
    getWhatsNew,
    searchUserByEmail,

    getTileMapById,
    createTileMap,
    deleteTileMap,
    updateTileMap,
    updateTileMapAccess,
    updateTileMapCommunity,
    addTileSetToTileMap,
    updateTileSetinTileMap,
    deleteTileSetfromTileMap,
    getTileMapImage,
    getTileMapAllImage,
    updateTileMapImage,
    deleteTileMapImage,
    deleteTileMapAllImage,
    getTileMapThumbnail,
    updateTileMapThumbnail,
    deleteTileMapThumbnail,

    createTileSet,
    createTileSet,
    deleteTileSet,
    updateTileSet,
    updateTileSetAccess,
    updateTileSetCommunity,
    getTileSetImage,
    updateTileSetImage,
    deleteTileSetImage,

    getCommentById,
    getCommentsByLink,
    createComment,
    updateComment,
    deleteComment,
    updateCommentCommunity,
    getTileSetById,
    createTileSet,
    deleteTileSet,
    updateTileSet,
    getTileSetImage,
    updateTileSetImage,
    deleteTileSetImage,
    updateTileSetAccess,
    updateTileSetCommunity,

    sendConfirmEmail,
    sendPasswordResetEmail,

    createRequest,
    deleteRequest,
    getRequest,
    getRequestById
}
export default apis