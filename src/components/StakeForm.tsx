import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowDown, ArrowUp, Coins } from "lucide-react";
import type { AbiItem } from 'web3-utils';
import { Contract } from "web3-eth-contract";
import Web3 from "web3";

interface StakeFormProps {
  connected: boolean;
  contract: Contract<AbiItem[]> | null;
  web3: Web3 | null;
  account: string | null;
}

const StakeForm = ({ connected , contract, web3, account }: StakeFormProps) => {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleStake = async () => {
    if (!connected || !contract || !web3 || !account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const valueInWei = web3.utils.toWei(amount, "ether");
      await contract.methods.stake(valueInWei).send({
        from: account,
        value: valueInWei,
      });

      toast({
        title: "Stake successful",
        description: `You have staked ${amount} ETH successfully.`,
      });

      setAmount("");
    } catch (error) {
      toast({
        title: "Staking failed:",
        description: error?.message || String(error),
        variant: "destructive",
      });
    } finally {
    setIsLoading(false);
  }
  };

  const handleUnstake = async () => {
  if (!connected || !contract || !web3) {
    toast({
      title: "Wallet not connected",
      description: "Please connect your wallet first.",
      variant: "destructive",
    });
    return;
  }

  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    toast({
      title: "Invalid amount",
      description: "Please enter a valid amount to unstake.",
      variant: "destructive",
    });
    return;
  }

  setIsLoading(true);

  try {
    const valueInWei = web3.utils.toWei(amount, "ether");
    await contract.methods.unstake(valueInWei).send({
      from: account,
    });

    toast({
      title: "Unstake successful",
      description: `You have unstaked ${amount} ETH successfully.`,
    });

    setAmount("");
  } catch (error: any) {
    toast({
      title: "Unstaking failed",
      description: error?.message || String(error),
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleMaxClick = () => {
    setAmount("1");
  };

  return (
    <div className="eth-card p-4 md:p-6 space-y-4 md:space-y-6 max-w-md w-full mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-center blue-gradient-text">Stake ETH</h2>
      
      <div className="space-y-4 md:space-y-5">
        <div className="relative">
          <div className="bg-secondary/30 rounded-lg p-2 backdrop-blur-sm">
            <Input
              type="text"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!connected || isLoading}
              className="pr-16 text-base md:text-lg bg-transparent border-none focus-visible:ring-primary/50 h-12 md:h-14"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-3 top-4 md:top-5 text-xs md:text-sm text-primary hover:text-primary/80"
              onClick={handleMaxClick}
              disabled={!connected || isLoading}
            >
              MAX
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <Button 
            onClick={handleStake} 
            disabled={!connected || isLoading}
            className="blue-gradient-bg hover:opacity-90 transition-opacity py-5 md:py-6 text-white flex gap-2"
          >
            <ArrowDown size={16} className="md:size-18" />
            Stake
          </Button>
          
          <Button 
            onClick={handleUnstake}
            disabled={!connected || isLoading}
            variant="outline"
            className="border-primary/30 hover:border-primary/60 py-5 md:py-6 flex gap-2"
          >
            <ArrowUp size={16} className="md:size-18" />
            Unstake
          </Button>
        </div>
      </div>
      
      <div className="pt-3 md:pt-4 border-t border-primary/10">
        <div className="bg-secondary/30 p-3 md:p-4 rounded-lg backdrop-blur-sm">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Estimated APY</p>
          <p className="text-lg md:text-xl font-bold text-accent">5.2%</p>
        </div>
      </div>
    </div>
  );
};

export default StakeForm;
