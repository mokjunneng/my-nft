import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: { mnemonic: process.env.MNEMONIC },
    }
  }
};

export default config;
