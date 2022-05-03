import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import NotAuthorized from '../pages/ErrorPages/NotAuthorized';

export default function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth) {
                    return <Component />
                } else {
                    return <NotAuthorized />
                }
            }}
        />
    )
}
