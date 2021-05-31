import React, { FunctionComponent, useState } from 'react'
import InvoicePage from './components/InvoicePage'
import { useMoralis, useMoralisQuery, useNewMoralisObject } from 'react-moralis'
import Head from './Head';
import Row from './Row';
interface Invoice {
  title: string;
  clientName: string;
  invoiceDate: string;
}
interface Props {
  invoices: Invoice[];
}

const InvoicesTable: FunctionComponent<Props> = ({ invoices }) => {
  return (
    <table>
      <Head />
      <tbody>
        {invoices.map((invoice) => (
          <Row
            // key={i}
            title={invoice.title}
            clientName={invoice.clientName}
            invoiceDate={invoice.invoiceDate}
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
  const { fetch, data, isLoading } = useMoralisQuery("Invoices");
  const { isSaving, error, save } = useNewMoralisObject('Invoices');

  const newInvoice = () => {
    setInvoice(undefined)
    console.log(invoice)
  }

  const saveInvoice = () => {
     save({invoice, user})
  }

  console.log(isAuthenticated)
  console.log(data.length)
  if (data.length > 0 && isAuthenticated) {
    const _invoices:Invoice[] = data.map((d) => {
      return d.attributes.invoice;
    });
    console.log(invoice)
    return (
      <div className="app">
        <h1 className="center fs-30">React Invoice Generator</h1>
        <InvoicesTable invoices={_invoices} />
        <button onClick={newInvoice}>New</button>
        {/* <button onClick={saveInvoice}>Save</button>       */}
        
        <InvoicePage saveInvoice={ save({invoice, user})} data={invoice!==undefined?data[0].attributes.invoice:undefined} />
      </div>
    );
  } else return <div>
    <button onClick={() => authenticate()}>Authenticate</button>
    <button onClick={() => logout()}>Logout</button>
  Loading...
  </div>;
}

export default App
