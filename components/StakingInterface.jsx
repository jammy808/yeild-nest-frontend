"use client"
import { useEffect, useState } from "react";
import getWeb3Instance from "../utils/web3";
import getContract from "../utils/contract";

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

export default function StakingInterface() {
    const [amount , setAmount] = useState(0);
    const [account, setAccount] = useState(null);
    const [accountsList, setAccountsList] = useState([]);
    const [contract , setContract] = useState("");
    const [web3 , setWeb3] = useState("");
    const [totalStake , setTotalStake] = useState("");

    useEffect(() => {
        const web3Instance = getWeb3Instance();
        if(!web3Instance) return alert("Please install MetaMask.");
        setWeb3(web3Instance);

        const contractInstance = new web3Instance.eth.Contract(abi , address);
        setContract(contractInstance);
        
        connectWallet();

    }, [])

    const connectWallet = async () => {
        if (typeof window.ethereum === "undefined") {
          alert("Please install MetaMask.");
          return;
        }
    
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);
          setAccountsList(accounts);
        } catch (err) {
          console.error("User rejected the request");
        }
    };
    
    const disconnectWallet = () => {
    setAccount(null);
    setAccountsList([]);
    };

    // chnage account directly from wallet
    useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
        window.ethereum.on("accountsChanged", (accounts) => {
        //console.log(accounts);
        setAccount(accounts[0] || null);
        setAccountsList(accounts);
        });

        window.ethereum.on("disconnect", () => {
        setAccount(null);
        setAccountsList([]);
        });
    }

    return () => {
        if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("disconnect", () => {});
        }
    };
    }, []);

    const getTotalStake = async () => {
        if (!contract || !account) return;
        const totalstake = await contract.methods.totalStake().call();
        setTotalStake(totalstake);
    }

    const handleStake = async () => {
        if (!contract || !web3 || !account || !amount) {
          alert("Please enter a valid amount and connect your wallet.");
          return;
        }
      
        try {
          await contract.methods.stake(amount).send({
            from: account,
            value: amount,
          });
          alert("Staking successful!");
        } catch (error) {
          console.error("Staking failed:", error);
          alert("Staking failed. Check console for details.");
        }
    };

    // add a input bar for unstake
    const handleUnstake = async () => {
        if (!contract || !account) return;
        await contract.methods.unstake(amount).send({ from: account });
    };

    const getRewards = async () => {
        if (!contract || !account) return;
        const res = await contract.methods.getRewards().call({ from: account });
        console.log(res);
    };

    const claimRewards = async () => {
        if (!contract || !account) return;
        const res = await contract.methods.claimRewards().send({ from: account });
        console.log(res);
    };

    return(
        <div>
            <h1>Eth Staking DApp : {totalStake}</h1>
            <div>
            {account ? (
                <>
                    <p>Connected: {account}</p>
                    <button onClick={disconnectWallet}>Disconnect</button>
                </>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
            </div>
            <button onClick={getTotalStake} >Get Total Stake</button>

            <input type="text" 
            placeholder="Amount in Eth"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}/>

            <button onClick={handleStake} >Stake</button>
            <br />
            <button onClick={handleUnstake} >UnStake</button>
            <br />
            <button onClick={getRewards} >get Rewards</button>
            <br />
            <button onClick={claimRewards} >claim Rewards</button>
        </div>
    )
}