import React from 'react';
import { Route } from 'react-router-dom';
import {Footer} from "../footer";
import { MainMenu } from "../header";

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (             
            <div>
                 <MainMenu/>      
                <section data-stellar-background-ratio="0.5" className="conent-height">
                    <Component {...props} />
                </section>
                <Footer/>
            </div>            
    )} />
)