import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";

import dotenv from "dotenv";
import "hardhat-abi-exporter";
import "hardhat-gas-reporter";
import "@nomicfoundation/hardhat-toolbox";
import { getHardhatConfigNetworks } from "@zetachain/networks";
import "@zetachain/toolkit/tasks";

dotenv.config();

const chainIds = {
  hardhat: 31337,
  mainnet: 1,
  goerli: 5,
  base_mainnet: 8453,
  base_goerli: 84531,
  opbnb_mainnet: 204,
  scrollSepolia: 534351,
  manta_testnet: 3441005,
  mode: 34443,
  manta: 169,
  scroll_mainnet: 534352
};

const settings = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

// Ensure that we have all the environment variables we need.
const accountPrivateKey: string = process.env.PRIVATE_KEY || "";

function createTestnetConfig(network: keyof typeof chainIds): NetworkUserConfig {
  let nodeUrl = ''

  switch (network) {
    case "base_mainnet":
      nodeUrl = 'https://developer-access-mainnet.base.org';
      break;
    case "base_goerli":
      nodeUrl = 'https://goerli.base.org';
      break;
    case "opbnb_mainnet":
      nodeUrl = 'https://opbnb-mainnet-rpc.bnbchain.org';
      break;
    case "manta":
      nodeUrl = 'https://pacific-rpc.manta.network/http';
      break;
    case "manta_testnet":
      nodeUrl = 'https://manta-testnet.calderachain.xyz/http';
      break;
    case "mode":
      nodeUrl = 'https://mainnet.mode.network/';
      break;
    case "scrollSepolia":
      nodeUrl = 'https://sepolia-rpc.scroll.io';
      break;
    case "scroll_mainnet":
      nodeUrl = 'https://rpc.scroll.io';
      break;
  }

  return {
    chainId: chainIds[network],
    url: nodeUrl,
    accounts: [`${accountPrivateKey}`],
    gasPrice: 100000000,
  };
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: '0.6.6', settings },
      { version: '0.6.0', settings },
      { version: '0.5.16', settings },
      { version: '0.8.19', settings },
      { version: '0.8.18', settings }
    ],
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v6",
  },
  gasReporter: {
    coinmarketcap: process.env.REPORT_GAS_COINMARKETCAP_API_KEY,
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
  },
  abiExporter: {
    path: './abi/exchange',
    // pretty: true,
    clear: false,
  },
  etherscan: {
    apiKey: {
      "base_goerli": "PLACEHOLDER_STRING",
      "scrollSepolia": 'YourApiKeyToken',
     },
    customChains: [
      {
        network: "base_goerli",
        chainId: 84531,
        urls: {
         apiURL: "https://api-goerli.basescan.org/api",
         browserURL: "https://goerli.basescan.org"
        }
      },
      {
        network: "base_mainnet",
        chainId: 8453,
        urls: {
         apiURL: "https://api.basescan.org/api",
         browserURL: "https://basescan.org"
        }
      },
      {
        network: "opbnb_mainnet",
        chainId: 204,
        urls: {
         apiURL: "https://api.basescan.org/api",
         browserURL: "https://mainnet.opbnbscan.com"
        }
      },
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.dev/api',
          browserURL: 'https://sepolia.scrollscan.dev/',
        },
      },
    ]
  },
};

if (accountPrivateKey) {
  config.networks = {
    ...getHardhatConfigNetworks(),
    mainnet: createTestnetConfig("mainnet"),
    goerli: createTestnetConfig("goerli"),
    base_goerli: createTestnetConfig("base_goerli"),
    base_mainnet: createTestnetConfig("base_mainnet"),
    manta_testnet: createTestnetConfig("manta_testnet"),
    manta: createTestnetConfig("manta"),
    mode: createTestnetConfig("mode"),
    opbnb_mainnet: createTestnetConfig("opbnb_mainnet"),
    scrollSepolia: createTestnetConfig("scrollSepolia"),
    scroll_mainnet: createTestnetConfig("scroll_mainnet"),
  };
}

config.networks = {
  ...config.networks,
  hardhat: {
    chainId: 1337,
  },
};

export default config;
