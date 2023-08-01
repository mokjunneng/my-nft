// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract BattlegroundsCardNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Struct to store card data
    struct Card {
        string name;
        string minionType;
        uint baseAttackStat;
        uint baseHealthStat;
        uint tavernTier;
        // Include card effects in future versions
    }

    event Mint(
        uint _tokenId,
        string _tokenURI,
        string name,
        string minionType,
        uint baseAttackStat,
        uint baseHealthStat,
        uint tavernTier
    );
    
    // Mapping to associate each NFT token ID with its card data
    mapping(uint => Card) private _cards;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mintCard(
        string calldata _name,
        string calldata _minionType,
        uint _baseAttackStat,
        uint _baseHealthStat,
        uint _tavernTier,
        string calldata _tokenURI
    ) external onlyOwner returns (uint256) {
        uint256 newTokenId = _tokenIds.current();
        // Ensure that the token ID has not been used before
        require(!_exists(newTokenId), "Token ID already in use.");
        
        // Only owner of contract can mint the NFT
        _safeMint(msg.sender, newTokenId);

        // Emit event
        emit Mint(
            newTokenId,
            _tokenURI,
            _name,
            _minionType,
            _baseAttackStat,
            _baseHealthStat,
            _tavernTier
        );

        // Assign token URI and increment id
        _setTokenURI(newTokenId, _tokenURI);
        _tokenIds.increment();

        // Store the card data
        Card memory card = Card({
            name: _name,
            minionType: _minionType,
            baseAttackStat: _baseAttackStat,
            baseHealthStat: _baseHealthStat,
            tavernTier: _tavernTier
        });
        _cards[newTokenId] = card;

        return newTokenId;
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
