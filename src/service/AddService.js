import React, { Component } from 'react';
import firebase from "firebase";
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

export default class AddService extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            service:{
                Name: ''               
            },
            value: '',                               
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;    
        
        this.setState(prevState => ({
            service: {
                ...prevState.service,
                [name]:value
            }
        }))
       
    }

    handleSubmit(event) {
        event.preventDefault();
        let fb = firebase.database().ref('Service');
        console.log(this.state.service);
        fb.push({
            Name: this.state.service.Name,           
        });

        this.setState({
            service:{
            Name: '',            
            show: false
        }});
    }


    getValidationState() {
        const length = this.state.Name.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }


    render() {
        return (
            <div>
                <Button  className="add-product" bsSize="large" onClick={this.handleShow}>
                    + Add Service
                 </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Service</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup
                                controlId="NameFG"
                            >
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="Name"
                                    value={this.state.service.Name}
                                    placeholder="Enter name"
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Name must be 5 digits</HelpBlock>
                            </FormGroup>                            
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button bsStyle="primary" onClick={this.handleSubmit}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}