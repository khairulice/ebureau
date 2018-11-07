import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "./Home";
import Product from "./Product";
import Signup from './Signup';
import Login from './Login';
  

const Routing = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>      
      <Route path='/store' component={Product}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </main>
)

export default Routing;