import React, { FunctionComponent, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import InvoicesTable from './InvoiceTable'
import './scss/main.scss'
import * as serviceWorker from './serviceWorker'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { MoralisProvider } from 'react-moralis';

const appId = "GP48ud1cD27gHPTjMtn6LlJdbC2CwmT82ZnI0sGS"
const serverUrl = "https://ijvbdf4adeyg.moralis.io:2053/server"

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Router>
        <Switch>
          <Route exact path="/" children={<InvoicesTable />} />
          <Route path="/:invoiceNo" children={<App />} />
        </Switch>
      </Router>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
