import React, { FunctionComponent, useState, useEffect } from 'react'
import { Button, Heading, Select} from "@chakra-ui/react"
import { useMoralis } from 'react-moralis'
import detectEthereumProvider from '@metamask/detect-provider';

import SmartContractList from './components/SmartContractList';
import InvoiceTable from './components/InvoiceTable';
import DeploySmartContract from './components/DeploySmartContract';
import InvoicePage from './components/InvoicePage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory
} from "react-router-dom";

interface Invoice {
  invoiceTitle: string;
  clientName: string;
  invoiceDate: string;
  // data: any;
}

export const ETHEREUM_RINKEBY = {
  chainId: '0x4',
}
export const ETHEREUM_ROPSTEN = {
  chainId: '0x3',
}
export const ETHEREUM_KOVAN = {
  chainId: '0x2A',
}
export const ETHEREUM_GOERLI = {
  chainId: '0x5',
}

export const MATIC_MUMBAI = {
  chainId: '0x13881',
  chainName: 'Mumbai Testnet',
  nativeCurrency: {
      name: 'Mumbai Testnet',
      symbol: 'MATIC',
      decimals: 18
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  blockExplorerUrls: ['https://mumbai-explorer.matic.today']
}

export const MOONBEAM_ALPHA = {
  chainId: '0x507',
  chainName: 'Moonbean Alpha',
  nativeCurrency: {
      name: 'Moonbean Alpha',
      symbol: 'DEV',
      decimals: 18
  },
  rpcUrls: ['https://rpc.testnet.moonbeam.network'],
  blockExplorerUrls: ['https://moonbase-blockscout.testnet.moonbeam.network/']
}

function App() {
  const MODE_NEW_CONTRACT = "new_contract"
  const MODE_LIST_CONTRACTS = "list_contracts"
  const MODE_EDIT_INVOICES = "edit_invoices"
  const MODE_LIST_INVOICES = "list_invoices"

  const [mode, setMode] = useState(MODE_LIST_CONTRACTS)
  const [invoiceMode, setInvoiceMode] = useState(MODE_LIST_INVOICES)
  const [contractAddress, setContractAddress] = useState("")
  const [network, setNetwork] = useState("")

  const { authenticate, isAuthenticated, isAuthenticating, logout, } = useMoralis();
  const changeMode = (mode: string) => setMode(mode)
  const changeInvoiceMode = (mode: string) => setInvoiceMode(mode)
  const { invoiceNo, tokenAddress } = useParams<{ invoiceNo: string, tokenAddress: string }>();
  console.log('tokenAddress in url:',tokenAddress)
  console.log('invoiceNo in url:',invoiceNo) 

  const history = useHistory();

  const addNetwork = async (param: any) => {
    const provider:any = await detectEthereumProvider();
    
    if (provider) {
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [param]
        })
        .catch((error: any) => {
          console.log(error)
        })
        const accounts = await provider.request({ method: 'eth_requestAccounts' })
        console.log("accounts",accounts)

        const chainId = await provider.request({
          method: 'eth_chainId'
        })
        console.log("chainId",chainId)
    } else {
        console.log('Please install MetaMask!');
        return
    }
}

  const switchNetwork = async (param: any) => {
    const provider:any = await detectEthereumProvider();
    
    if (provider) {
        provider.request({
          method: 'wallet_switchEthereumChain',
          params: [param]
        })
        .catch((error: any) => {
          console.log(error)
        })
        const accounts = await provider.request({ method: 'eth_requestAccounts' })
        console.log("accounts",accounts)

        const chainId = await provider.request({
          method: 'eth_chainId'
        })
        console.log("chainId",chainId)
    } else {
        console.log('Please install MetaMask!');
        return
    }
}
  
  useEffect(() => {
    if(network==="0x4"){
      switchNetwork(ETHEREUM_RINKEBY)
    }else if(network==="0x3"){
      switchNetwork(ETHEREUM_ROPSTEN)
    }else if(network==="0x2A"){
      switchNetwork(ETHEREUM_KOVAN)
    }else if(network==="0x5"){
      switchNetwork(ETHEREUM_GOERLI)
    }else if(network==="0x13881"){
      addNetwork(MATIC_MUMBAI)
      // }else switchNetwork(MATIC_MUMBAI)
    }else if(network==="0x507"){
      addNetwork(MOONBEAM_ALPHA)
    }
  }, [network])
  console.log("network",network)

  useEffect(() => {
    if(tokenAddress!==undefined)setContractAddress(tokenAddress)
  }, [tokenAddress])

  useEffect(() => {
    invoiceNo?changeInvoiceMode(MODE_EDIT_INVOICES):changeInvoiceMode(MODE_LIST_INVOICES)
  }, [invoiceNo])
  
  const LogoutButton = () => {return  <Button colorScheme="teal" onClick={() => logout()}>Logout</Button>}
  const displayContractList = () => {
    return (
      <div>
        <LogoutButton/>
        <Button colorScheme="purple" onClick={() => changeMode(MODE_NEW_CONTRACT)}>Deploy Token Project</Button>
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Contracts</Heading> 
        <SmartContractList tokenAddress={tokenAddress} />
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Invoices</Heading>
        <p>&nbsp;</p>
        {invoiceMode === MODE_LIST_INVOICES && <Button colorScheme="purple" onClick={() => changeInvoiceMode(MODE_EDIT_INVOICES)}>New Invoice</Button>}
        {invoiceMode === MODE_EDIT_INVOICES && <Button colorScheme="purple" onClick={() => {
          changeInvoiceMode(MODE_LIST_INVOICES)
          history.push(`/contracts/${contractAddress}`)
          }}>List Invoices</Button>}
        <p>&nbsp;</p>
      {/* //editInvoiceFunc={() => changeInvoiceMode(MODE_EDIT_INVOICES) */}
        {invoiceMode === MODE_LIST_INVOICES && <InvoiceTable tokenAddress={tokenAddress}/>}
        {invoiceMode === MODE_EDIT_INVOICES &&  <div className="app"> 
          <h1 className="center fs-30">React Invoice Generator</h1>
        <InvoicePage tokenAddress={tokenAddress} invoiceNo={invoiceNo}/></div>}
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
  } else return (
    <div>
    <Button isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate</Button>
    <Select placeholder="Select network" onChange={(e)=>setNetwork(e.target.value)}>
     <option value="0x4">Ethereum(Rinkeby)</option>
     <option value="0x3">Ethereum(Ropsten)</option>
     <option value="0x2A">Ethereum(Kovan)</option>
     <option value="0x5">Ethereum(Goerli)</option>
     <option value="0x13881">Matic(Mumbai)</option>
     <option value="0x507">Polkadot(Moonbeam)</option>
    </Select>
    </div>
  )
}

export default App
