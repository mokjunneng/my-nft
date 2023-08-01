const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Test BattlegroundsCardNFT smart contract', function () {
  before(async function () {
    this.NFT = await ethers.getContractFactory('BattlegroundsCardNFT');
  });

  beforeEach(async function () {
    this.nft = await this.NFT.deploy('BattlegroundsCardNFT', 'BGC');
    await this.nft.deployed();
  });

  it('should mint a card and retrieve it', async function () {
    const signers = await ethers.getSigners();
    // Mint card
    const tokenId = await this.nft.mintCard(
      // Test Account #19
      signers[0].address,
      "Risen Rider",
      "undead",
      2,
      2,
      1,
      "https://hearthstone.blizzard.com/en-us/battlegrounds/95246-risen-rider?tier=1"
    );

    // Retrieve minted card
    const mintedCard = await this.nft.getCard(tokenId);
    console.log(mintedCard)

    // Test if the returned value is the same as expected
    // expect((await this.box.retrieve()).toString()).to.equal('42');
  });
});
