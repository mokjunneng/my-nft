import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

// TODO: Secure these secrets
const { alchemyApiKey, mnemonic } = require('./secrets.json');

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic },
    }
  }
};

export default config;
