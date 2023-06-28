const { network, ethers, deployments } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")

// function deployFunc(hre){
//     console.log("Hi..")
// }
// module.exports.default = deployFunc

//OR

// module.exports = async (hre) => {
//     const {getNamedAccounts, deployments} = hre
// }

//OR

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    let { deployer } = await getNamedAccounts()

    const { verify } = require("../utils/verify")

    const chainId = network.config.chainId

    //if chain id X use Y
    //if chain id Z use A
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]
    //MOCK Script: if the contract doesn't exist , we deploy a minimal version of our local testing
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    log("----------------------------------------------------------------")
   
}

module.exports.tags = ["all", "fundme"]
