const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config.js")

const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
 const { deploy, log } = deployments
 const { deployer } = await getNamedAccounts()

 log("_______________")
 const args = []
 const BasicNft = await deploy("BasicNft", {
  from: deployer,
  args: args,
  log: true,
  waitConfimations: network.config.blockConfimations || 1,
 })

 if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
  log("Verifyinnggg.. ")
  await verify(BasicNft.address, args)
 }
}
