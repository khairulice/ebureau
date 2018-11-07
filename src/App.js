import React, { Component } from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from "firebase";
import Config from './firebaseConfig';
import { history } from './_common';
import { Home } from "./home";
import { Login } from './login';
import { Signup } from './signup';
import Buy from './Buy';
import { PublicRoute, ProtectedRoute } from "./_common";
import { Service } from "./service";
import { GuestRequest, Guest } from "./guest";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { loginActions } from "./_actions";

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;    
    firebase.initializeApp(Config);
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Router history={history}>
          <div>
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/signup" component={Signup} />
            <PublicRoute exact path="/" component={Home} />

            <ProtectedRoute path="/buy" component={Buy} />
            <ProtectedRoute path="/request" component={GuestRequest} />
            <ProtectedRoute path="/guest" component={Guest} />
          </div>
        </Router>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  const { loggedIn } = state.loginReducer;
  return {
    alert,
    loggedIn
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
