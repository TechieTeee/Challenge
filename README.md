# Challenge

# Overview
This project contains a Hardhat project with two, Solidity smart contracts - TokenY and TokenZ.These smart contracts are designed to mint and manage the supply of a token.

TokenY is an ERC-20 compliant token that provides the following functionality:

- **Minting:** The contract mints an initial supply to the deployer.
- **Owner Minting:** The owner can mint new tokens to a specified address.
- **Event Emission:** The contract emits a `TokenMinted` event when minting occurs.

### Usage

To deploy, use the provided deployment script in the `scripts` directory:

`npx hardhat run scripts/deploy.js`

## Testing
To test please use the tests provided in the `test` directory:
`npx hardhat run test/TokenY.js`
`npx hardhat run test/TokenZ.js`
Ran into some issues with Gitpod and Hardhat- so deployed contracts through Remix

## Interacting with Smart Contracts
Best ways to interact through command line or through blockchain explorer and deployment on Polygon Mumbai testnet


# Token Y Contract Deployment on Mumbai
![image](https://github.com/TechieTeee/Challenge/assets/100870737/a17c4508-f7f5-4205-8985-558982542e2d)
- Contract Address: 0x4A24479934de70b1B066889D0f78df29cc97Ba5b
- Transaction Hash: 0xf8fe83b5c2e49f2d4b271d8f722d15e282a14e90a066f7d511ace8cecfce5f09
- Block Explorer Link: https://mumbai.polygonscan.com/tx/0xf8fe83b5c2e49f2d4b271d8f722d15e282a14e90a066f7d511ace8cecfce5f09

# Token Z Contract Deployment on Mumbai
![image](https://github.com/TechieTeee/Challenge/assets/100870737/97df6e0c-d772-4b2d-bcf1-f9124b127ccf)
- Contract Address: 0x4A24479934de70b1B066889D0f78df29cc97Ba5b
- Transaction Hash: 0x5b8445437c3252571864cff84ad6fe6e291940dd7a839dd5de45798889c8a40f
- Block Explorer: https://mumbai.polygonscan.com/tx/0x94527db739bbad2293e45e3aa2779394f7c96c2c27a22bdaf551f94a3ab6aa61
