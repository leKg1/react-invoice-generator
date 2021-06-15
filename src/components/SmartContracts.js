import React, { useState, useEffect } from 'react';
import Moralis from 'moralis';
import { useMoralisQuery} from "react-moralis";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    InputGroup,
    InputLeftElement
  } from "@chakra-ui/react";
  import { SearchIcon } from '@chakra-ui/icons'

import { Link } from "react-router-dom";
import { abi } from "../abi"

const SmartContractList =  () => {
  const web3Lib = new Moralis.Web3();
  const [smartContractList, setSmartContractList] = useState([]);
  const limit = 10
  
  const { fetch, data, isLoading, isFetching } = useMoralisQuery("FreelanceToken",
  query => query.limit(limit),[limit], {live:true})

  useEffect(() => {
    const getData = async () => {
      const web3 = await Moralis.Web3.enable();
      const accounts = await web3.eth.getAccounts();
      const account1 = accounts[0];
      const newBalances = []
      for (let index = 0; index < data.length; index++) {
        let contract = Object.create(data[index].attributes);
        const ourFreelanceSmartContract = new web3.eth.Contract(abi, contract.smartContractAddress);
        ourFreelanceSmartContract.methods.name().call().then(name => {
          contract.name = name
          ourFreelanceSmartContract.methods.symbol().call().then(symbol => {
            contract.symbol = symbol
              ourFreelanceSmartContract.methods.decimals().call().then(decimals => {
              contract.decimals = decimals
                ourFreelanceSmartContract.methods.totalSupply().call().then(totalSupply => {
                  contract.totalSupply = totalSupply

                  ourFreelanceSmartContract.methods.totalStakes().call().then(totalStakes => {
                    contract.totalStakes = totalStakes
        
                  ourFreelanceSmartContract.methods.stakeOf(account1).call().then(stakeOf => {
                    contract.stakeOf = stakeOf

                  web3.eth.getBalance(contract.smartContractAddress).then(balance => {
                    contract.tokenBalance = balance
                    newBalances.push(contract)
                    setSmartContractList(newBalances)
                  })
                })
              })
           })
          })
        })
        })
      }
    }
    getData() 
  }, [data]);


  // console.log('generating smartcontractlist', smartContractList)
  const contractRows = smartContractList.map((contract, i) => {
    return (
      <Tr key={i}>
        <Td><Link to={"/" + contract.smartContractAddress}>{contract.name}</Link></Td>
        <Td><Link to={"/" + contract.smartContractAddress}>{contract.symbol}</Link></Td>
        <Td><Link to={"/" + contract.smartContractAddress}>{contract.decimals}</Link></Td>
        <Td><Link to={"/" + contract.smartContractAddress}>{contract.smartContractAddress}</Link></Td>
        <Td><Link to={"/" + contract.smartContractAddress}>{web3Lib?web3Lib.utils.fromWei(contract.tokenBalance, "ether"):'loading'} {contract.symbol}</Link></Td>
        <Td><Link to={"/" + contract.smartContractAddress}>{web3Lib?web3Lib.utils.fromWei(contract.totalSupply, "ether"):'loading'}</Link></Td>
        <Td><Link to={"/" + contract.smartContractAddress}>{web3Lib?web3Lib.utils.fromWei(contract.stakeOf, "ether"):'loading'} {contract.symbol}</Link></Td>
        <Td><Link to={"/" + contract.smartContractAddress}>{web3Lib?web3Lib.utils.fromWei(contract.totalStakes, "ether"):'loading'} {contract.symbol}</Link></Td>
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
    <Input placeholder="Search the smart contracts" />
  </InputGroup>

    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Symbol</Th>
          <Th>Decimals</Th>
          <Th>TokenAddress</Th>
          <Th>Balance</Th>
          <Th>TotalSupply</Th>
          <Th>MyStake</Th>
          <Th>TotalStakes</Th>
        </Tr>
      </Thead>
      <Tbody>
        {contractRows}
      </Tbody>
    </Table>
    </div>
  )
}
export default SmartContractList