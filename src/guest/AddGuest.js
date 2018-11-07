import React, { Component } from 'react';
import firebase from "firebase";
import { Modal, Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

export default class AddGuest extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            guest: {
                name: '',
                room: ''
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
            guest: {
                ...prevState.guest,
                [name]: value
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        let fb = firebase.database().ref('Guest');
        console.log(this.state.guest);
        fb.push({
            name: this.state.guest.name,
            room: this.state.guest.room,
        });

        this.setState({
            guest: {
                name: '',
                room: ''
            },
            show: false
        });
    }

    render() {
        return (
            <div>
                <Button className="add-product" bsSize="large" onClick={this.handleShow}>
                    + Register Guest
                 </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Guest Registratiobn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup
                                controlId="c_name">
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="name"
                                    value={this.state.guest.name}
                                    placeholder="Enter name"
                                    onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup
                                controlId="c_room">
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="room"
                                    value={this.state.guest.room}
                                    placeholder="Enter room"
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button autoFocus="True" bsStyle="primary" onClick={this.handleSubmit}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}