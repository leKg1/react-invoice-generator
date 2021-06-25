const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DeLive", function() {

  const usdtAbi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

  it("Should send usdt from smart contract", async function() {

    const provider = new ethers.providers.getDefaultProvider("");
    // const deLiTokenAddressWithUsdt = "0xa2a305b7fcc4cbc4353c29990069e5df24958cf2"
    const deLiTokenAddressWithUsdt = "0xa85D33bc208E741a70EaeDD7375fcE76F19ba40E"
    const metamaskAccWithUsdt = "0x0c9D471976833dC2E910527163DBACf780D30DFF"
    const usdtAddress = "0xd92e713d051c37ebb2561803a3b5fbabc4962431"  // usdt rinkeby
    const accounts = await ethers.getSigners();
    const account1 = accounts[0].address;
    console.log("firstAccounts", account1)
    const balnceAccount0 = (await accounts[0].getBalance()).toString()
    console.log("firstAccountBalance",balnceAccount0)

    // Metamask address balance
    const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
    const usdtBalanceOfMetamaskAcc = await usdtContract.balanceOf(metamaskAccWithUsdt);
    console.log('USDT balance of metamask ',usdtBalanceOfMetamaskAcc.toString())

    //DeLi Address balance
    const usdtBalanceOfDeLiTokenAddress = await usdtContract.balanceOf(deLiTokenAddressWithUsdt);
    console.log('USDT balance of smart contract ',usdtBalanceOfDeLiTokenAddress.toString())

    //Sending USDT
    const DeLive = await ethers.getContractFactory("DeLive");
    const delive = await DeLive.attach(deLiTokenAddressWithUsdt);
    const sendUsdtFromDeLi = await delive.sendUSDT(account1,1000000,{from: account1, gasLimit: 4000000,})
    console.log("sending usdt...", sendUsdtFromDeLi)

    // const usdtBalanceOfMetamaskAcc2 = await usdtContract.balanceOf(metamaskAccWithUsdt);
    // console.log('USDT balance of metamask ',usdtBalanceOfMetamaskAcc2.toString())

    // const usdtBalanceOfDeLiTokenAddress2 = await usdtContract.balanceOf(deLiTokenAddressWithUsdt);
    // console.log('USDT balance of smart contract ',usdtBalanceOfDeLiTokenAddress2.toString())

  });
});
