import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MainMenu } from "../header";
import {Footer} from "../footer";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (     
        localStorage.getItem('user')  
            ?<div>
                <MainMenu/>
                <section data-stellar-background-ratio="0.5" className="conent-height">
                    <Component {...props} />
                </section>
                <Footer/>
            </div>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />            
    )} />
)