
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
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
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

    auth.changePassword = async function (userData, request) {
        const response = await api.changePassword(userData);
        console.log(response)
        if (response.status === 200) {
            console.log(request)
            const response2 = await api.deleteRequest({data: {...request}})
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
        console.log('Before success')
        if (response.status === 200) {
            console.log('After Success')
            const user = response.data.user
            authReducer({
                type: AuthActionType.FORGET_PASSWORD,
                payload: {
                    user: user
                }
            });
            const response2 = await api.createRequest({
                expire: 7200,
                data: {
                    request_type: "FORGOT_PASSWORD",
                    user_id: user._id,
                    related_id: user._id
                }
            })
            if(response2.status == 200){
                //add send email
                console.log('After Request Success')
                console.log(response2.data)
                await api.sendPasswordResetEmail(response2.data.request._id, {email: response.data.user.email})
                console.log('After Email sent')
            }
        }
        else {
            setMessage(response.data.errorMessage);
            handleOpen();
        }
    }

    auth.getForgetPasswordRequest = async (request_id, successCallback, failCallback) => {
        const response = await api.getRequestById(request_id, {})
        if(response.status == 200){
            console.log(response)
            const request = response.data.request
            if(!request){
                redirect('/homescreen')
            }
            redirect('/homescreen', {
                changePassword: true,
                request: request,
                user_id: request.related_id
            })
        }
        console.log('not success')
        redirect('/homescreen')
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