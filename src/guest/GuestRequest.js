import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { guestRequestService } from "../_services";
import { guestRequestActions } from '../_actions'
import { Stats } from './Stats';

export default class GuestRequest extends Component {
    constructor(props) {
        super(props);               

        this.state = {
            requests: []
        }
    }
    componentDidMount() {
        guestRequestService.list().subscribe({
            next: items => {
                this.setState({
                    requests: items
                });
                const { dispatch } = this.props;
                let completeditems = items.filter(r => r.status === 'Completed');
                dispatch(guestRequestActions.updateCompletedNumber(completeditems.length));
                let pendingitems = items.filter(r => r.status !== 'Completed');
                dispatch(guestRequestActions.updatePendingNumber(pendingitems.length));
            }
        });
    }

    handleGuestRequestServe = (e) => {        
        guestRequestService.reply(e.currentTarget.dataset.id);
    }

    handleGuestRequestComplete = (e) => {
        guestRequestService.complete(e.currentTarget.dataset.id);
    }

    render() {
        TimeAgo.locale(en)        
        const timeAgo = new TimeAgo('en-US')

        let list = this.state.requests.map(req => {
            return (
                <li key={req.key} className={req.status === "Serving" ? "list-group-item serving" : req.status === "Completed" ? "list-group-item completed" : "list-group-item"}>
                    <div className="row">
                        <div className="col-md-6">
                            <div> Requesting {req.service} at Room-708 </div>
                            <div className="time">{timeAgo.format(new Date(req.dt_created))}</div>
                        </div>
                        <div className="col-md-2">
                            {req.status}
                        </div>
                        <div className="col-md-4">
                            <Button bsStyle="success margin2px action-holder" data-id={req.key} onClick={this.handleGuestRequestComplete.bind(this)}>
                                <Glyphicon glyph="ok" />
                            </Button>
                            <Button bsStyle="info margin2px action-holder" data-id={req.key} onClick={this.handleGuestRequestServe.bind(this)}>
                                <Glyphicon glyph="send" />
                            </Button>
                        </div>
                    </div>
                </li>
            )
        });        

        return (<div> <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <div className="title1"> Request in Queue</div>
                        <Stats/>
                        <ul className="list-group">
                            {list}
                        </ul>
                    </div>                    
                </div>
            </div>
        </div>
        )
    }
}

const connectedProduct = connect(null)(GuestRequest);
export { connectedProduct as GuestRequest };
