import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { Grid, Row, Col, Table } from 'react-bootstrap'
import AddGuest from "./AddGuest";
import { connect } from 'react-redux';

export default class Guest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: []
        }
    }
    componentDidMount() {
        var pRef = firebase.database().ref('Guest');
        pRef.on('value', snapshot => {
            this.getData(snapshot.val());
        })
    }

    getData(values) {
        let messagesVal = values;
        let messages = _(messagesVal)
            .keys()
            .map(messageKey => {
                let cloned = _.clone(messagesVal[messageKey]);
                cloned.key = messageKey;
                return cloned;
            })
            .value();
        this.setState({
            guests: messages
        });
    }

    render() {
        let list = this.state.guests.map(p => {
            return (
                  <tr>                    
                    <td>{p.name}</td>
                    <td>{p.room}</td>
                    <td>{p.check_in_date}</td>  
                    <td>{p.check_out_date}</td>    
                    <td>Booked</td>                                     
                  </tr>                  
               )
        })
        return (
            
            <Grid>
            <Row>
              <Col xs={12} md={12}>
               <AddGuest />
               <Table responsive>
                <thead>
                  <tr>                   
                    <th>Name</th>
                    <th>Room</th>
                    <th>Check-In Date</th>    
                    <th>Check-Out Date</th>  
                    <th>Status</th>                                   
                  </tr>
                </thead>
                <tbody>
              {list}
              </tbody>
              </Table>
              </Col>              
            </Row>
          </Grid>
          )
    }
}


function mapStateToProps(state) {
    const { alert } = state;
    return {
      alert
    };
  }
  
  const connectedGuest = connect(mapStateToProps)(Guest);
  export { connectedGuest as Guest }; 
  