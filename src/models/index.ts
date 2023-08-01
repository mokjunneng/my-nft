export type MintBattlegroundsCardNFTRequest = Omit<
  BattlegroundsCardNFT,
  "tokenId"
>;

export interface BattlegroundsCardNFT {
  tokenId: number;
  tokenUri: string;
  name: string;
  minionType: string;
  baseAttackStat: number;
  baseHealthStat: number;
  tavernTier: number;
}
