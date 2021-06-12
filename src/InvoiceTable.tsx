import React, { FunctionComponent, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery, useNewMoralisObject } from 'react-moralis'
import Head from './Head';
import Row from './Row';

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

  export default InvoicesTable