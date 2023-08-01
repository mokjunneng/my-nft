const { startEventListener } = require("./contract-event-listener");

async function main () {
  // We get the contract to deploy
  const NFT = await ethers.getContractFactory('BattlegroundsCardNFT');
  console.log('Deploying NFT...');
  const nft = await NFT.deploy('BattlegroundsCardNFT', 'BGC');
  await nft.deployed();
  console.log('NFT deployed to:', nft.address);
  // Start event listener
  await startEventListener(nft.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
