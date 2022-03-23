import React from "react";
import btclogo from "../asset/bitcoin.png";
import ethLogo from "../asset/eth.png";
import cadLogo from "../asset/cad.png";

const Wallets = ({ data }) => {
  return (
    <div>
      <div className="wallet">
        <div className="walletDetail">
          <div className="btcBalance">
            <img className="btcWalletLogo" alt="logo" src={btclogo} />
            <div className="balance">{data.bitcoinBalance}</div>
            <div className="balanceTitle">BTC</div>
          </div>

          <div className="fiatValue">$ {data.btcFiat}</div>
        </div>
        <div className="walletDetail">
          <div className="btcBalance">
            <img className="btcWalletLogo" alt="logo" src={ethLogo} />
            <div className="balance">{data.ethereumBalance}</div>
            <div className="balanceTitle">ETH</div>
          </div>
          <div className="fiatValue">$ {data.ethFiat}</div>
        </div>
        <div className="walletDetail">
          <div className="btcBalance">
            <img className="btcWalletLogo" alt="logo" src={cadLogo} />
            <div className="balance">{data.fiatBalance}</div>
            <div className="balanceTitle">CAD</div>
          </div>
        </div>
      </div>
      <div className="walletHeader">Net Worth</div>

      <div className="walletDetail">
        <div className="btcBalance">
          <img className="btcWalletLogo" alt="logo" src={cadLogo} />
          <div className="balance">{data.netWorth}</div>
          <div className="balanceTitle">CAD</div>
        </div>
      </div>
    </div>
  );
};

export default Wallets;
