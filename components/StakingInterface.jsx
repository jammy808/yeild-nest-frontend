"use client"
import { useState } from "react";
import web3 from "../utils/web3";
import stakingContract from "../utils/contract";

export default function StakingInterface() {
    const[amount , setAmount] = useState("");
    const[account , setAccount] = useState("");

    const conectWallet = async () => {
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account[0]);
    }

    return(
        <div>
            <h1>Eth Staking DApp</h1>
            <button onClick={conectWallet}> Connect Wallet</button>
            <p>Connected : {account}</p>
        </div>
    )
}