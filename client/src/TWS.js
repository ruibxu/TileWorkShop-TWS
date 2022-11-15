import './TWS.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store/ProjectStore'
import { GlobalCommentStoreContextProvider } from './store/CommentStore';
import { GlobalEditStoreContextProvider } from './store/EditStore';
import Homescreen from './components/Homescreen/Homescreen.js';
import Listscreen from './components/Listscreen/Listscreen.js';
import EditTileSetScreen from './components/EditTileSetScreen/EditTileSetScreen.js';
import EditTileMapScreen from './components/EditTileMapScreen/EditTileMapScreen.js';

import ForgetPasswordLink from './components/Instant-Redirects/ForgetPasswordLink';
import VerifyAccountLink from './components/Instant-Redirects/VerifyAccountLink';


const TWS = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>
                    <GlobalCommentStoreContextProvider>
                        <Switch>
                            <Route path="/" exact component={() => <Homescreen />} />
                            <Route path="/homescreen" exact component={() => <Homescreen />} />
                            <Route path="/listscreen" exact component={() => <Listscreen />} />
                            <Route path="/forgetPassword/:id" exact component={() => <ForgetPasswordLink />} />
                            <Route path="/verifyAccount/:id" exact component={() => <VerifyAccountLink />} />
                            <GlobalEditStoreContextProvider>
                                <Route path="/tileset/:id" exact component={() => <EditTileSetScreen />} />
                                <Route path="/tilemap/:id" exact component={() => <EditTileMapScreen />} />
                            </GlobalEditStoreContextProvider>
                        </Switch>
                    </GlobalCommentStoreContextProvider>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default TWS