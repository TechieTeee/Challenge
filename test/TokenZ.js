const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenZ", function () {
  let TokenY;
  let tokenY;
  let TokenZ;
  let tokenZ;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    // Deploy the TokenY contract
    TokenY = await ethers.getContractFactory("TokenY");
    tokenY = await TokenY.deploy();

    // Deploy the TokenZ contract with TokenY's address
    TokenZ = await ethers.getContractFactory("TokenZ");
    tokenZ = await TokenZ.deploy(tokenY.address);
  });

  it("should deposit TokenY and mint TokenZ", async function () {
    const depositAmount = ethers.utils.parseUnits("100", 18);

    // Approve TokenY transfer to TokenZ
    await tokenY.connect(owner).approve(tokenZ.address, depositAmount);

    // Deposit TokenY and mint TokenZ
    await tokenZ.connect(owner).depositTokenY(depositAmount);

    // Check TokenY balance in TokenZ contract
    const tokenYBalanceInTokenZ = await tokenZ.tokenYBalance(owner.address);
    expect(tokenYBalanceInTokenZ).to.equal(depositAmount);

    // Check TokenZ balance in the owner's account
    const tokenZBalance = await tokenZ.balanceOf(owner.address);
    expect(tokenZBalance).to.equal(depositAmount.mul(100).div(await tokenZ.totalTokenYBalance()));
  });
});
