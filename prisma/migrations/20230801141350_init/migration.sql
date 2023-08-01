-- CreateTable
CREATE TABLE "BattlegroundsCardNft" (
    "tokenId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "minionType" TEXT NOT NULL,
    "baseAttackStat" INTEGER NOT NULL,
    "baseHealthStat" INTEGER NOT NULL,
    "tavernTier" INTEGER NOT NULL,

    CONSTRAINT "BattlegroundsCardNft_pkey" PRIMARY KEY ("tokenId")
);
