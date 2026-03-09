import React, { useState } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/Web3Context";
import { supabase } from "@/lib/supabase";
import AjooFactoryABI from "@/lib/AjooFactoryABI.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Loader2 } from "lucide-react";

// Placeholder for the deployed Factory address on Fuji
// You will need to update this after running the deploy script
const FACTORY_ADDRESS = "0xE9412467A7cB0DeABD24C2044758Ffa945f87bd3"; 

export const CreateCircleModal = () => {
  const { account, signer } = useWeb3();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "10",
    duration: "7", // days
  });

  const handleCreate = async () => {
    if (!account || !signer) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a circle.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // 1. Deploy on-chain via Factory
      const factoryContract = new ethers.Contract(FACTORY_ADDRESS, AjooFactoryABI.abi, signer);
      
      // Fuji Addresses for Aave & USDC
      const usdcAddress = "0x5425890298aed601595a70AB815c96711a31Bc65";
      const aavePoolAddress = "0x794a61358D6845594F94dc1DB02A252b5b4814aD";
      const aUSDCAddress = "0x65A04eC763f72AD8C5F4170707328E07340e698E";
      
      const amountInWei = ethers.parseUnits(formData.amount, 6); // Assuming USDC (6 decimals)
      const durationInSeconds = parseInt(formData.duration) * 24 * 60 * 60;
      const initialMembers = [account]; // Creator is the first member

      // Call createGroup on the factory
      const tx = await factoryContract.createGroup(
        usdcAddress,
        aavePoolAddress,
        aUSDCAddress,
        amountInWei,
        durationInSeconds,
        initialMembers
      );

      toast({
        title: "Transaction Submitted",
        description: "Waiting for blockchain confirmation...",
      });

      const receipt = await tx.wait();
      
      // Extract the new group address from the event
      let newGroupAddress = `UNKNOWN_ADDRESS_${Date.now()}`;
      
      for (const log of receipt.logs) {
        try {
          const parsedLog = factoryContract.interface.parseLog({
            topics: [...log.topics],
            data: log.data
          });
          
          if (parsedLog && parsedLog.name === 'GroupCreated') {
            newGroupAddress = parsedLog.args[0];
            break;
          }
        } catch (e) {
          // Ignore logs that don't match the ABI
        }
      }

      // 2. Save metadata to Supabase
      const { data, error } = await supabase
        .from('groups')
        .insert({
          contract_address: newGroupAddress,
          name: formData.name,
          description: formData.description,
          creator_address: account.toLowerCase(),
          contribution_amount: formData.amount,
          cycle_duration: durationInSeconds,
          cycle_duration_days: parseInt(formData.duration),
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Circle Created Successfully!",
        description: `${formData.name} is now live on Avalanche.`,
      });
      
      setIsOpen(false);
      setFormData({ name: "", description: "", amount: "10", duration: "7" });
    } catch (error: any) {
      console.error("Error creating circle:", error);
      toast({
        title: "Creation failed",
        description: error.message || "Transaction reverted",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary-300 hover:bg-primary-400 text-primary-950 font-bold rounded-full px-6 shadow-lg shadow-primary-900/20">
          <PlusCircle className="mr-2 h-5 w-5" />
          CREATE NEW CIRCLE
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#121212] border-[#cbcfd233] text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary-100">Create Ajoo Circle</DialogTitle>
          <DialogDescription className="text-surface-500">
            Set up your rotational savings group metadata.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-surface-100">Circle Name</Label>
            <Input
              id="name"
              placeholder="e.g. Family Savings"
              className="bg-[#1a1a1a] border-[#cbcfd233] focus:border-primary-300 transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-surface-100">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="What is this circle for?"
              className="bg-[#1a1a1a] border-[#cbcfd233] focus:border-primary-300 transition-colors min-h-[80px]"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-surface-100">Contribution (USDC)</Label>
              <Input
                id="amount"
                type="number"
                className="bg-[#1a1a1a] border-[#cbcfd233] focus:border-primary-300 transition-colors"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration" className="text-surface-100">Cycle (Days)</Label>
              <Input
                id="duration"
                type="number"
                className="bg-[#1a1a1a] border-[#cbcfd233] focus:border-primary-300 transition-colors"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleCreate} 
            disabled={isLoading || !formData.name}
            className="w-full bg-primary-300 hover:bg-primary-400 text-primary-950 font-bold py-6 text-lg"
          >
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "LAUNCH CIRCLE"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
