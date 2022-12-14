## Full stack NFT marketplace built with Polygon, Solidity, IPFS, & Next.js

  

Based on **How to Build a Full Stack NFT Marketplace - V2 (2022)** by Nader Dabit.

  

Article: [Building a Full Stack NFT Marketplace on Ethereum with Polygon](https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb).

  

Original [repo](https://github.com/dabit3/polygon-ethereum-nextjs-marketplace/).

  

Using this docker image you can run the marketplace on local hardhat or on the Polygon Mumbai test net.

  

# Docker

  

### Build

  

    $docker build . -t nftmarketplace;

  

  

### Instantiate a new container

  

	$docker run -it -d -p 8545:8545 -p 3000:3000 --name nftm nftmarketplace;

  

### Compile Smart Contract

  

#### Run the Marketplace on localhost

Connect to the container's console (I'm using Docker Desktop).

Start local hardhat

  

	$yarn start:local &

  

Compile smart contracts. You need to do this specifically because the Hardhat task that will be invoked

at the next step won't download the Solidity compiler.

  

	$npx hardhat compile

  
  

Deploy Smart Contracts

  

	$yarn deploy:local

  

Start web client

  

	$yarn client:dev

  

#### Run the Marketplace on Polygon

Connect to the container's console (I'm using Docker Desktop).

Deploy Smart Contracts on Polygon Mumbai testnet

  

	$yarn deploy:mumbai

  

Start web client

  

	$yarn client:dev

  
  

#### Useful commands

  

See docker logs:

  

	docker logs -f nftm;
### Other considerations
Please consider resetting your metamask account's nonce after each restart of the local hardhat node.