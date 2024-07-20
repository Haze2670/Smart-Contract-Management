const hre = require("hardhat");

async function main() {
  const initBalance = 10000;
  const Tollgate = await hre.ethers.getContractFactory("Tollgate");
  const tollgate = await Tollgate.deploy(initBalance);
  await tollgate.deployed();

  console.log(`A contract with balance of ${initBalance} ETH deployed to ${tollgate.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
