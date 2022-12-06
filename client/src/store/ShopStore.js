import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../auth"
import api from '../api'
export const GlobalShopStoreContext = createContext({});

export const GlobalShopStoreActionType = {

}

const GlobalShopStoreContextProvider = (props) => {
    const [shopStore, setShopStore] = useState({
        shopperId: '',
        shopperName: 'No Tilemap Selected',
        shopperExist: false,
    });
    const history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    const { auth } = useContext(AuthContext);
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
        }
    }
    return (
        <GlobalShopStoreContext.Provider value={{
            shopStore
        }}>
            {props.children}
        </GlobalShopStoreContext.Provider>
    )
}

export default GlobalShopStoreContext;
export { GlobalShopStoreContextProvider };