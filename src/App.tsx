import React, { FunctionComponent, useState, useEffect } from 'react'
import InvoicePage from './components/InvoicePage'
import InvoicesTable from './InvoiceTable'
import { useMoralis, useMoralisQuery, useNewMoralisObject } from 'react-moralis'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

interface Invoice {
  invoiceTitle: string;
  clientName: string;
  invoiceDate: string;
  // data: any;
}



function App() {

  //let { invoiceNo } = useParams()
  return (
    <div className="app">
      <h1 className="center fs-30">React Invoice Generator</h1>
      {/* <button onClick={() => logout()}>Logout</button> */}
      <InvoicesTable />
      <Link to="/" className="btn btn-primary">New Invoice </Link>

      <Route path="/:invoiceNo" children={
        <InvoicePage />}
      />
    </div>
  );
}

export default App
