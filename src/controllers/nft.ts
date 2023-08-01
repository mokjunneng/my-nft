import {
  BattlegroundsCardNFT,
  MintBattlegroundsCardNFTRequest,
} from "@/models/index";
import { NFTService } from "@/services/nft";
import { NFTPersistence } from "@/services/persistence";

export class NFTController {
  constructor(
    private readonly nftService: NFTService,
    private readonly persistence: NFTPersistence
  ) {}

  async mintToken(req: MintBattlegroundsCardNFTRequest) {
    return this.nftService.mintCard(req);
  }

  async getAllTokens(): Promise<BattlegroundsCardNFT[]> {
    return this.persistence.getAllTokens();
  }
}
