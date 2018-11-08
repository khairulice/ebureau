import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (     
        localStorage.getItem('user')  
            ?<div>
                <Component {...props} />
            </div>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />            
    )} />
)