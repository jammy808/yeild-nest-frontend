import { useEffect, useState } from "react";
//import Header from "@/components/Header";
import StakeForm from "@/components/StakeForm";
import RewardsPanel from "@/components/RewardsPanel";
import StakingStats from "@/components/StakingStats";

//main imports
import Web3 from "web3";
import type { AbiItem } from 'web3-utils';
import { Contract } from "web3-eth-contract";
import getWeb3Instance from "../utils/web3";

const address = "0x445d0c5Df4eeF1037F54F956E55847d009630a69";
const tokenAddress = "0x5d41a515C222f94323e5f682095E73d096B5e372";
import contractAbi from "../utils/contract.json" with {type : 'json'};
import tokenAbi from "../utils/token.json" with {type : 'json'};

declare global {
  interface Window {
    ethereum?: any;
  }
} // this is done cause ts don't know window.ethereum

//imports for header component
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wallet } from "lucide-react";

const Index = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract<AbiItem[]> | null>(null);
  const [token, setToken] = useState<Contract<AbiItem[]> | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [accountsList, setAccountsList] = useState<string[]>([]);
  const [totalStake, setTotalStake] = useState<string>("");
  const { toast } = useToast();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const web3Instance = getWeb3Instance();
    if (!web3Instance) {
      toast({
        title: "Wallet Not fount",
        description: "Inorder to stake your Eth you will need a wallet. Please install a wallet.",
        variant: "destructive",
      });
      return;
    }
    setWeb3(web3Instance);

    const contractInstance = new web3Instance.eth.Contract(contractAbi as AbiItem[], address);
    setContract(contractInstance);

    const tokenInstance = new web3Instance.eth.Contract(tokenAbi as AbiItem[] , tokenAddress);
    setToken(tokenInstance);

    connectWallet();
  }, []);

  const connectWallet = async () => {
    //disconnect wallet logic
    if (connected) {
      setConnected(false);
      setAccount(null);
      setAccountsList([]);
      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected.",
      });
      return;
    }

    // connect wallet logic
    if (typeof window.ethereum === "undefined") {
       toast({
        title: "Wallet Not fount",
        description: "Inorder to stake your Eth you will need a wallet. Please install a wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setAccountsList(accounts);

      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
      setConnected(true);
    } catch (err) {
      console.error("User rejected the request");
    }
  };

  // const disconnectWallet = () => {
  //   setAccount(null);
  //   setAccountsList([]);
  // };

  // useEffect(() => {
  //   if (typeof window.ethereum !== "undefined") {
  //     window.ethereum.on("accountsChanged", (accounts: string[]) => {
  //       setAccount(accounts[0] || null);
  //       setAccountsList(accounts);
  //     });

  //     window.ethereum.on("disconnect", () => {
  //       setAccount(null);
  //       setAccountsList([]);
  //     });
  //   }

  //   return () => {
  //     if (window.ethereum?.removeListener) {
  //       window.ethereum.removeListener("accountsChanged", () => {});
  //       window.ethereum.removeListener("disconnect", () => {});
  //     }
  //   };
  // }, []);

  const Header = () => {

    return (
      <header className="py-4 md:py-6 backdrop-blur-sm border-b border-primary/10">
        <div className="w-full lg:px-8 px-2 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full blue-gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-base md:text-lg">YN</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              <span className="blue-gradient-text">Yield</span> Nest
            </h1>
          </div>
          
          <Button 
            onClick={connectWallet}
            className={`gap-1 md:gap-2 py-5 px-3 md:px-6 text-sm ${connected ? 'sky-gradient-bg hover:opacity-90 transition-opacity' : 'blue-gradient-bg hover:opacity-90 transition-opacity'}`}
          >
            <Wallet size={16} className="md:size-20" />
            {connected ? 
              <span className="">{`${account.slice(0, 6)}...${account.slice(-4)}`}</span> : 
              "Connect Wallet"
            }
          </Button>
        </div>
      </header>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 blue-gradient-text">
              Yield Nest
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground">
              Stake your ETH securely on Sepolia and earn rewards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <StakeForm connected={connected} contract={contract} web3={web3} account={account} />
            <RewardsPanel connected={connected} contract={contract} web3={web3} account={account} />
          </div>
          
          <StakingStats contract={contract} token={token} web3={web3} />
        </div>
      </main>
      
      <footer className="py-6 md:py-8 text-center text-sm text-muted-foreground border-t border-primary/10">
        <div className="container mx-auto">
          <p>© 2025 Yield Nest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};


export default Index;
