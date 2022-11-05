import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: ["http://localhost:4000/api",
        "https://tileworkshop.herokuapp.com/api"]

})

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logoutUser = () => api.get(`/logout/`)
export const changePassword = () => api.put(`/changePassword/`);
export const updateAccount = () => api.put(`/updateAccount/:id/`);
const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    updateAccount
}
export default apis