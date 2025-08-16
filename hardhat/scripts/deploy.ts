import { ethers } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("BaseTrustRegistry");
  const registry = await Factory.deploy();
  await registry.waitForDeployment();
  console.log("BaseTrustRegistry deployed at:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
