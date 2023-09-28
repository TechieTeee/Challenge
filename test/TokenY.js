const hre = require("hardhat");

async function main() {
  const TokenY = await hre.ethers.getContractFactory("TokenY");
  const tokenY = await TokenY.deploy();

  // Wait for the contract to be mined
  await tokenY.deployed();

    // console.log("TokenZ deployed to:", tokenZ.address);
  console.log("TokenY deployed to:", tokenY.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
