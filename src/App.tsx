import React, { FunctionComponent, useState } from 'react'
import InvoicePage from './components/InvoicePage'
import { useMoralis, useMoralisQuery, useNewMoralisObject } from 'react-moralis'
import Head from './Head';
import Row from './Row';
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
}

const InvoicesTable: FunctionComponent = () => {
  const { fetch, data, isLoading } = useMoralisQuery("Invoices")
  return (
    <table>
      <Head />
      <tbody>
        {data.map((d) => (
          <Row
            // key={i}
            invoiceNo={d.attributes.invoice.invoiceTitle}
            clientName={d.attributes.invoice.clientName}
            invoiceDate={d.attributes.invoice.invoiceDate}
          />
        ))}
      </tbody>
    </table>
  );
};

function App() {
  const [invoice, setInvoice] = useState<Invoice>()
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    authError,
    logout,
    user,
    isAuthUndefined,
  } = useMoralis();
  // const { fetch, data, isLoading } = useMoralisQuery("Invoices")
  // const invoiceNo = "2021-001"
  let { invoiceNo } = useParams()


  const { fetch, data, isLoading } = useMoralisQuery("Invoices",
    query =>
      query
      .equalTo("invoice.invoiceTitle", invoiceNo));
  const { isSaving, error, save } = useNewMoralisObject('Invoices');

  const newInvoice = () => {
    setInvoice(undefined)
    console.log(invoice)
  }

  console.log("isAuthenticated", isAuthenticated)
  console.log("invoiceNo", invoiceNo)
  console.log("dataLength",data.length)
  if (data.length > 0 && isAuthenticated) {
    const _invoices:Invoice[] = data.map((d) => {
      return d.attributes.invoice;
    });
    console.log("data",data)
    return (
      <div className="app">
        <h1 className="center fs-30">React Invoice Generator</h1>
        <button onClick={() => logout()}>Logout</button>
        <InvoicesTable />
          <Route path="/:invoiceNo" children={<InvoicePage 
           save={save}
           user={user}
           data={(data!==undefined && data.length> 0)?data[0].attributes.invoice:undefined} 
           />} />       
      </div>
    );
  } else { return !isAuthenticated?(<div>
    <button onClick={() => authenticate()}>Authenticate</button>
  Loading...
  </div>):<div>
    <button onClick={newInvoice}>New Invoice</button>
    <InvoicesTable /> 
    </div>
  }
}

export default App
