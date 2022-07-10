export const createSnippet = (address) => `
// Language: solidity.
// Please insert this snippet into your NFT Smart Contract.
// take a note that you firstly have to deploy kindly contract to the network.
receive() external payable {
    address _kindly = ${address};
    (bool success, ) = kindly.call{value:msg.value}("");
    require(success, "Error: money not sended");
} 
`