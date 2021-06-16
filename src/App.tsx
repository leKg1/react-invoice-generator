import React, { FunctionComponent, useState, useEffect } from 'react'
import { Button, Heading} from "@chakra-ui/react"
import { useMoralis } from 'react-moralis'

import SmartContractList from './components/SmartContractList';
import InvoiceTable from './components/InvoiceTable';
import DeploySmartContract from './components/DeploySmartContract';
import InvoicePage from './components/InvoicePage'

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
  const MODE_NEW_CONTRACT = "new_contract"
  const MODE_LIST_CONTRACTS = "list_contracts"
  const MODE_EDIT_INVOICES = "edit_invoices"
  const MODE_LIST_INVOICES = "list_invoices"

  const [mode, setMode] = useState(MODE_LIST_CONTRACTS)
  const [invoiceMode, setInvoiceMode] = useState(MODE_LIST_INVOICES)

  const { authenticate, isAuthenticated, isAuthenticating, logout, } = useMoralis();
  const changeMode = (mode: string) => setMode(mode)
  const changeInvoiceMode = (mode: string) => setInvoiceMode(mode)
  const { invoiceNo, tokenAddress } = useParams<{ invoiceNo: string, tokenAddress: string }>();
  console.log('tokenAddress in url:',tokenAddress)
  // console.log('invoiceNo in url:',invoiceNo)  
  const LogoutButton = () => {return  <Button colorScheme="teal" onClick={() => logout()}>Logout</Button>}
  const displayContractList = () => {
    return (
      <div className="app">
        <LogoutButton/>
        <Button colorScheme="purple" onClick={() => changeMode(MODE_NEW_CONTRACT)}>Deploy Token Project</Button>
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Contracts</Heading> 
        <SmartContractList />
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Invoices</Heading>
        <p>&nbsp;</p>
        {invoiceMode === MODE_LIST_INVOICES && <Button colorScheme="purple" onClick={() => changeInvoiceMode(MODE_EDIT_INVOICES)}>New Invoice</Button>}
        {invoiceMode === MODE_EDIT_INVOICES && <Button colorScheme="purple" onClick={() => changeInvoiceMode(MODE_LIST_INVOICES)}>List Invoices</Button>}
        <p>&nbsp;</p>
      {/* //editInvoiceFunc={() => changeInvoiceMode(MODE_EDIT_INVOICES) */}
        {invoiceMode === MODE_LIST_INVOICES && <InvoiceTable tokenAddress={tokenAddress}/>}
        {invoiceMode === MODE_EDIT_INVOICES &&  <div className="app"><h1 className="center fs-30">React Invoice Generator</h1><InvoicePage tokenAddress={tokenAddress}/></div>}
      </div>
    )
  } 

  const displayNewContract = () => {
    return (
      <div>
        <LogoutButton />
        <Button colorScheme="purple" onClick={() => changeMode(MODE_LIST_CONTRACTS)}>My Token Projects</Button>
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Deploy New Staking Token</Heading>
        <DeploySmartContract />
      </div>
    )
}
  //let { invoiceNo } = useParams()
  console.log('invoiceNo',invoiceNo)
  console.log('tokenAddress',tokenAddress)
  if (isAuthenticated) {
    return (
      <div>
        <Heading textAlign="center" color="gray.700">Welcome to DeLive (DeLi)</Heading>
        {mode===MODE_NEW_CONTRACT && displayNewContract()}
        {mode===MODE_LIST_CONTRACTS && displayContractList()}
        <p>&nbsp;</p>
      </div>
    )
  } else return <Button isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate</Button>
}

export default App
