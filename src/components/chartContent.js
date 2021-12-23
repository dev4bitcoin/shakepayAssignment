import React from "react";
import LineChart from "./lineChart";
import "../styles/main.css";
import btcLogo from "../asset/bitcoin.png";
import ethLogo from "../asset/eth.png";

import { Currency } from "../enums/currency";
import { getNetworthData } from "../Data/transactionSetup";
import { getRates, getTransactionHistory } from "../services/apiService";
import Wallets from "./wallets";

class ChartContent extends React.Component {
  state = { currency: String };

  async componentDidMount() {
    this.setState({
      currency: Currency.BTC,
      fiatBalance: 0,
      bitcoinBalance: 0,
      ethereumBalance: 0,
      bitcoinTransactions: [],
      ethereumTransactions: [],
      netWorth: 0,
      btcFiat: 0,
      ethFiat: 0,
    });
    this.setupData();
  }

  setupData = () => {
    const transactionHistory = getTransactionHistory();
    const rates = getRates();
    const networthData = getNetworthData(transactionHistory, rates);
    this.setState(networthData);
  };

  handleCurrencyButtonClick = (currencyType) => {
    this.setState({ currency: currencyType });
  };

  render() {
    return (
      <div>
        <div className="title">
          <img
            className="logo"
            src={this.state.currency === Currency.BTC ? btcLogo : ethLogo}
            alt="logo"
          />
          <div className="mainTitle">
            {this.state.currency === Currency.BTC ? "Bitcoin" : "Ethereum"}{" "}
          </div>
          <div className="subtitle">({this.state.currency})</div>
        </div>
        <div className="chartArea">
          <LineChart
            currency={this.state.currency}
            btcTransactions={this.state.bitcoinTransactions}
            ethTransactions={this.state.ethereumTransactions}
          />
        </div>
        <div className="buttons">
          <div className="currencyButtons">
            <button
              className="button"
              onClick={() => this.handleCurrencyButtonClick(Currency.BTC)}
            >
              Bitcoin
            </button>
            <button
              className="button"
              onClick={() => this.handleCurrencyButtonClick(Currency.ETH)}
            >
              Ethereum
            </button>
          </div>
        </div>

        <div className="walletHeader">Your wallet</div>
        <Wallets data={this.state} />
      </div>
    );
  }
}

export default ChartContent;
