import { MintBattlegroundsCardNFTRequest } from "@/models/index";
import { ethers } from "ethers";
const nftAbi = require("../../artifacts/contracts/BattlegroundsCardNFT.sol/BattlegroundsCardNFT.json");

export class NFTService {
  provider: ethers.providers.BaseProvider | null = null;
  contract: ethers.Contract | null = null;
  constructor(
    private readonly address: string,
    private readonly networkName: string = "sepolia"
  ) {
    this.provider = ethers.getDefaultProvider(this.networkName);
    this.contract = new ethers.Contract(
      this.address,
      nftAbi.abi,
      this.provider
    );
  }

  async mintCard(req: MintBattlegroundsCardNFTRequest) {
    const {
      name,
      minionType,
      baseAttackStat,
      baseHealthStat,
      tavernTier,
      tokenUri,
    } = req;
    if (this.contract) {
      await this.contract.mintCard(
        name,
        minionType,
        baseAttackStat,
        baseHealthStat,
        tavernTier,
        tokenUri
      );
    }
  }
}
