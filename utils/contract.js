import web3 from "./web3";

const address = "0x445d0c5Df4eeF1037F54F956E55847d009630a69";

const abi = [
    {
    "type": "function",
    "name": "REWARD_PER_SEC_PER_ETH",
    "inputs": [],
    "outputs": [
        {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
        }
    ],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "claimRewards",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
    },
    {
    "type": "function",
    "name": "getRewards",
    "inputs": [],
    "outputs": [
        {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
        }
    ],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "initialize",
    "inputs": [
        {
        "name": "token",
        "type": "address",
        "internalType": "address"
        }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
    },
    {
    "type": "function",
    "name": "jamToken",
    "inputs": [],
    "outputs": [
        {
        "name": "",
        "type": "address",
        "internalType": "contract IJamToken"
        }
    ],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "stake",
    "inputs": [
        {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
        }
    ],
    "outputs": [],
    "stateMutability": "payable"
    },
    {
    "type": "function",
    "name": "totalStake",
    "inputs": [],
    "outputs": [
        {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
        }
    ],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "unstake",
    "inputs": [
        {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
        }
    ],
    "outputs": [],
    "stateMutability": "payable"
    },
    {
    "type": "function",
    "name": "userInfo",
    "inputs": [
        {
        "name": "",
        "type": "address",
        "internalType": "address"
        }
    ],
    "outputs": [
        {
        "name": "stakedAmount",
        "type": "uint256",
        "internalType": "uint256"
        },
        {
        "name": "rewardDebt",
        "type": "uint256",
        "internalType": "uint256"
        },
        {
        "name": "lastUpdate",
        "type": "uint256",
        "internalType": "uint256"
        }
    ],
    "stateMutability": "view"
    }
]

const stakingContract = new web3.eth.Contract(abi , address);
export default stakingContract;