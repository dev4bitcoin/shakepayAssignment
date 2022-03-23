import { Currency } from "../enums/currency";
import { CurrencyConversionDirection as Direction } from "../enums/currencyConversionDirection";
import { TransactionType } from "../enums/transactionType";

export function getNetworthData(transactions, rates) {
  let cadBalance = 0;
  let btcBalance = 0;
  let btcFiat = 0;
  let ethFiat = 0;
  let ethBalance = 0;
  let btcTransactions = [];
  let ethTransactions = [];

  const sortedTransactions = transactions.sort(function (a, b) {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  sortedTransactions.forEach((transaction) => {
    if (transaction.direction === Direction.CREDIT) {
      if (transaction.currency === Currency.CAD) {
        cadBalance += transaction.amount;
      } else if (transaction.currency === Currency.BTC) {
        btcBalance += transaction.amount;
        btcFiat += transaction.amount * rates.BTC_CAD;
        btcTransactions.push({
          amount: btcFiat,
          date: transaction.createdAt,
        });
      } else if (transaction.currency === Currency.ETH) {
        ethBalance += transaction.amount;
        ethFiat += transaction.amount * rates.ETH_CAD;
        ethTransactions.push({
          amount: ethFiat,
          date: transaction.createdAt,
        });
      }
    }
    if (transaction.direction === Direction.DEBIT) {
      if (transaction.currency === Currency.CAD) {
        cadBalance -= transaction.amount;
      } else if (transaction.currency === Currency.BTC) {
        btcBalance -= transaction.amount;
        btcFiat -= transaction.amount * rates.BTC_CAD;
        btcTransactions.push({
          amount: btcFiat,
          date: transaction.createdAt,
        });
      } else if (transaction.currency === Currency.ETH) {
        ethBalance -= transaction.amount;
        ethFiat -= transaction.amount * rates.ETH_CAD;
        ethTransactions.push({
          amount: ethFiat,
          date: transaction.createdAt,
        });
      }
    }

    if (transaction.type === TransactionType.CONVERSION) {
      if (transaction.currency === Currency.CAD) {
        if (transaction.to.currency === Currency.BTC) {
          cadBalance -= transaction.amount;
          btcBalance += transaction.to.amount;
          btcFiat += transaction.to.amount * rates.BTC_CAD;
          btcTransactions.push({
            amount: btcFiat,
            date: transaction.createdAt,
          });
        }
        if (transaction.to.currency === Currency.ETH) {
          cadBalance -= transaction.amount;
          ethBalance += transaction.to.amount;
          ethFiat += transaction.to.amount * rates.ETH_CAD;
          ethTransactions.push({
            amount: ethFiat,
            date: transaction.createdAt,
          });
        }
      }
      if (transaction.currency === Currency.BTC) {
        if (transaction.to.currency === Currency.CAD) {
          btcBalance -= transaction.amount;
          btcFiat -= transaction.amount * rates.BTC_CAD;
          cadBalance += transaction.to.amount;
          btcTransactions.push({
            amount: btcFiat,
            date: transaction.createdAt,
          });
        }
      }

      if (transaction.currency === Currency.ETH) {
        if (transaction.to.currency === Currency.CAD) {
          ethBalance -= transaction.amount;
          ethFiat -= transaction.amount * rates.ETH_CAD;
          cadBalance += transaction.to.amount;
          ethTransactions.push({
            amount: ethFiat,
            date: transaction.createdAt,
          });
        }
      }
    }
  });

  let netWorth =
    cadBalance + btcBalance * rates.BTC_CAD + ethBalance * rates.ETH_CAD;

  return {
    bitcoinBalance: Math.round(btcBalance * 100) / 100,
    ethereumBalance: Math.round(ethBalance * 100) / 100,
    bitcoinTransactions: btcTransactions,
    ethereumTransactions: ethTransactions,
    fiatBalance: Math.round(cadBalance * 100) / 100,
    netWorth: Math.round(netWorth * 100) / 100,
    btcFiat: Math.round(btcFiat),
    ethFiat: Math.round(ethFiat),
  };
}
