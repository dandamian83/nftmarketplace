require("@nomiclabs/hardhat-waffle");

const fs = require('fs');

task("deploy-task", "Deploy task")
  .addPositionalParam("net")
  .setAction(async (taskArgs, hre) => {
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.deployed();
    console.log("nftMarketplace deployed to:", nftMarketplace.address);
    if (taskArgs.net === "localhost") {
      console.log("using localhost hardhat network");
    } else if (taskArgs.net === "mumbai") {
      console.log("using Polygon Mumbai testnet");
    } else {
      console.log("Error: unknown network...");
    }
    
    fs.writeFileSync('./config.js', `
        export const marketplaceAddress = "${nftMarketplace.address}"
        export const network = "${taskArgs.net}"
    `)
  });

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      // Infura
      // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
      url: "https://polygon-mumbai.g.alchemy.com/v2/k1oaxl2Udguk2tRRRTVNlWy1oI-Ti9qM",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    }
    
    /*matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [process.env.privateKey]
    }
    */
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

