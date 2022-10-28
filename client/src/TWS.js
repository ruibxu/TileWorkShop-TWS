import './TWS.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { AuthContextProvider } from './auth';
//import { GlobalStoreContextProvider } from './store'
import Homescreen from './components/Homescreen/Homescreen.js';
import Listscreen from './components/Listscreen/Listscreen';
import TopBanner from './components/Navbars/MainNavbar.js';


const TWS = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Homescreen} /> 
            <Route path="/listscreen" exact component={Listscreen} /> 
        </BrowserRouter>
    )
}
/*<AuthContextProvider>
                <GlobalStoreContextProvider>  
</GlobalStoreContextProvider>
            </AuthContextProvider>
        */
export default TWS