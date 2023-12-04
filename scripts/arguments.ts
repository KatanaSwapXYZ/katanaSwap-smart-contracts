import * as ethers from "ethers";

// load env file
import dotenv from "dotenv";
dotenv.config();

// load wallet private key from env file
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const wallet = new ethers.Wallet(PRIVATE_KEY);

const factoryAddress = process.env.CONTRACT_ADDRESS_FACTORY || "";
const tokenPlatformAddress = process.env.CONTRACT_ADDRESS_EXCHANGE_TOKEN || ""; 
const farmAddress = process.env.CONTRACT_ADDRESS_FARMV2 || "";
const WETH = "";


const factoryArgs = [
  wallet.address,
]

const routerArgs = [
  factoryAddress,
  WETH,
]

const mockArgs = [
  "test",
  "test",
]

export {
  factoryArgs,
  routerArgs,
  mockArgs,
}

// export default [
//   // ...factoryArgs
//   // ...routerArgs
//   ...mockArgs
// ]
