import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams} from "react-router-dom";
import AuthContext from '../../auth';

const ForgetPasswordLink = () => {
    const { auth } = useContext(AuthContext);
    let { id } = useParams();

    let history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }

    

    const response = auth.getForgetPasswordRequest(id)
    // let temp;
    // const request = response.then((x) => {temp = x})
    
    // if(!request){
    //     redirect('/homescreen')
    // }


    // redirect('/homescreen', {
    //     changePassword: true,
    //     request: request,
    //     user_id: request.related_id
    // })
}

export default ForgetPasswordLink