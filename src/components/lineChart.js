import { React, useState, useEffect } from "react";
import dateFormat from "dateformat";

import {
  Chart as ChartJS,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Currency } from "../enums/currency";

ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ currency, btcTransactions, ethTransactions }) => {
  const redraw = true;

  let options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 20,
        },
      },
    },
  };

  function getLabels() {
    let data = currency === Currency.BTC ? btcTransactions : ethTransactions;
    if (!data) {
      return [];
    }
    let mappedData = data.map((a) => dateFormat(a.date, "mmm dS yyyy"));
    return mappedData;
  }

  function getPrices() {
    let data = currency === Currency.BTC ? btcTransactions : ethTransactions;
    if (!data) {
      return [];
    }
    return data.map((a) => a.amount);
  }

  const data = {
    labels: getLabels(),
    datasets: [
      {
        data: getPrices(),
        borderColor: currency === Currency.BTC ? "#f2a900" : "#3c3c3d",
        backgroundColor:
          currency === Currency.BTC
            ? ["rgba(242, 169, 0, 0.2)"]
            : "rgba(192, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  return <Line options={options} data={data} redraw={redraw} />;
};

export default LineChart;
