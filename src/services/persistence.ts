import { BattlegroundsCardNFT } from "@/models/index";
import { PrismaClient } from "@prisma/client";

export class NFTPersistence {
  constructor(private readonly dbClient: PrismaClient) {}

  async recordNft(nft: BattlegroundsCardNFT) {
    const {
      tokenId,
      tokenUri,
      name,
      minionType,
      baseAttackStat,
      baseHealthStat,
      tavernTier,
    } = nft;
    const existingNft = this.dbClient.battlegroundsCardNft.findUnique({
      where: { tokenId },
    });
    // Skip creation of NFTs that already existed
    if (existingNft !== null) return;

    await this.dbClient.battlegroundsCardNft.create({
      data: {
        tokenId,
        tokenUri,
        name,
        minionType,
        baseAttackStat,
        baseHealthStat,
        tavernTier,
      },
    });
  }

  // Get all saved NFT records without filter
  async listNfts(): Promise<BattlegroundsCardNFT[]> {
    return this.dbClient.battlegroundsCardNft.findMany();
  }
}
