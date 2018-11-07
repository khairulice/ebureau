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
            proceed: true,
            review: false,
            acknowledge: false
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

    onCurrencySelect(e) {
        console.log('[onPickColor]', this.inputEl.value)
        this.setState({ selectedCurrency: this.inputEl.value });
    }

    handleProceed = event => {
        event.preventDefault();
        this.setState({ proceed: false, review: true });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ proceed: false, review: false });
        const { selectedCurrency, amount } = this.state;
        const { user } = this.props;
        console.log(user);
        if (selectedCurrency && amount) {
            let dt = new Date();
            let fb = firebase.database().ref('TradeTransaction');
            fb.push({
                currency_code: selectedCurrency,
                amount: -amount,
                client_id: 'khairulice@gmail.com',
                dt_created: dt.toString()
            });

            let fbc = firebase.database().ref('ClientTransaction');
            fbc.push({
                currency_code: selectedCurrency,
                amount: amount,
                client_id: 'CurrencyExchanger',
                dt_created: dt.toString()
            });
        }
        this.setState({ proceed: false, review: false, acknowledge: true });
    }
    render() {

        let options = this.state.currencyies.map(c => {
            return <option key={c.key} value={c.name}>{c.name}</option>
        });

        return (<div className="col-md-offset-4 col-md-3 col-sm-12 topmargin">
            <form onSubmit={this.handleSubmit}>
                {this.state.proceed &&
                    <span>
                        <FormGroup controlId="selectedCurrency">
                            <ControlLabel>Select currency</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" onChange={this.onCurrencySelect.bind(this)}
                                inputRef={el => this.inputEl = el}>
                                <option value="select" >select</option>
                                {options}
                            </FormControl>
                        </FormGroup>
                        <FormGroup
                            controlId="amount">
                            <ControlLabel>Amount</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Enter amount"
                                onChange={this.handleChange}
                            />
                            <ControlLabel>= {this.state.amount/83} USD</ControlLabel>
                        </FormGroup>
                        <Button
                            block
                            bsSize="large"
                            className="primary"
                            disabled={!this.validateForm()}
                            onClick={this.handleProceed}
                            type="submit">
                            Proceed
                        </Button>
                    </span>
                }
                {this.state.review &&
                    <div>
                        <div>Currency: {this.state.selectedCurrency}</div>
                        <div>Amount: {this.state.amount}</div>
                        <Button
                            block
                            bsSize="large"
                            className="primary"
                            type="submit">
                            Buy
                        </Button>
                    </div>
                }
            </form>
            {this.state.acknowledge &&
                <div>
                    Thanks you.
                    </div>
            }
        </div>);
    }
}

function mapStateToProps(state) {
    const { user } = state.loginReducer;
    return {
        user
    };
}

const connectedBuy = connect(mapStateToProps)(Buy);
export { connectedBuy as Buy }; 