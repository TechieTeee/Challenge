// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenY is ERC20, Ownable {

  // Event to track token minting
  event TokenMinted(address indexed to, uint256 amount);

  constructor() ERC20("Token Y", "TY") {
    // Mint initial supply to the deployer
    // Minting 1000 tokens with 18 decimals
    _mint(msg.sender, 1000 * 10**18);
  }

  // Function to mint new tokens (onlyOwner)
  function mint(address to, uint256 amount) external onlyOwner {
    require(to != address(0), "TokenY: mint to the zero address");
    _mint(to, amount);
    emit TokenMinted(to, amount);
  }
}