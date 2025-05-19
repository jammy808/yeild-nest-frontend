import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, DollarSign, Activity } from "lucide-react";
import type { AbiItem } from 'web3-utils';
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { useEffect, useState } from "react";

interface StatsProps {
  contract: Contract<AbiItem[]> | null;
  token: Contract<AbiItem[]> | null;
  web3: Web3 | null;
}

const StakingStats = ({ contract,token ,web3 }: StatsProps) => {
  const [totalStake, setTotalStake] = useState<string>("");
  const [totalRewards , setTotalRewards] = useState<string>("");

  const getTotalStake = async () => {
    if (!contract || !web3) return;
    try {
      const total: string = await contract.methods.totalStake().call();
      const totalInEth = web3.utils.fromWei(total, "ether");
      setTotalStake(totalInEth);
      console.log("eth:" + totalInEth)
    } catch (error) {
      console.error("Failed to fetch total stake:", error);
    }
  };

  const getTotalRewards = async () => {
    if (!token || !web3) return;

    try {
      const totalSupply: string = await token.methods.totalSupply().call();
      const formatted = web3.utils.fromWei(totalSupply, "ether");
      setTotalRewards(formatted);
    } catch (error) {
      console.error("Failed to fetch total minted tokens:", error);
    }
  };

  useEffect(() => {
    getTotalStake();
    getTotalRewards();
  }, [contract])

  return (
    <div className="eth-card p-4 md:p-6 space-y-4 md:space-y-6 w-full">
      <h2 className="text-xl md:text-2xl font-bold text-center blue-gradient-text">Platform Statistics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
        <div className="space-y-2 bg-secondary/30 p-3 md:p-4 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <DollarSign className="text-primary" size={18} />
            <p className="text-xs md:text-sm text-muted-foreground" onClick={getTotalStake}>Total Value Locked</p>
          </div>
          <p className="text-lg md:text-2xl font-bold blue-gradient-text">{totalStake} ETH</p>
        </div>
        
        {/* <div className="space-y-2 bg-secondary/30 p-3 md:p-4 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Users className="text-primary" size={18} />
            <p className="text-xs md:text-sm text-muted-foreground">Active Stakers</p>
          </div>
          <p className="text-lg md:text-2xl font-bold blue-gradient-text">15,789</p>
        </div> */}
        
        <div className="space-y-2 bg-secondary/30 p-3 md:p-4 rounded-lg backdrop-blur-sm sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <TrendingUp className="text-primary" size={18} />
            <p className="text-xs md:text-sm text-muted-foreground">Rewards Distributed</p>
          </div>
          <p className="text-lg md:text-2xl font-bold blue-gradient-text">{totalRewards} ETH</p>
        </div>
      </div>
      
      {/* <div className="space-y-2 pt-2 md:pt-4 bg-secondary/30 p-3 md:p-4 rounded-lg backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="text-accent" size={18} />
            <p className="text-xs md:text-sm text-muted-foreground">Network Health</p>
          </div>
          <p className="text-xs md:text-sm font-medium text-accent">98%</p>
        </div>
        <Progress value={98} className="bg-muted/30 h-1.5 md:h-2" />
      </div> */}
    </div>
  );
};

export default StakingStats;
