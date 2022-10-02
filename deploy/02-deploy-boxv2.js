const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying BoxV2 contract");
  const boxV2 = await deploy("BoxV2", {
    from: deployer,
    log: true,
    args: [],
  });
  log("Deployed BoxV2 successfully!");
  if (network.config.chainId != 31337) {
    log("Verifying contract...");

    await verify(box.address, []);
  }
};


module.exports.tags = ["all", "boxV2"]
