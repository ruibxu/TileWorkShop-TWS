import './TWS.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
//import { AuthContextProvider } from './auth';
//import { GlobalStoreContextProvider } from './store'
import Homescreen from './components/Homescreen/Homescreen.js';
import Listscreen from './components/Listscreen/Listscreen';
import TopBanner from './components/Navbars/MainNavbar.js';
import EditTileSetScreen from './components/EditTileSetScreen/EditTileSetScreen';


const TWS = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to={ {pathname: "/tileset"} } />
                <Route path="/homescreen" exact component={Homescreen} /> 
                <Route path="/listscreen" exact component={Listscreen} /> 
                <Route path="/tileset" exact component={EditTileSetScreen}/>
            </Switch>
        </BrowserRouter>
    )
}
/*<AuthContextProvider>
                <GlobalStoreContextProvider>  
</GlobalStoreContextProvider>
            </AuthContextProvider>
        */
export default TWS