import { ethers } from "hardhat";
import { routerArgs } from "./arguments";


async function main() {
  const accounts = await ethers.getSigners()

  const contractDeploy = await ethers.deployContract("KatanaRouter", routerArgs);

  await contractDeploy.waitForDeployment();

  console.log(`KatanaRouter was deployed to ${contractDeploy.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
