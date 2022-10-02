const { ethers } = require("hardhat");

async function main() {
  const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin");
  const transparentProxy = await ethers.getContract("Box_Proxy");
  const proxyBoxV1 = await ethers.getContract("Box", transparentProxy.address);  // the proxy will be the one to call functions on the implementation contract

  const versionBefore = await proxyBoxV1.version();
  console.log(`Version before upgrade: ${versionBefore}`);
  const boxV2 = await ethers.getContract("BoxV2");
  const upgradeTx = await boxProxyAdmin.upgrade(
    transparentProxy.address,
    boxV2.address
  ); //point the proxy to the new implementation contract

  await upgradeTx.wait();

  const proxyBoxV2 = await ethers.getContract(
    "BoxV2",
    transparentProxy.address
  );
  const version = await proxyBoxV2.version();
  console.log(`Version after upgrade: ${version}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
