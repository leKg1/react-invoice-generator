// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  await hre.run('compile');

  const accounts = await ethers.getSigners();
  console.log("firstAccounts", accounts[0].address)

  const balnceAccount0 = (await accounts[0].getBalance()).toString()
  console.log("firstAccountBalance",balnceAccount0)

  // We get the contract to deploy
  const DeLive = await hre.ethers.getContractFactory("DeLive");
  const delive = await DeLive.deploy("DeLive",
  "DeLi",
  "1000000000000000000000000");

  await delive.deployed();

  console.log("DeLive deployed to:", delive.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
