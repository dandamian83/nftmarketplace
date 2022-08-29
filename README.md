## Full stack NFT marketplace built with Polygon, Solidity, IPFS, & Next.js
Based on **How to Build a Full Stack NFT Marketplace - V2 (2022)** by Nader Dabit.
Article: [Building a Full Stack NFT Marketplace on Ethereum with Polygon](https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb).
Original [repo](https://github.com/dabit3/polygon-ethereum-nextjs-marketplace/).


Running localy with hardhat network

Running with Polygon Mumbai

# Docker
### Build
docker build . -t nftmarketplace;

### Run
docker run -it -d -p 8545:8545 -p 3000:3000 --name nftm nftmarketplace;


### Useful commands
See docker logs:
docker logs -f nftm;


### Deploy on Polygon
1. set an environment variable with the private key of your first account (Signer account)
2. run: npx hardhat run scripts/deploy.js --network mumbai