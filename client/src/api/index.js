import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: ["http://localhost:4000/api",
        "http://localhost:4000/auth",
        "https://tileworkshop.herokuapp.com/api"]

})

export const getLoggedIn = () => api.get(`auth/loggedIn/`)
export const registerUser = (payload) => api.post(`auth/register/`, payload)
export const loginUser = (payload) => api.post(`auth/login/`, payload)
export const logoutUser = () => api.get(`auth/logout/`)
export const changePassword = () => api.put(`auth/changePassword/`)
export const updateAccount = (id,payload) => api.put(`auth/updateAccount/${id}`, payload)
export const verifyAccount = (id) => api.put(`auth/verifyAccount/${id}`)
const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    updateAccount,
    verifyAccount
}
export default apis