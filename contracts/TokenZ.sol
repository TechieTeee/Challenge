// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenZ is ERC20, Ownable {
    ERC20 private tokenY;

    constructor(address _tokenY) ERC20("Token Z", "TZ") {
        require(_tokenY != address(0), "TokenZ: invalid TokenY address");
        tokenY = ERC20(_tokenY);
    }

    function depositTokenY(uint256 amount) external {
        require(amount > 0, "TokenZ: deposit amount must be greater than 0");

        // Ensure that the sender has approved this contract to spend TokenY
        require(tokenY.allowance(msg.sender, address(this)) >= amount, "TokenZ: not enough allowance");

        // Perform the transfer from the sender to this contract
        tokenY.transferFrom(msg.sender, address(this), amount);

        // Mint TokenZ to the sender
        _mint(msg.sender, amount);
    }

    function totalTokenYBalance() external view returns (uint256) {
        // Return the total balance of TokenY held by this contract
        return tokenY.balanceOf(address(this));
    }
}