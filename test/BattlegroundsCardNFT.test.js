const { ethers } = require('hardhat');

describe('Test BattlegroundsCardNFT smart contract', function () {
  before(async function () {
    this.NFT = await ethers.getContractFactory('BattlegroundsCardNFT');
  });

  beforeEach(async function () {
    this.nft = await this.NFT.deploy('BattlegroundsCardNFT', 'BGC');
    await this.nft.deployed();
  });

  it('should mint a card', async function () {
    // Mint card
    await this.nft.mintCard(
      "Risen Rider",
      "undead",
      2,
      2,
      1,
      "https://hearthstone.blizzard.com/en-us/battlegrounds/95246-risen-rider?tier=1"
    );
  });
});
