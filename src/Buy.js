import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Jumbotron } from "react-bootstrap";
import { connect } from 'react-redux';
import { loginActions } from './_actions';
import firebase from "firebase";
import axios from "axios";

export default class Buy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currencyies: [],
            selectedCurrency: '',
            amount: 0.0,
            conversion: 0.0,
            proceed: true,
            review: false,
            acknowledge: false
        };
    }
    componentWillMount() {
        let apiURL = "https://api.nbp.pl/api/exchangerates/tables/A/?format=json";
        axios.get(apiURL).then(res => {
            //const apiExchangeRate = res.data[0].rates[7].mid;         
            console.log(res.data[0].rates);
            this.setState({ currencyies: res.data[0].rates });
        });
    }

    validateForm() {
        return this.state.selectedCurrency.length > 0;
    }

    handleChange = event => {
        console.log(this.state.selectedCurrency);
        let item = this.state.currencyies.filter(item => item.code === this.state.selectedCurrency)[0];

        if (item) {
            this.setState({
                [event.target.id]: event.target.value,
                conversion: (event.target.value * item.mid).toFixed(2)
            });
        }
    }

    onCurrencySelect(e) {
        let item = this.state.currencyies.filter(item => item.currency === this.inputEl.value)[0];
        this.setState(prevState => ({ ...prevState, conversion: (this.state.amount * item.mid).toFixed(2) }));
        this.setState({ selectedCurrency: item.code });

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
            return <option key={c.key} value={c.currency}>{c.code}</option>
        });

        return (<div className="col-md-4 col-sm-12">
            <form onSubmit={this.handleSubmit}>
                {this.state.proceed &&
                    <span>
                        <div className="title1">Buy currency</div>
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
                                type="number"
                                value={this.state.value}
                                placeholder="Enter amount"
                                onChange={this.handleChange}
                            />
                            <ControlLabel>= {this.state.conversion} USD</ControlLabel>
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
                        <div className="title1">Review</div>
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
                    <div className="title1">Review</div>
                    <div>
                        Thanks you.
                    </div>
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