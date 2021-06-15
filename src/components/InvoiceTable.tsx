import React, { FunctionComponent } from 'react'
import { useMoralisQuery } from 'react-moralis'
import { Link } from "react-router-dom";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Button
} from "@chakra-ui/react";
import Head from './Head';

interface Props {
  tokenAddress: string
  // editInvoiceFunc: void
}

const InvoicesTable: FunctionComponent<Props> = ({ tokenAddress }) => {

  console.log('tokenAddress', tokenAddress)
  const { data, isLoading } = useMoralisQuery("Invoices", query => query
    .equalTo("invoice.tokenAddress", tokenAddress), [tokenAddress], { live: true })

  const deleteInvoice = async (i: any) => await i.destroy()

  const invoiceRows = data.map((d) => {
    const invoice = d.attributes.invoice
    return (
      <Tr key={d.id}>
        <Td><Link to={"/" + tokenAddress + "/" + d.id} >{invoice.invoiceTitle}</Link></Td>
        <Td><Link to={"/" + tokenAddress + "/" + d.id}>{invoice.companyName}</Link></Td>
        <Td><Link to={"/" + tokenAddress + "/" + d.id}>{invoice.clientName}</Link></Td>
        <Td><Link to={"/" + tokenAddress + "/" + d.id}>{invoice.invoiceDate}</Link></Td>
        {/* <Button onClick={ deleteInvoice(d)}>Delete</Button> */}
      </Tr>
    )
  })

  return (
    <div>
      <Table>
        <Head />
        <Tbody>
          {invoiceRows}
        </Tbody>
      </Table>
    </div>
    );
  };

  export default InvoicesTable