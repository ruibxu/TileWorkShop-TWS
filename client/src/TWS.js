import './TWS.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
//import { AuthContextProvider } from './auth';
//import { GlobalStoreContextProvider } from './store'
import Homescreen from './components/Homescreen/Homescreen.js';
import Listscreen from './components/Listscreen/Listscreen.js';
import EditTileSetScreen from './components/EditTileSetScreen/EditTileSetScreen.js';
import EditTileMapScreen from './components/EditTileMapScreen/EditTileMapScreen.js';


const TWS = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={() => <Homescreen/>} /> 
                <Route path="/homescreen" exact component={() => <Homescreen/>} /> 
                <Route path="/listscreen" exact component={() => <Listscreen/>} /> 
                <Route path="/tileset" exact component={() => <EditTileSetScreen/>}/>
                <Route path="/tilemap" exact component={() => <EditTileMapScreen/>}/>
                {/* <Route path="/forgetpassword/:id" exact component={() => re}/> */}
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