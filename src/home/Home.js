import React, { Component } from 'react';
import { history } from '../_common';
import { connect } from 'react-redux';
import TimeAgo from 'javascript-time-ago'; 
import en from 'javascript-time-ago/locale/en';
import { toastr } from 'react-redux-toastr'
import { guestService } from '../_services';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            messages: []
        }
    }
    handleSignup = () => {
        history.push('/signup');
    }
    handleLogin = () => {
        history.push('/login');
    }

    componentDidMount() {
        guestService.list().subscribe({
            next: items => {
                this.setState({
                    services: items
                });
            }
        });
        guestService.messages().subscribe({
            next: items => {
                this.setState({
                    messages: items
                });
            }
        });       
    }

    handleGuestRequest = (e) => {
        const { user } = this.props;
        guestService.submitService(e.currentTarget.dataset.id,user.email);
        toastr.success('Service', `${e.currentTarget.dataset.id} requested`);
    }

    render() {
        const { loggedIn } = this.props;
        let list = this.state.services.map(p => {
            return (
                <li key={p.key} data-id={p.Name} onClick={this.handleGuestRequest.bind(this)} className="list-group-item active">
                    {p.Name}
                </li>                
            )
        });

        // Add locale-specific relative date/time formatting rules.
        TimeAgo.locale(en)
 
        // Create relative date/time formatter.
        const timeAgo = new TimeAgo('en-US')

        let messages = this.state.messages.map(a => {
            return (
                <li key={a.key} data-id={a.Name} className="list-group-item">                  
                   <div> {a.action} </div> 
                   <div className="time">{timeAgo.format(new Date(a.dt_created))}</div>                       
                </li>               
            )
        });

        return (
            !loggedIn ?
                <section id="home" data-stellar-background-ratio="0.5">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-offset-3 col-md-6 col-sm-12">
                                <div className="home-info">
                                    <div>
                                        <h1>How can you help you</h1>
                                        <form action="" method="get" className="online-form">
                                            {/* <input type="email" name="email" className="form-control" placeholder="Enter your email" required="" /> */}
                                            <button type="submit" className="form-control" onClick={this.handleSignup}>Signup</button>
                                            <button type="submit" className="form-control" onClick={this.handleLogin}>Login</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : <div> <div className="overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="title1"> Quick Service</div>
                                <ul className="list-group service">
                                    {list}
                                    <li className="list-group-item active">
                                        Other
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="title1">Message</div>
                                <ul className="list-group">
                                    {messages}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}



function mapStateToProps(state) {
    const { loggedIn, user } = state.loginReducer;
    return {
        loggedIn,
        user
    };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };
