import { expect } from "chai";
import { ethers } from "hardhat";

describe("Ezeki", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Ezeki = await ethers.getContractFactory("Ezeki");
    const ezeki = await Ezeki.deploy();
    await ezeki.deployed();

    expect(await ezeki.sum(1, 2)).to.equal(3);

    // const setGreetingTx = await ezeki.sum(1, 2);

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    expect(await ezeki.sayHi()).to.equal("Hello World");
  });
});
