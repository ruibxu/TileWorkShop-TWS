import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams} from "react-router-dom";

const ForgetPasswordLink = () => {

    let history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }

    let { id } = useParams();

    redirect('/homescreen', {
        changePassword: true,
        AccountId: id
    })
}

export default ForgetPasswordLink