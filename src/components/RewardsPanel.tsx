import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Award, Check, Coins } from "lucide-react";
import type { AbiItem } from 'web3-utils';
import { Contract } from "web3-eth-contract";
import Web3 from "web3";

interface RewardsPanelProps {
  connected: boolean;
  contract: Contract<AbiItem[]> | null;
  web3: Web3 | null;
  account: string | null;
}

const RewardsPanel = ({ connected, contract, web3, account }: RewardsPanelProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [rewards, setRewards] = useState("....");

  const  handleViewRewards = async () => {
    if (!connected || !contract || !web3 || !account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setShowRewards(true);

    try {
      const res : string = await contract.methods.getRewards().call({ from: account });
      const totalReward = web3.utils.fromWei(res, "ether");
      setRewards(totalReward);
    } catch (error) {
      console.error("Failed to get rewards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimRewards = async () => {
    if (!connected || !contract || !web3 || !account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await contract.methods.claimRewards().send({ from: account });
      toast({
        title: "Success",
        description: "Rewards claimed successfully!",
      });
    } catch (error) {
      console.error("Failed to claim rewards:", error);
      toast({
        title: "Error",
        description: "Failed to claim rewards. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="eth-card p-6 space-y-6 max-w-md w-full mx-auto">
      <div className="flex items-center justify-center gap-2">
        <Award size={24} className="text-accent" />
        <h2 className="text-2xl font-bold blue-gradient-text">Your Rewards</h2>
      </div>
      
      {showRewards ? (
        <div className="space-y-6">
          <div className="bg-secondary/30 p-6 rounded-lg text-center backdrop-blur-sm shimmer">
            <p className="text-sm text-muted-foreground mb-2">Available Rewards</p>
            <div className="flex items-center justify-center gap-2">
              <Coins size={24} className="text-accent" />
              <p className="text-3xl font-bold blue-gradient-text">{rewards} ETH</p>
            </div>
          </div>
          
          <Button 
            onClick={handleClaimRewards}
            disabled={isLoading || parseFloat(rewards) <= 0}
            className="w-full blue-gradient-bg hover:opacity-90 transition-opacity text-white flex items-center justify-center gap-2 py-6"
          >
            <Check size={20} />
            Claim Rewards
          </Button>
        </div>
      ) : (
        <Button 
          onClick={handleViewRewards}
          disabled={isLoading || !connected}
          variant="outline"
          className="w-full border-primary/30 hover:border-primary/60 flex items-center justify-center gap-2 py-6"
        >
          <Coins size={20} className="text-primary" />
          See Rewards
        </Button>
      )}
    </div>
  );
};

export default RewardsPanel;
