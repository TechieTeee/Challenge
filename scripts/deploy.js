const hre = require("hardhat");

async function deployTokenY() {
  const TokenY = await hre.ethers.getContractFactory("TokenY");
  const tokenYInstance = await TokenY.deploy();
  return tokenYInstance;
}

async function main() {
  // Deploy TokenY
  const tokenYInstance = await deployTokenY();
  // Await the deployment of the TokenY contract before calling the `deployed` function
  await tokenYInstance.deployed();

  // Deploy TokenZ with TokenY's address
  const TokenZ = await hre.ethers.getContractFactory("TokenZ");
  const tokenZ = await TokenZ.deploy(tokenYInstance.address);
  await tokenZ.deployed();

  // Log the deployment addresses to the console
  console.log("TokenY deployed to:", tokenYInstance.address);
  console.log("TokenZ deployed to:", tokenZ.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });