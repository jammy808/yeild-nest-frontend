import Web3 from "web3";

function getWeb3Instance() {
    let web3;
    if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
        web3 = new Web3(window.ethereum);
        return web3;
    }
    return null;
}

export default getWeb3Instance;