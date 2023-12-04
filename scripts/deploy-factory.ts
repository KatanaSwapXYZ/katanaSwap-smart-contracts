import { ethers } from "hardhat";
import { factoryArgs } from "./arguments";


async function main() {
  const accounts = await ethers.getSigners()

  const contractDeploy = await ethers.deployContract("KatanaFactory", factoryArgs);

  await contractDeploy.waitForDeployment();

  console.log(`KatanaFactory was deployed to ${contractDeploy.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

