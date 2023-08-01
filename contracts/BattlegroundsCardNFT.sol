// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract BattlegroundsCardNFT is ERC721URIStorage, Ownable {
    uint private nextTokenId = 1;
    
    // Struct to store card data
    struct Card {
        string name;
        string minionType;
        uint baseAttackStat;
        uint baseHealthStat;
        uint tavernTier;
        // Include card effects in future versions
    }
    
    // Mapping to associate each NFT token ID with its card data
    mapping(uint => Card) private _cards;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mintCard(
        address _to,
        string calldata _name,
        string calldata _minionType,
        uint _baseAttackStat,
        uint _baseHealthStat,
        uint _tavernTier,
        string calldata tokenURI
    ) external onlyOwner returns (uint) {
        uint newCardId = nextTokenId;
        // Ensure that the token ID has not been used before
        require(!_exists(newCardId), "Token ID already in use.");
        
        console.log(_to, nextTokenId);
        // Mint the NFT
        _safeMint(_to, nextTokenId);
        console.log("minted");

        // Emit event
        
        // Assign token URI and increment id
        _setTokenURI(newCardId, tokenURI);

        // Store the card data
        Card memory card = Card({
            name: _name,
            minionType: _minionType,
            baseAttackStat: _baseAttackStat,
            baseHealthStat: _baseHealthStat,
            tavernTier: _tavernTier
        });
        _cards[newCardId] = card;

        // Increment token
        nextTokenId++;
        return newCardId;
    }

    function burnCard(uint _tokenId) external onlyOwner {
        require(_exists(_tokenId), "NFT with this token ID does not exist.");
        _burn(_tokenId);
        
        // Remove the character data when burning the NFT
        delete _cards[_tokenId];
    }

    // Function to get the card data of an NFT
    function getCard(uint256 _tokenId) external view returns (Card memory) {
        require(_exists(_tokenId), "NFT with this token ID does not exist.");
        return _cards[_tokenId];
    }
}
