import React, {useSelector, useEffect, useDispatch} from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
//contexto ??
import { login } from '../../actions/userActions'
import jwt from "jsonwebtoken";


function PrivateRoute({ component: Component, ...props }) {

    //const dispatch = useDispatch();
    //const userLogin = useSelector((state) => state.userLogin)
    const user = jwt.decode(JSON.parse(localStorage.getItem('userInfo')));

    useEffect(() => {
        //if (!JSON.parse(localStorage.getItem('userInfo'))) history.push('/');
        //console.log('USUARIO DESDE HIGH ORDER COMPONENT', user)
    }, [user]);

    return (

        <Route { ...props } render={ props => (user === null || !user.isAdmin)  ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />

    )
}


export default PrivateRoute
