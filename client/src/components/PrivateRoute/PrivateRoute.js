import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import useToken from './../../helpers/useToken';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { token, setToken } = useToken();
    // if(!token) {
    //     return <Login setToken={setToken} />
    // }

    // Add your own authentication on the below line.
    const isLoggedIn = !!token;
    console.log("haha" + isLoggedIn + " " + token);

    return (
        <Route
        {...rest}
        render={props =>
            isLoggedIn ? (
            <Component {...props} />
            ) : (
            <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
            )
        }
        />
    )
}

export default PrivateRoute