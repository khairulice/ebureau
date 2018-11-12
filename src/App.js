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
import { Buy } from './Buy';
import { PublicRoute, ProtectedRoute } from "./_common";
import { Service } from "./service";
import { GuestRequest, Guest } from "./guest";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { alertActions } from "./_actions";
import { MainMenu } from "./header";
import { Footer } from "./footer";
import {Profile} from './Profile';
import MyForm from './sample';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });

    firebase.initializeApp(Config);
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <MainMenu />
        <section data-stellar-background-ratio="0.5" className="conent-height">
          <div className="container">
            {/* <div className="overlay"></div> */}
            <div className="row">
              <div className="col-md-offset-3 col-md-8 col-sm-12 topmargin">
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
                    <ProtectedRoute path="/profile" component={Profile} />
                  </div>
                </Router>
              </div>
            </div>
          </div>
        </section>
        <Footer />
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
