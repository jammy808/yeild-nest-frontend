import { useState } from "react";
import Header from "@/components/Header";
import StakeForm from "@/components/StakeForm";
import RewardsPanel from "@/components/RewardsPanel";
import StakingStats from "@/components/StakingStats";

const Index = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");


  const handleConnectionChange = (status: boolean, address: string) => {
    setConnected(status);
    setWalletAddress(address);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onConnectionChange={handleConnectionChange} />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 blue-gradient-text">
              Yield Nest
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground">
              Stake your ETH securely and earn rewards with our trusted staking platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <StakeForm connected={connected} />
            <RewardsPanel connected={connected} />
          </div>
          
          <StakingStats />
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
