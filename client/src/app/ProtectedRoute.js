import React from 'react';
import { Route } from 'react-router-dom';

import NotAuthorized from '../pages/ErrorPages/NotAuthorized';

export default function ProtectedRoute({ isAuth, component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={() => {
                if (isAuth) {
                    return <Component />
                } else {
                    return <NotAuthorized />
                }
            }}
        />
    )
}
