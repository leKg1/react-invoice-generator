import React, { FunctionComponent, useState, useEffect } from 'react'
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
  // data: any;
}

const InvoicesTable: FunctionComponent = () => {
  const { fetch, data, isLoading } = useMoralisQuery("Invoices")
  return (
    <table>
      <Head />
      <tbody>
        {data.map((d) => (
          <Row
            data={d}
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

  const [invoice, setInvoice] = useState<any>()
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    authError,
    logout,
    user,
    isAuthUndefined,
  } = useMoralis();
  let { invoiceNo } = useParams()
  const [_invoiceNo, set_InvoiceNo] = useState<string | undefined>(invoiceNo)
  /*
  const { fetch, data, isLoading } = useMoralisQuery("Invoices",
  query =>
    query
    .equalTo("invoice.invoiceTitle", invoiceNo));
  const { isSaving, error, save } = useNewMoralisObject('Invoices');
  console.log("invoiceNo", invoiceNo)
  console.log("data",data)
  console.log("isLoading",isLoading) */

    const newInvoice = () => {

    }

    useEffect(() => {
      set_InvoiceNo(invoiceNo)
    }, [_invoiceNo]) 

    if (isAuthenticated) {

    console.log("rerender App.tsx invoiceNo",invoiceNo)
    return (
      <div className="app">
        <h1 className="center fs-30">React Invoice Generator</h1>
        <button onClick={() => logout()}>Logout</button>
        <InvoicesTable />
        <Link to="/" className="btn btn-primary">New Invoice </Link>

          <Route path="/:invoiceNo" children={<InvoicePage 
           invoiceNo={invoiceNo}
           user={user}
          //  data={(data!==undefined && data.length> 0)?data[0].attributes.invoice:undefined} 
           />} />       
      </div>
    );
  } else { return !isAuthenticated?(<div>
    <button onClick={() => authenticate()}>Authenticate</button>
  Loading...
  </div>):<div>
    <Link to="/" className="btn btn-primary">New Invoice </Link>
    <InvoicesTable /> 
    </div>
  }
}

export default App
