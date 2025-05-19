
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wallet } from "lucide-react";

interface HeaderProps {
  onConnectionChange?: (connected: boolean, address: string) => void;
}

const Header = ({ onConnectionChange }: HeaderProps) => {
  const { toast } = useToast();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = () => {
    // Simulating wallet connection
    if (connected) {
      setConnected(false);
      setAddress("");
      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected.",
      });
      onConnectionChange?.(false, "");
      return;
    }
    
    // Simulate connection delay
    setTimeout(() => {
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 12);
      setAddress(mockAddress);
      setConnected(true);
      toast({
        title: "Wallet connected",
        description: `Connected to ${mockAddress}`,
      });
      onConnectionChange?.(true, mockAddress);
    }, 500);
  };

  return (
    <header className="py-4 md:py-6 px-4 md:px-6 backdrop-blur-sm border-b border-primary/10">
      <div className="container mx-auto flex items-center justify-between">
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
          className={`gap-1 md:gap-2 py-5 px-3 md:px-6 text-sm ${connected ? 'bg-secondary hover:bg-secondary/80' : 'blue-gradient-bg hover:opacity-90 transition-opacity'}`}
        >
          <Wallet size={16} className="md:size-20" />
          {connected ? 
            <span className="hidden xs:inline">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span> : 
            "Connect Wallet"
          }
        </Button>
      </div>
    </header>
  );
};

export default Header;
