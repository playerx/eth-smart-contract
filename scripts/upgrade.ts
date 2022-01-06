// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, run, upgrades } from "hardhat";

const proxyAddress = "0x2C56a86Ae5e6Ed9Dd00E91E023382dEbdcE9214A";

async function main() {
  const Ezeki = await ethers.getContractFactory("Ezeki");

  const newInstanceAddress = await upgrades.prepareUpgrade(proxyAddress, Ezeki);
  console.log("newInstanceAddress", newInstanceAddress);

  const upgraded = await upgrades.upgradeProxy(proxyAddress, Ezeki);
  console.log("upgraded", upgraded.address, await upgraded.resolvedAddress);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("started verification process");
  await run("verify:verify", {
    address: newInstanceAddress,
    constructorArguments: [],
  }).catch((err: any) => {
    if (err.message === "Contract source code already verified") {
      return;
    }

    throw err;
  });

  //   const admin = await getProxyAdminFactory(hre);
  //   admin.attach()

  //   const AdminFactory = await getProxyAdminFactory(hre);
  //   const admin = AdminFactory.attach(proxyAddress);

  //   await admin.upgrade(proxyAddress, newInstance);

  //   ethers.getContractAt()
  //   await upgrades.upgradeProxy()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
