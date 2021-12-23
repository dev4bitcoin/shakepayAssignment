import http from "./httpService";

import rates from "../Data/rates.json";
import transactions from "../Data/transactionHistory.json";

const baseApiUrl = "https://api.shakepay.co";
const ratesEndpoint = `${baseApiUrl}/rates`;
const transactionHistoryEndpoint =
  "https://shakepay.github.io/programming-exercise/web/transaction_history.json";

export function getRates() {
  return rates;
  //return http.get(`${ratesEndpoint}`);
}

export function getTransactionHistory() {
  return transactions;
  //return http.get(`${transactionHistoryEndpoint}`);
}
