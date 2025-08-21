import { ethers } from "hardhat";
import { WalletProfiler__factory } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);

  const walletProfilerFactory = new WalletProfiler__factory(deployer);
  const walletProfiler = await walletProfilerFactory.deploy("Hello from Wallet Profiler!");
  await walletProfiler.waitForDeployment();

  console.log("WalletProfiler deployed to:", await walletProfiler.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
