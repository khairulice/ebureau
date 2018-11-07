import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap'
import AddService from "./AddService";
import { connect } from 'react-redux';
import { guestService } from '../_services';

export default class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: []
        }
    }

    componentDidMount() {
        guestService.list().subscribe({
            next: items => {
                this.setState({
                    services: items
                });
            }
        });
    }

    render() {
        let list = this.state.services.map(p => {
            return (
                  <tr>                    
                    <td>{p.Name}</td>
                    <td>{p.Type}</td>
                    <td>{p.Status}</td>                                   
                  </tr>                  
               )
        })
        return (
            
            <Grid>
            <Row>
              <Col xs={12} md={12}>
               <AddService />
               <Table responsive>
                <thead>
                  <tr>                   
                    <th>Name</th>
                    <th>Type</th>
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
  
  const connectedService = connect(mapStateToProps)(Service);
  export { connectedService as Service }; 
  