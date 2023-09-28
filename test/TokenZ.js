const { expect } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber } = ethers;
const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

describe('TokenZ', function () {
  let TokenZ;
  let tokenZ;
  let TokenY;
  let tokenY;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Deploy TokenY
    TokenY = await ethers.getContractFactory('TokenY');
    tokenY = await TokenY.connect(owner).deploy();

    // Deploy TokenZ with TokenY address
    TokenZ = await ethers.getContractFactory('TokenZ');
    tokenZ = await TokenZ.connect(owner).deploy(tokenY.address);

    // Mint some TokenY to the owner
    await tokenY.connect(owner).mint(owner.address, BigNumber.from('1000000000000000000000')); // 1,000 TokenY
  });

  it('should deposit TokenY and mint TokenZ', async function () {
    const depositAmount = BigNumber.from('1000000000000000000'); // 1 TokenY

    // Approve TokenZ to spend TokenY
    await tokenY.connect(owner).approve(tokenZ.address, depositAmount);

    // Deposit TokenY and mint TokenZ
    const depositTx = await tokenZ.connect(owner).depositTokenY(depositAmount);

    // Check TokenZ balance of the owner
    const tokenZBalance = await tokenZ.balanceOf(owner.address);
    expect(tokenZBalance).to.equal(depositAmount.mul(100).div(await tokenZ.totalTokenYBalance()));

    // Check TokenY balance in the TokenZ contract
    const tokenYBalanceInContract = await tokenZ.totalTokenYBalance();
    expect(tokenYBalanceInContract).to.equal(0);

    // Check TokenY balance of the owner after deposit
    const tokenYBalance = await tokenY.balanceOf(owner.address);
    expect(tokenYBalance).to.equal('999000000000000000000'); // 999 TokenY left

    // Check emitted event
    expectEvent(depositTx, 'TokenYDeposited', {
      sender: owner.address,
      amount: depositAmount,
    });
  });

  it('revert if non-owner tries to deposit TokenY', async function () {
    const depositAmount = BigNumber.from('1000000000000000000'); // 1 TokenY

    // Approve TokenZ to spend TokenY
    await tokenY.connect(owner).approve(tokenZ.address, depositAmount);

    // Try to deposit TokenY by a non-owner (expect revert)
    await expectRevert(
      tokenZ.connect(addr1).depositTokenY(depositAmount),
      'Ownable: caller is not the owner'
    );
  });
});
