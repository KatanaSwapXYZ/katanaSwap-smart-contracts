import { ethers } from "hardhat";


async function main() {
  const accounts = await ethers.getSigners()

  const contractDeploy = await ethers.deployContract("KatanaSwap", ['']);

  await contractDeploy.waitForDeployment();

  console.log(`KatanaSwap was deployed to ${contractDeploy.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});