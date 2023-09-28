const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenY", function () {
  let TokenY;
  let tokenY;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Deploy the TokenY contract
    TokenY = await ethers.getContractFactory("TokenY");
    tokenY = await TokenY.deploy();
  });

  it("Should deploy with the correct name and symbol", async function () {
    expect(await tokenY.name()).to.equal("Token Y");
    expect(await tokenY.symbol()).to.equal("TY");
  });

  it("Should mint initial supply to the deployer", async function () {
    const initialSupply = ethers.utils.parseUnits("1000", 18);
    expect(await tokenY.balanceOf(owner.address)).to.equal(initialSupply);
  });

  it("Should allow the owner to mint new tokens", async function () {
    const amountToMint = ethers.utils.parseUnits("100", 18);

    await tokenY.connect(owner).mint(addr1.address, amountToMint);

    const balanceAfterMint = await tokenY.balanceOf(addr1.address);
    expect(balanceAfterMint).to.equal(amountToMint);
  });

  it("Should emit TokenMinted event when minting", async function () {
    const amountToMint = ethers.utils.parseUnits("50", 18);

    await expect(tokenY.connect(owner).mint(addr1.address, amountToMint))
      .to.emit(tokenY, "TokenMinted")
      .withArgs(addr1.address, amountToMint);
  });
});
