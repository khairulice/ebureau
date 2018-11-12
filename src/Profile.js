import React, { Component } from "react";
import debounce from "./debounce";
import { Form, InputGroup } from "react-html5-form";
import firebase from "firebase";
import { connect } from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      firstName:'',
      lastName:'',
      phoneNumber:'',      
      photo:'',
      client_id:'',
      dt_created:''
    }
    const XHR_TIMEOUT = 1000;
  }

  componentDidMount(){
    firebase.database().ref('UserProfile/101').once('value', snapshot => {
      console.log(snapshot.val().phoneNumber);
      this.setState({
       firstName:snapshot.val().firstName,
       lastName:snapshot.val().lastName,
       phoneNumber:snapshot.val().phoneNumber,
       photo:snapshot.val().photo,
      })
    })
  }

  onSubmit = (form) => {
    try {
      const { user } = this.props;
      console.log(user);
      let dt = new Date();
      firebase.database().ref('UserProfile/101').once('value', snapshot => {
        console.log(snapshot.exists());
        if (snapshot.exists()) {
          let fb = firebase.database().ref('UserProfile/101')
          fb.set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            photo:this.state.photo,
            client_id: user.email,
            dt_created: dt.toString()
          }).then(response => {
            console.log(response);
          });
        }
        else {
          firebase.database().ref('UserProfile/101').push({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            photo:this.state.photo,
            client_id: user.email,
            dt_created: dt.toString()
          }).then(response => {
            console.log(response);
          });
        }
      });


      // let rsp = await fetch(`server-response.json`).then(rsp => rsp.json());
      // if (!rsp.ok) {
      //     form.setError(rsp.exception.message);
      // }
    } catch (e) {
      console.log(e);
      form.setError("Server error");
    }
  };

  // Debounce for 50ms
  onInput = debounce((e, inputGroup, form) => {
    // Update state only of input group in focus
    inputGroup.checkValidityAndUpdate();
    // Update "valid" property of the form
    form.checkValidityAndUpdate();
  }, 50);

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

  };

  handleFile = (file) => {
    console.log(file);
    var ref = firebase.storage().ref().child(file.name);
    ref.put(file).then(
      snapshot => {        
        snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log(downloadURL);
          this.setState({photo:downloadURL})
        })
        //document.querySelector('photo').src=snapshot.downloadURL
      }
    )
  }

  render() {
    return (<div>
      <Form onSubmit={this.onSubmit} id="myform">
        {({ error, valid, pristine, submitting, submitted, form }) => (
          <React.Fragment>
            <h2>Your Profile</h2>
            {error && (<div className="alert alert-danger" role="alert">
              <strong>Oh snap!</strong> {error}
            </div>)
            }
            {submitted && !error && (<div className="alert alert-success" role="alert">
              Thanks for submitting!
          </div>)
            }
            <div className="row">
              <InputGroup
                tag="div"
                className="form-group col-md-3"
                validate={["firstName"]}
                translate={{
                  firstName: {
                    patternMismatch: "Please enter a valid first name."
                  }
                }}>
                {({ error, valid, inputGroup }) => (
                  <div className="form-group">
                    <label id="firstNameLabel" htmlFor="firstNameInput">First Name</label>
                    <input
                      pattern="^.{5,30}$"
                      className={`form-control ${!valid && "is-invalid"}`}
                      id="firstNameInput"
                      aria-labelledby="firstNameLabel"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={(e) => this.handleChange(e)}
                      onInput={(e) => this.onInput(e, inputGroup, form)}
                      placeholder="Enter first name" />
                    {error && (<div className="invalid-feedback alert alert-danger">{error}</div>)}
                  </div>
                )}
              </InputGroup>
              <InputGroup
                tag="div"
                className="form-group col-md-3"
                validate={["lastName"]}
                translate={{
                  lastName: {
                    valueMissing: "Last name is required.",
                    patternMismatch: "Please enter a valid last name."
                  }
                }}>
                {({ error, valid, inputGroup }) => (
                  <div className="form-group">
                    <label id="lastNameLabel" htmlFor="lastNameInput">Last Name</label>
                    <input
                      pattern="^.{5,30}$"
                      required
                      className={`form-control ${!valid && "is-invalid"}`}
                      id="lastNameInput"
                      aria-labelledby="lastNameLabel"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={(e) => this.handleChange(e)}
                      onInput={(e) => this.onInput(e, inputGroup, form)}
                      placeholder="Enter last name" />
                    {error && (<div className="invalid-feedback alert alert-danger">{error}</div>)}
                  </div>
                )}
              </InputGroup>
            </div>
            <div className="row">
              <InputGroup
                className="form-group col-md-6"
                validate={{
                  "phoneNumber": (input) => {
                    if (!input.current.value.startsWith("+88")) {
                      input.setCustomValidity("Code must start with +88.");
                      return false;
                    }
                    return true;
                  }
                }}>
                {({ error, valid }) => (
                  <div className="form-group">
                    <label id="vatIdLabel" htmlFor="vatIdInput">Phone Number</label>
                    <input
                      className={`form-control ${!valid && "is-invalid"}`}
                      id="vatIdInput"
                      aria-labelledby="vatIdLabel"
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={(e) => this.handleChange(e)}
                      placeholder="Enter Phone Number" />
                    {error && (<div className="invalid-feedback alert alert-danger">{error}</div>)}
                  </div>
                )}
              </InputGroup>
            </div>
            <div className="row">
            <div className="form-group">
              <label id="lblPhoto" htmlFor="photo">Photo</label><br/>
              <img id="photo" src={this.state.photo} height="120" width="96"></img>
              <input  name="photo" type="file" onChange={(e) => this.handleFile(e.target.files[0])}></input>
              </div>
            </div>
            <button
              // disabled={(pristine || submitting)}
              className="btn btn-primary"
              type="submit"
            >Submit</button>
          </React.Fragment>
        )}
      </Form>
    </div>);
  }
}


function mapStateToProps(state) {
  const { user } = state.loginReducer;
  return {
    user
  };
}

const connectedProfile = connect(mapStateToProps)(Profile);
export { connectedProfile as Profile }; 
