import Web3 from "web3";

let web3;

if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
    web3 = new Web3(window.ethereum);
} else{
    const provider = new Web3.HttpProvider("https://eth-sepolia.g.alchemy.com/v2/LxIxMyBFQSm7gGFChwLGjKyJVkkQ6LMJ");
    web3 = new Web3(provider);
}

export default web3;