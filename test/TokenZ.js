const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenZ", function () {
  let TokenY;
  let tokenY;
  let TokenZ;
  let tokenZ;
  let owner;

  before(async function () {
    [owner] = await ethers.getSigners();

    TokenY = await ethers.getContractFactory("TokenY");
    tokenY = await TokenY.deploy();

    TokenZ = await ethers.getContractFactory("TokenZ");
  });

  it("Should deploy with TokenY's address", async function () {
    // Deploy TokenZ with TokenY's address
    tokenZ = await TokenZ.deploy(tokenY.address);

    // Wait for the deployment transaction to be mined
    await tokenZ.deployTransaction.wait();

    // Retrieve the TokenY address from the deployed TokenZ contract
    const deployedTokenY = await tokenZ.tokenY();
    expect(deployedTokenY).to.equal(tokenY.address);
  });

});
