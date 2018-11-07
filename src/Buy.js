import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Jumbotron } from "react-bootstrap";
import { connect } from 'react-redux';
import { loginActions } from './_actions';
import firebase from "firebase";

export default class Buy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currencyies: [{ name: 'USD' }, { name: 'Canadian Dollar' }],
            selectedCurrency: '',
            amount: 0.0,
            submitted: false,
            confirmation: false
        };
    }

    validateForm() {
        return this.state.selectedCurrency.length > 0;
    }
    handleChange = event => {        
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
  onCurrencySelect(e){
    console.log('[onPickColor]', this.inputEl.value )
    this.setState({ selectedCurrency: this.inputEl.value });
  }

  onPickColor(e){
    console.log('[onPickColor]', this.inputEl.value )
    this.setState({ color: this.inputEl.value });
  }


    handleContinue = event => {
        event.preventDefault();
        this.setState(prevState => ({ ...prevState, submitted: true, confirmation: true }))

    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ submitted: true });
        const { selectedCurrency, amount } = this.state;
        const { user } = this.props;
        if (selectedCurrency && amount) {
            let dt = new Date();
            let fb = firebase.database().ref('ClientTransaction');
            fb.push({
                currency_code: selectedCurrency,
                amount: amount,
                client_id: user.id,
                dt_created: dt.toString()
            });
        }

    }
    render() {

        let options = this.state.currencyies.map(c => {
            return <option value={c}>{c.name}</option>
        })

        return (<div className="Signup col-md-offset-3 col-md-6 col-sm-12 topmargin">
            {/* <form onSubmit={this.handleContinue}> */}
                {!this.state.submitted &&
                    <span>
                        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl 
              onChange={this.onPickColor.bind(this)}
              inputRef={ el => this.inputEl=el }
              componentClass="select" placeholder="select">
            <option value="">select</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </FormControl>
        </FormGroup>

                        <FormGroup controlId="selectedCurrency">
                            <ControlLabel>Select currency</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" onChange={this.onCurrencySelect.bind(this)}
                                inputRef={ el => this.inputEl=el }
                                >
                                <option value="select" >select</option>
                                {options}
                            </FormControl>
                        </FormGroup>

                        <FormGroup
                            controlId="amount"
                        >
                            <ControlLabel>Amount</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Enter amount"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Buy
          </Button>
                    </span>
                }

                {this.state.confirmation &&
                    <div>
                        <div>Currency: {this.state.selectedCurrency}</div>
                        <div>Amount: {this.state.amount}</div>
                        <Button
                            block
                            bsSize="large"
                            type="submit"
                            onSubmit={this.handleSubmit}
                        >
                            Confirm
             </Button>
                    </div>
                }

            {/* </form> */}
        </div>);
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.loginReducer;
    return {
        loggingIn,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(Buy);
export { connectedLoginPage as Buy }; 