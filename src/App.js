import React, { Fragment } from "react";
import Header from "./components/header";

import "./App.css";
import ChartContent from "./components/chartContent";
//import YourWallet from "./components/yourWallet";

function App() {
  return (
    <Fragment>
      <div className="App-content">
        <header>
          <Header />
        </header>
        <main>
          <ChartContent />
          {/* <YourWallet /> */}
        </main>
      </div>
    </Fragment>
  );
}

export default App;
