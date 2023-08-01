import { BattlegroundsCardNFT } from "@/models/index";
import { PrismaClient } from "@prisma/client";

export class NFTPersistence {
  constructor(private readonly dbClient: PrismaClient) {}

  async saveToken(nft: BattlegroundsCardNFT) {
    const {
      tokenId,
      tokenUri,
      name,
      minionType,
      baseAttackStat,
      baseHealthStat,
      tavernTier,
    } = nft;
    const existingNft = await this.dbClient.battlegroundsCardNft.findUnique({
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
  async getAllTokens(): Promise<BattlegroundsCardNFT[]> {
    return this.dbClient.battlegroundsCardNft.findMany();
  }
}
