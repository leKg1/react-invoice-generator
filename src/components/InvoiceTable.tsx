import React, { FunctionComponent } from 'react'
import { useMoralisQuery } from 'react-moralis'
import { Link } from "react-router-dom";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import Head from './Head';
import { SearchIcon } from '@chakra-ui/icons'

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
        <Td><Link to={"/invoices/" + invoice.invoiceTitle} >{invoice.invoiceTitle}</Link></Td>
        <Td><Link to={"/invoices/" + invoice.invoiceTitle}>{invoice.companyName}</Link></Td>
        <Td><Link to={"/invoices/" + invoice.invoiceTitle}>{invoice.clientName}</Link></Td>
        <Td><Link to={"/invoices/" + invoice.invoiceTitle}>{invoice.invoiceDate}</Link></Td>
        <Button onClick={()=>deleteInvoice(d)}>Delete</Button>
      </Tr>
    )
  })

  return (
    <div>
      <InputGroup>
    <InputLeftElement
      pointerEvents="none"
      color="gray.300"
      fontSize="1.2em"
      >
      <SearchIcon color="green.500" />
      </InputLeftElement>
    
    <Input placeholder="Search the invoices" />
  </InputGroup>
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