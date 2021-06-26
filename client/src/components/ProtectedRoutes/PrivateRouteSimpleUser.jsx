import React, {useSelector, useEffect, useDispatch} from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import jwt from "jsonwebtoken";

function PrivateRouteSimpleUser({ component: Component, ...props }) {

    const user = jwt.decode(JSON.parse(localStorage.getItem('userInfo')));

    useEffect(() => {
        
    }, [user]);

    
    return (
        <Route { ...props } render={ props => !JSON.parse(localStorage.getItem('userInfo'))  ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />
    )
}

export default PrivateRouteSimpleUser
