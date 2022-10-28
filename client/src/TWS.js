import './TWS.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { AuthContextProvider } from './auth';
//import { GlobalStoreContextProvider } from './store'
import HomePage from './components/Homescreen/Homescreen.js';
import TopBanner from './components/Navbars/MainNavbar.js';


const TWS = () => {
    return (
        <BrowserRouter>
                  
            <Route path="/" exact component={HomePage} /> 
        </BrowserRouter>
    )
}
/*<AuthContextProvider>
                <GlobalStoreContextProvider>  
</GlobalStoreContextProvider>
            </AuthContextProvider>
        */
export default TWS