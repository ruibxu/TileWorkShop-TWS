
//import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    VERIFY_ACCOUNT: "VERIFY_ACCOUNT",
    UPDATE_ACCOUNT: "UPDATE_ACCOUNT"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false
    });
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }

    useEffect(() => {
        if(auth.loggedIn){
            auth.getLoggedIn();
        }
        
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false
                })
            }
            case AuthActionType.LOGIN_USER:{
                return setAuth({
                    user:payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGOUT_USER:{
                return setAuth({
                    user:null,
                    loggedIn: false
                })
            }
            case AuthActionType.VERIFY_ACCOUNT:{
                return setAuth({
                    user: payload.user,
                    loggedIn: false
                })
            }

            case AuthActionType.UPDATE_ACCOUNT:{
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }

            default:
                return auth;
        }
    }

    auth.registerUser = async function(userData) {
        console.log('register');
        var response = null
        response = await api.registerUser(userData); 
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
        }else{
            console.log(response.data.errorMessage)
            //setMessage(response.data.errorMessage);
            //handleOpen();
        }
    }


    auth.logInUser = async function(userData) {
        const response = await api.loginUser(userData);      
        if (response.status === 200) {
            console.log('login success');
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
        }else{
            console.log(response.data.errorMessage)
            //setMessage(response.data.errorMessage);
            //handleOpen();
        }
    }

    auth.logoutUser = async function(){
        console.log('logout');
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.verifyAccount = async function (){
        const response = await api.verifyAccount();
        if(response.status === 200){
            authReducer({
                type: AuthActionType.VERIFY_ACCOUNT,
                payload:{
                    user: response.data.user
                }
            });
        }
    }

    auth.updateAccount = async function (userData){
        const response = await api.updateAccount(auth.user._id,userData);
        if(response.status === 200){
            authReducer({
                type: AuthActionType.UPDATE_ACCOUNT,
                payload:{
                    user: response.data.user
                }
            });
        }
        else{
            console.log(response.data.errorMessage);
        }
    }

    
    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };