const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    137: {
        name: "ploygon",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325396",
    },
}

const developmentChains = ["hardhat", "localhost"]
 
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
}
