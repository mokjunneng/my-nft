import { PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
const nftAbi = require("../artifacts/contracts/BattlegroundsCardNFT.sol/BattlegroundsCardNFT.json");
import { BattlegroundsCardNFT } from "../src/models/index";
import { NFTPersistence } from "../src/services/persistence";
require("dotenv").config();

const dbClient = new PrismaClient({
  log: ['warn', 'error'],
});
const persistence = new NFTPersistence(dbClient);

// Listens to events emitted by the contract and update persistence
export async function startEventListener(address: string) {
  const providerUrl = "http://127.0.0.1:8545/"
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  // const provider = new ethers.providers.WebSocketProvider(
  //   `wss://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
  // );
  const contract = new ethers.Contract(address, nftAbi.abi, provider);
  console.log("Listening to contract of address: ", address);
  contract.on("Mint", async (tokenId, tokenURI, name, minionType, baseAttackStat, baseHealthStat, tavernTier) => {
    const mintedNft: BattlegroundsCardNFT = {
      tokenId: tokenId.toNumber(),
      tokenUri: tokenURI,
      name,
      minionType,
      baseAttackStat: baseAttackStat.toNumber(),
      baseHealthStat: baseHealthStat.toNumber(),
      tavernTier: tavernTier.toNumber()
    }
    console.log(JSON.stringify(mintedNft));
    await persistence.recordNft(mintedNft)
  });
}
