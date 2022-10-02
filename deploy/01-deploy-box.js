const { verify } = require("../utils/verify");

/**
 * This deploy script will deploy 3 contracts
 * 1. The Proxy Admin Contract
 * 2. The implementation contract
 * 3. The proxy contract
 */
module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying Box contract...");
  const box = await deploy("Box", {
    from: deployer,
    log: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy", //type of proxy
      viaAdminContract: {
        name: "BoxProxyAdmin", ///name of proxy admin
        artifact: "BoxProxyAdmin", //where to get its abi
      },
    },
  });
  log("Box contract deployed");
  if(network.config.chainId != 31337){
    log("Verifying contract...");

    await verify(box.address, [])
  }

};
module.exports.tags = ["all", "box"]