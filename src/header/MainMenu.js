import React from 'react';
import { connect } from 'react-redux';
import { loginActions } from '../_actions';

class MainMenu extends React.Component {

    handleLogout = event => {
        event.preventDefault();
        const { dispatch } = this.props;
        dispatch(loginActions.logout());
    }

    render() {
        const { loggedIn, user, wallet } = this.props;         
        return (<section className="navbar custom-navbar navbar-fixed-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="icon icon-bar"></span>
                        <span className="icon icon-bar"></span>
                        <span className="icon icon-bar"></span>
                    </button>
                    <a href="/" className="navbar-brand">e-Bureau</a>
                </div>
                <div className="collapse navbar-collapse">
                    {loggedIn
                        && <ul className="nav navbar-nav">
                            <li><a href="/" className="smoothScroll">Home</a></li>
                            <li><a href="/buy" className="smoothScroll">Buy</a></li>
                            <li><a href="/sell" className="smoothScroll">Sell</a></li>
                            <li><a href="/exchange" className="smoothScroll">Exchange</a></li>
                        </ul>
                    }
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            {!loggedIn
                                ? <span>
                                    <a href="/login">Login</a>
                                    <a href="/signup">Signup</a>
                                </span>
                                : <span>
                                    <span className="welcome"> Your wallet: ${wallet}</span>
                                    <a href="#" onClick={this.handleLogout}>Logout</a>
                                    <a href="/profile">Profile</a>
                                </span>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </section>)
    }
}


function mapStateToProps(state) {
    const { alert } = state;
    const { loggedIn, user, wallet } = state.loginReducer;
    return {
        loggedIn,
        user,
        wallet,
        alert
    };
}

const connectedMainMenu = connect(mapStateToProps)(MainMenu);
export { connectedMainMenu as MainMenu };
