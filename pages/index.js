import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
  marketplaceAddress,
  network
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    // JsonRpcProvider: If no urlOrConnectionInfo is specified the defaul (http://localhost:8545) is used.
    // const provider = new ethers.providers.JsonRpcProvider() 
    // JsonRpcProvider to connect to Polygon Mumbai (testnet)
    const provider = new ethers.providers.JsonRpcProvider(network === "mumbai" ? "https://polygon-mumbai.g.alchemy.com/v2/k1oaxl2Udguk2tRRRTVNlWy1oI-Ti9qM": undefined) 
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
    const data = await contract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      //const meta = await axios.get.get(tokenUri)
      console.log("Token uri", tokenUri);
      let meta = { data: {}};
      try {
         meta = await axios({
          method: 'get',
          url: tokenUri,
          timeout: 10000
        })
      } catch (err) {
        console.log("Get metadata from IPFS failed...", err)
      }
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }

  const showDetails = () => {
    return <div style={{fontSize: "0.7rem", marginLeft: "0.4rem"}}>
        <div><small>Connected @ <b>{network}</b></small></div>
        <div><small>NFTMarketplace SC Address: <b>{marketplaceAddress}</b></small></div>
    </div>
  }

  if (loadingState === 'loaded' && !nfts.length) return (<div>
      {showDetails()}
      <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
    </div>)
  return (<>
    {showDetails()}
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
                  <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    </>
  )
}