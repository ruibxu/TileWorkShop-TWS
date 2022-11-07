import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: "http://localhost:4000/" || "https://tileworkshop.herokuapp.com/"

})

export const getLoggedIn = () => api.get(`auth/loggedIn/`)
export const registerUser = (payload) => api.post(`auth/register/`, payload)
export const loginUser = (payload) => api.post(`auth/login/`, payload)
export const logoutUser = () => api.get(`auth/logout/`)
export const changePassword = () => api.put(`auth/changePassword/`)
export const updateAccount = (id,payload) => api.put(`auth/updateAccount/${id}`, payload)
export const verifyAccount = (id) => api.put(`auth/verifyAccount/${id}`)

export const getUsernameByIds = () => api.get(`api/username/map`)
export const getViewableProjects = (type) => api.get(`api/viewable/${type}`)
export const getEditableProjects = (type) => api.get(`api/editable/${type}`)
export const getFavoriteProjects = (type) => api.get(`api/favorite/${type}`)
export const searchProject = (type) => api.get(`api/name/${type}`)
export const searchUsers = () => api.get(`api/user`)
export const searchProjectByUsers = (type) => api.get(`api/user/${type}`)
export const searchProjects2 = (type) => api.get(`api/search/${type}`)

export const getTileMapById = (id) => api.get(`api/tilemap/${id}`)
export const createTileMap = (id) => api.get(`api/tilemap/image${id}`)
export const deleteTileMap = () => api.get(`api/tilemap/${id}`)
export const updateTileMap = () => api.get(`api/tilemap/${id}`)
export const getTileMapImage = (id) => api.get(`api/tilemap/image${id}`)
export const updateTileMapImage = () => api.get(`api/tilemap/${id}`)
export const deleteTileMapImage = () => api.get(`api/tilemap/${id}`)
export const updateTileMapAccess = () => api.get(`api/tilemap/${id}`)
export const updateTileMapCommunity = () => api.get(`api/tilemap/${id}`)
export const addTileSetToTileMap = () => api.get(`api/tilemap/${id}`)
export const deleteTileSetfromTileMap = () => api.get(`api/tilemap/${id}`)

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    updateAccount,
    verifyAccount,
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
    deleteTileSetfromTileMap
}
export default apis