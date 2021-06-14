import React, { useState } from 'react';
import {
  Input,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  ErrorMessage
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import Moralis from 'moralis';
import { useMoralis,useNewMoralisObject } from "react-moralis";
import { abi } from "../abi"
import { bytecode } from '../bytecode';

const DeploySmartContract = () => {
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenInitialSupply, setTokenInitialSupply] = useState(0)

  const [smartContractAddress, setSmartContractAddress] = useState("nicos addresse");

  const { user } = useMoralis();
  const { isSaving, error, save } = useNewMoralisObject('FreelanceToken');
  let history = useHistory();

  const registerSmartContract = () => {
        console.log('registerSmartContract',smartContractAddress)
        save({smartContractAddress, user}).then(()=>{
          history.push("/"+smartContractAddress);
        })
  }
  const deployFreelanceToken = async () => {

    const web3 = await Moralis.Web3.enable();
    const accounts = await web3.eth.getAccounts();
    const account1 = accounts[0];
    const ourMelalieSmartContract = new web3.eth.Contract(abi);

    try {
        const contract = await ourMelalieSmartContract
        .deploy({data: bytecode,arguments: [tokenName, tokenSymbol, tokenInitialSupply],})
        .send({from: account1,gas: 4000000,});
        console.log(contract)
        console.log(contract.options)
        setSmartContractAddress(contract.options.addresss)
        
        alert("successfully deployed new contract!", smartContractAddress); //TODO please beautify with Chakra
        save({smartContractAddress, user}).then(()=>{
          history.push("/"+smartContractAddress);
        })
      } catch (error) {
        alert(error);
      }
  }

  return (
    <div>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td><Input placeholder="Token name" onChange={(e) => { setTokenName(e.target.value); }} /></Td>
            <Td><Input placeholder="Token symbol" onChange={(e) => { setTokenSymbol(e.target.value); }} /></Td>
            <Td><Input placeholder="InitialSupply" onChange={(e) => { setTokenInitialSupply(e.target.value); }} /></Td>
            <Td><Button onClick={deployFreelanceToken}>Deploy new Freelance Staking Token</Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td><Input placeholder="SmartContract Address" onChange={(e) => { setSmartContractAddress(e.target.value); }} /></Td>
            <Td><Button disabled={isSaving} onClick={registerSmartContract}>Register Freelance Staking Token Contract</Button>
            </Td>
          </Tr>
          <Tr>
            <Td colSpan={2}>{error && <ErrorMessage error={error} />}</Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  );
}

  export default DeploySmartContract