import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge } from 'react-bootstrap'

export default class Stats extends Component {
    render() {

        const { completed, pending } = this.props;

        return (
            <div className="stats">
                Completed: <Badge bsClass="badge">{completed}</Badge>
                Pending: <Badge bsClass="badge">{pending}</Badge>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { completed, pending } = state.guestRequestReducer;
    return {
        completed,
        pending
    }
}

const connectedStats = connect(mapStateToProps)(Stats);
export { connectedStats as Stats };
