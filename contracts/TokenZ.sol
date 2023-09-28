// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TokenZ is ERC20, Ownable {
  using SafeMath for uint256;

  IERC20 public tokenY;
  mapping(address => uint256) public tokenYBalance;

  constructor(address _tokenY) ERC20("Token Z", "TZ") {
    tokenY = IERC20(_tokenY);
  }

  // Function to deposit Token Y and receive Token Z
  function depositTokenY(uint256 _amount) external onlyOwner {
    require(_amount > 0, "Amount must be greater than 0");
    require(tokenY.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

    uint256 mintAmount = (_amount * 100) / totalTokenYBalance();
    _mint(msg.sender, mintAmount);
    tokenYBalance[msg.sender] += _amount;

    // Emit an event to track token deposits
    emit TokenYDeposited(msg.sender, _amount);
  }

  // Function to calculate the total Token Y balance in the contract
  function totalTokenYBalance() public view returns (uint256) {
    return tokenY.balanceOf(address(this));
  }

  // Event to track token deposits
  event TokenYDeposited(address indexed sender, uint256 amount);
}