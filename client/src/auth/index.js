
//import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from '@chakra-ui/react'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    VERIFY_ACCOUNT: "VERIFY_ACCOUNT",
    UPDATE_ACCOUNT: "UPDATE_ACCOUNT",
    FORGET_PASSWORD: "FORGET_PASSWORD",
    CHANGE_PASSWORD: "CHANGE_PASSWORD"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false
    });
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (!auth.loggedIn) {
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
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false
                })
            }
            case AuthActionType.VERIFY_ACCOUNT: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false
                })
            }

            case AuthActionType.UPDATE_ACCOUNT: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }

            case AuthActionType.FORGET_PASSWORD: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false
                })
            }

            case AuthActionType.CHANGE_PASSWORD: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false
                })
            }
            

            default:
                return auth;
        }
    }

    auth.registerUser = async function (userData) {
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
            const emailed = await api.sendConfirmEmail(response.data.user._id, {email: response.data.user.email})
            if (emailed.status === 200){
                setMessage("Verification Email sent");
                handleOpen();
            }
            
        } else {
            setMessage(response.data.errorMessage);
            handleOpen();
        }
    }


    auth.logInUser = async function (userData) {
        const response = await api.loginUser(userData);
        if (response.status === 200) {
            console.log('login success');
                authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            return true
        } else {
            setMessage(response.data.errorMessage);
            handleOpen();
            return false
        }
    }

    auth.logoutUser = async function () {
        console.log('logout');
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
        }
        else{
            setMessage(response.data.errorMessage);
            handleOpen();
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
        else{
            setMessage(response.data.errorMessage);
            handleOpen();
        }
    }

    auth.verifyAccount = async function (id) {
        const response = await api.verifyAccount(id);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.VERIFY_ACCOUNT,
                payload: {
                    user: response.data.user
                }
            });
        }else{
            setMessage(response.data.errorMessage);
            handleOpen();
        }
    }

    auth.updateAccount = async function (userData) {
        const response = await api.updateAccount(auth.user._id, userData);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.UPDATE_ACCOUNT,
                payload: {
                    user: response.data.user
                }
            });
        }
        else {
            setMessage(response.data.errorMessage);
            handleOpen();
        }
    }

    auth.changePassword = async function (userData) {
        const response = await api.changePassword(userData);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.CHANGE_PASSWORD,
                payload: {
                    user: response.data.user
                }
            });
        }
        else {
            setMessage(response.data.errorMessage);
            handleOpen();
        }
    }

    

    auth.forgetPassword = async function (userData) {
        const response = await api.forgetPassword(userData);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.FORGET_PASSWORD,
                payload: {
                    user: response.data.user
                }
            });
            //add send email
            await api.sendPasswordResetEmail(response.data.user._id, {email: response.data.user.email})
        }
        else {
            setMessage(response.data.errorMessage);
            handleOpen();
        }
    }




    

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
            <AlertDialog
                onClose={handleClose}
                isOpen= {open}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                    
                        <AlertDialogHeader>
                            {message}
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <Button  colorScheme='purple' onClick={handleClose}>
                            Okay
                            </Button>
                        </AlertDialogFooter>
                
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };