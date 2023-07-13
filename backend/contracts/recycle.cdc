recycle_contract.cdc
pub contract NFTContract {


/// The total number of NFTs
pub var totalSupply: UInt64


/// The structure that represents the NFT.
pub resource NFT {
pub let id: UInt64
pub let metadata: {String: String}
pub var owner: Address


init(initID: UInt64, initMetadata: {String: String}, initOwner: Address) {
self.id = initID
self.metadata = initMetadata
self.owner = initOwner
}


pub fun getID(): UInt64 {
return self.id
}


pub fun getMetadata(): {String: String} {
return self.metadata
}


pub fun getOwner(): Address {
return self.owner
}


pub fun setOwner(newOwner: Address) {
self.owner = newOwner
}
}


init() {
self.totalSupply = 0
}


/// Function to create a new NFT with metadata and send it to an address
pub fun createNFT(to: Address, metadata: {String: String}) {
let nft <- create NFT(initID: self.totalSupply, initMetadata: metadata, initOwner: to)


self.totalSupply = self.totalSupply + 1 as UInt64


// implement the logic here to send the NFT to the recipient
}


/// Transfer the ownership of NFT to another address
pub fun transferNFT(from: Address, to: Address, id: UInt64) {
// Implement the logic to transfer the NFT from one account to another.
}
}


pub fun mintNFT(ipfsHash: String, metadata: {String: String}, recipient: Address) {
// Here we're assuming the 'tokens' field is a dictionary of type `{UInt64: NFT}`
let newTokenID = UInt64(self.tokens.length) + UInt64(1)
let newNFT = NFT(ipfsHash: ipfsHash, metadata: metadata)


self.tokens[newTokenID] = newNFT


self.deposit(token: <-newNFT, to: recipient)


emit Transfer(tokenID: newTokenID, from: nil, to: recipient)




#####Generates a new token ID by getting the number of tokens in the contract and adding 1.
Creates a new NFT with the provided IPFS hash and metadata.
Adds the new NFT to the contract's tokens dictionary.
Transfers the new NFT to the recipient's account.
Emits a Transfer event.


pub fun mintNFT(ipfsHash: String, metadata: {String: String}, recipient: Address) {
// Here we're assuming the 'tokens' field is a dictionary of type `{UInt64: NFT}`
let newTokenID = UInt64(self.tokens.length) + UInt64(1)
let newNFT = NFT(ipfsHash: ipfsHash, metadata: metadata)


self.tokens[newTokenID] = newNFT


self.deposit(token: <-newNFT, to: recipient)


emit Transfer(tokenID: newTokenID, from: nil, to: recipient)
}


ipfs module:
import ipfshttpclient
