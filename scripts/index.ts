import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.getContractFactory("App");
  const app = await contract.deploy();
  const tx = await app.deployed();
  console.log(`deployed to: ${tx.address}`);
}

main();
