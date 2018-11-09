import React from "react";
import debounce from "./debounce";
import { Form, InputGroup } from "react-html5-form";

const XHR_TIMEOUT = 1000;

async function onSubmit(form) {
  try {
    let rsp = await fetch(`server-response.json`).then(rsp => rsp.json());
    if (!rsp.ok) {
      form.setError(rsp.exception.message);
    }
  } catch (e) {
    form.setError("Server error");
  }
};

// Debounce for 50ms
const onInput = debounce((e, inputGroup, form) => {
  // Update state only of input group in focus
  inputGroup.checkValidityAndUpdate();
  // Update "valid" property of the form
  form.checkValidityAndUpdate();
}, 50);

const onShowErrors = (e, form) => {
  e.preventDefault();
  form.checkValidityAndUpdateInputGroups();
};

const validateDateTime = (input) => {
  if (input.current.value === "Choose...") {
    input.setCustomValidity(`Please select ${input.current.title}`);
    return false;
  }
  return true;
};

const Profile = props => (<div>
  <Form onSubmit={onSubmit} id="myform">
    {({ error, valid, pristine, submitting, submitted, form }) => (
      <React.Fragment>

        {submitted && !error && (<div className="alert alert-success" role="alert">
          Thanks for submitting!
          </div>)
        }
        <div className="row">
          <InputGroup
            tag="div"
            className="form-group col-md-6"
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
                  pattern="^.{2,30}$"
                  className={`form-control ${!valid && "is-invalid"}`}
                  id="firstNameInput"
                  aria-labelledby="firstNameLabel"
                  name="firstName"
                  onInput={(e) => onInput(e, inputGroup, form)}
                  placeholder="Enter first name" />
                {error && (<div className="invalid-feedback alert alert-danger">{error}</div>)}
              </div>
            )}
          </InputGroup>
        </div>
        <div className="row">
          <InputGroup
            tag="div"
            className="form-group col-md-6"
            validate={["lastName"]}
            translate={{
              lastName: {
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
                  onInput={(e) => onInput(e, inputGroup, form)}
                  placeholder="Enter last name" />
                {error && (<div className="invalid-feedback alert alert-danger">{error}</div>)}
              </div>
            )}
          </InputGroup>
        </div>
        <div className="row">
          <InputGroup
            tag="div"
            className="form-group col-md-6"
            validate={["email"]}
            translate={{
              email: {
                valueMissing: "C'mon! We need some value"
              }
            }}>
            {({ error, valid }) => (
              <div className="form-group">
                <label id="emailLabel" htmlFor="emailInput">Email address</label>
                <input
                  type="email"
                  required
                  name="email"
                  aria-labelledby="emailLabel"
                  className={`form-control ${!valid && "is-invalid"}`}
                  id="emailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email" />
                {error && (<div className="invalid-feedback">{error}</div>)}               
              </div>
            )}
          </InputGroup>
        </div>
        <div className="row">
          <InputGroup 
          className="form-group col-md-6"
          validate={{
            "vatId": (input) => {
              if (!input.current.value.startsWith("DE")) {
                input.setCustomValidity("Code must start with DE.");
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
                  name="vatId"
                  placeholder="Enter Phone Number" />
                {error && (<div className="invalid-feedback">{error}</div>)}                
              </div>
            )}
          </InputGroup>
        </div>
        <div className="row">
        <button
          disabled={(pristine || submitting)}
          className="btn btn-primary"
          type="submit"
        >Submit</button>
        </div>
      </React.Fragment>
    )}
  </Form>
</div>);
export default Profile;