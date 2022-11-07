import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: "http://localhost:4000/" || "https://tileworkshop.herokuapp.com/"

})

export const getLoggedIn = () => api.get(`auth/loggedIn/`)
export const registerUser = (payload) => api.post(`auth/register/`, payload)
export const loginUser = (payload) => api.post(`auth/login/`, payload)
export const logoutUser = () => api.get(`auth/logout/`)
export const changePassword = (payload) => api.put(`auth/changePassword/`,payload)
export const updateAccount = (id,payload) => api.put(`auth/updateAccount/${id}`, payload)
export const verifyAccount = (id) => api.put(`auth/verifyAccount/${id}`)
export const forgetPassword = (payload) => api.put(`auth/forgetPassword/`, payload)

export const getUsernameByIds = () => api.get(`api/username/map`)
export const getViewableProjects = (type) => api.get(`api/viewable/${type}`)
export const getEditableProjects = (type) => api.get(`api/editable/${type}`)
export const getFavoriteProjects = (type) => api.get(`api/favorite/${type}`)
export const searchProject = (type) => api.get(`api/name/${type}`)
export const searchUsers = () => api.get(`api/user`)
export const searchProjectByUsers = (type) => api.get(`api/user/${type}`)
export const searchProjects2 = (type, payload) => api.get(`api/search/${type}`, payload)

export const getTileMapById = (id) => api.get(`api/tilemap/${id}`)
export const createTileMap = () => api.post(`api/tilemap`)
export const deleteTileMap = (id) => api.delete(`api/tilemap/${id}`)
export const updateTileMap = (id) => api.put(`api/tilemap/${id}`)
export const getTileMapImage = (id) => api.get(`api/tilemap/image/${id}`)
export const updateTileMapImage = (id) => api.put(`api/tilemap/image/${id}`)
export const deleteTileMapImage = (id) => api.delete(`api/tilemap/image/${id}`)
export const updateTileMapAccess = (id) => api.put(`api/tilemap/access/${id}`)
export const updateTileMapCommunity = (id) => api.put(`api/tilemap/community/${id}`)
export const addTileSetToTileMap = (id) => api.get(`api/tilemap/set/${id}`)
export const deleteTileSetfromTileMap = (id) => api.get(`api/tilemap/set/${id}`)

export const sendConfirmEmail = (id, payload) => api.post(`api/confirmEmail/${id}`, payload)
export const sendPasswordResetEmail = (id, payload) => api.post(`api/passwordReset/${id}`, payload)
const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    updateAccount,
    verifyAccount,
    forgetPassword,
    getUsernameByIds,
    getViewableProjects,
    getEditableProjects,
    getFavoriteProjects,
    searchProject,
    searchUsers,
    searchProjectByUsers,
    searchProjects2,
    getTileMapById,
    createTileMap,
    deleteTileMap,
    updateTileMap,
    getTileMapImage,
    updateTileMapImage,
    deleteTileMapImage,
    updateTileMapAccess,
    updateTileMapCommunity,
    addTileSetToTileMap,
    deleteTileSetfromTileMap,
    sendConfirmEmail,
    sendPasswordResetEmail
}
export default apis