import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams} from "react-router-dom";
import AuthContext from '../../auth'

const VerifyAccountLink = () => {
    const {auth}   = useContext(AuthContext);
    let history = useHistory();
    const redirect = async (route, parameters) => {
        history.push(route, parameters);
    }
    

    let { id } = useParams();

    //-Insert an imediate call to the back end here----------------------------

    auth.verifyAccount(id);


    //----------------------------------------

    redirect('/homescreen', {AccountVerified: true})
}

export default VerifyAccountLink