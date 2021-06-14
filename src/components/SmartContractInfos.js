import React, { useState, useEffect } from 'react';
import {
    Input,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button
  } from "@chakra-ui/react";
  import Moralis from 'moralis';
  import { abi } from "../abi"
  import { bytecode } from '../bytecode';

const SmartContractInfos = (props) => {
  
    const [ourFreelanceSmartContract, setOurFreelanceSmartContract] = useState(undefined) //this is the smartContractInstance
    const [smartContractBalanceETH, setSmartContractBalanceETH] = useState(0)
    const [smartContractBalanceFREE, setSmartContractBalanceFREE] = useState(0)
    
    const [tokenName, setTokenName] = useState("")
    const [tokenSymbol, setTokenSymbol] = useState("")
    const [tokenInitialSupply, setTokenInitialSupply] = useState("0")
    const [totalStakes, setTotalStakes] = useState(0)
    const [totalRewards, setTotalRewards] = useState(0)

    //myAccount
    const [address, setAddress] = useState("") //our account address
    const [myEthBalance, setMyEthBalance] = useState(0)
    const [myFreeBalance, setMyFreeBalance] = useState(0)
   
    const [myFreeStake, setMyFreeStake] = useState(0)
    const [myFreeRewards, setMyFreeRewards] = useState(0)
   
    const [amountToStake, setAmountToStake] = useState(0)
    const [amountToUnstake, setAmountToUnstake] = useState(0)

  useEffect(()=>{
      if(!props.tokenAddress) return
      getAdrresses()
      if (address != undefined && address != "" && ourFreelanceSmartContract!=undefined) {
          showNameAndAddress()
          getETHBalances()
          getFREEBalances()
          getStakeInfo()
      }
},[address])

const getAdrresses = async () => {
  const web3 = await Moralis.Web3.enable();
  const ourFreelanceSmartContract = new web3.eth.Contract(abi, props.tokenAddress);
  setOurFreelanceSmartContract(ourFreelanceSmartContract);

  const accounts = await web3.eth.getAccounts();
  const account1 = accounts[0];
  setAddress(account1);        
}

const showNameAndAddress = async () => {

    const newTokenName = await ourFreelanceSmartContract.methods.name().call()
    const newTokenSymbol = await ourFreelanceSmartContract.methods.symbol().call()
    const newTokenTotalSupply = await ourFreelanceSmartContract.methods.totalSupply().call()
    setTokenName(newTokenName)
    setTokenSymbol(newTokenSymbol)
    setTokenInitialSupply(newTokenTotalSupply)
}

const getETHBalances = async () => {
    const web3 = await Moralis.Web3.enable();
    const accounts = await web3.eth.getAccounts();
    web3.eth.getBalance(accounts[0], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        setMyEthBalance(web3.utils.fromWei(result, "ether") + " ETH");
      }
    })
    web3.eth.getBalance(props.tokenAddress, function (err, result) {
        if (err) {
          console.log(err);
        } else {
            setSmartContractBalanceETH(web3.utils.fromWei(result, "ether") + " ETH");
        }
      })   
}

const getFREEBalances = async () => {
    const web3 = await Moralis.Web3.enable();
    //FREE Balance of the address of current account
    const userAccountBalance = await ourFreelanceSmartContract.methods.balanceOf(address).call()
    setMyFreeBalance(web3.utils.fromWei(userAccountBalance, "ether") + " FREE")

    //FREE Balance of the address of smartContractAddress account
    const smartContractFreeBalance = await ourFreelanceSmartContract.methods.balanceOf(props.tokenAddress).call()
    setSmartContractBalanceFREE(web3.utils.fromWei(smartContractFreeBalance, "ether") + " FREE")
}

const getStakeInfo = async () => {
    const web3 = await Moralis.Web3.enable();
        
    const totalStakes = await ourFreelanceSmartContract.methods.totalStakes().call()
    setTotalStakes(web3.utils.fromWei(totalStakes, "ether") + " FREE")
    
    const myStakes = await ourFreelanceSmartContract.methods.stakeOf(address).call()
    setMyFreeStake(web3.utils.fromWei(myStakes, "ether") + " FREE")
    
    const totalRewards = await ourFreelanceSmartContract.methods.totalRewards().call()
    setTotalRewards(web3.utils.fromWei(totalRewards, "ether") + " FREE")

    const balance = await ourFreelanceSmartContract.methods.balanceOf(address).call()
    setMyFreeBalance(web3.utils.fromWei(balance, "ether") + " FREE")

    const myRewards = await ourFreelanceSmartContract.methods.rewardOf(address).call()
    setMyFreeRewards(web3.utils.fromWei(myRewards, "ether") + " FREE")
}

  return (
    <div>
            <p>&nbsp;</p>
            <h1>Freelance Smart Contract</h1>
            <Table variant="simple">
                <Tbody>
                    <Tr><Td>Contract Address:</Td><Td>{props.tokenAddress}</Td></Tr>
                    <Tr><Td>TokenName:</Td><Td>{tokenName}</Td></Tr>
                    <Tr><Td>TokenSymbol:</Td><Td>{tokenSymbol}</Td></Tr>
                    <Tr><Td>TotalSupply:</Td><Td isNumeric>{window.web3.utils!=undefined?window.web3.utils.fromWei(tokenInitialSupply, "ether"):0}</Td></Tr>
                    <Tr><Td>Balance MEL:</Td><Td isNumeric>{smartContractBalanceFREE}</Td></Tr>
                    <Tr><Td>Balance ETH:</Td><Td isNumeric>{smartContractBalanceETH}</Td></Tr>
                    <Tr><Td>Total Stakes MEL:</Td><Td isNumeric>{totalStakes}</Td></Tr>
                    <Tr><Td>Total Rewards MEL:</Td><Td isNumeric>{totalRewards}</Td></Tr>
                    
                </Tbody>
            </Table>
            <p>&nbsp;</p>
    </div>
  );
}

  export default SmartContractInfos