import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useWeb3 } from "@/lib/Web3Context";
import { useState } from "react";
import { ethers } from "ethers";
import AjooGroupABI from "@/lib/AjooGroupABI.json";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

// Minimal ERC20 ABI for USDC approval
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)"
];

const USDC_ADDRESS = "0x5425890298aed601595a70AB815c96711a31Bc65"; // Fuji USDC

export const RotationalSavingsCardsSection = (): JSX.Element => {
  const { account, signer } = useWeb3();
  const { toast } = useToast();
  const [joiningGroupId, setJoiningGroupId] = useState<string | null>(null);

  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleJoin = async (group: any) => {
    if (!account || !signer) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to join a circle.",
        variant: "destructive",
      });
      return;
    }

    if (!group.contract_address) {
      toast({
        title: "Invalid Contract",
        description: "This circle does not have a valid on-chain address yet.",
        variant: "destructive",
      });
      return;
    }

    setJoiningGroupId(group.id);
    try {
      const groupContract = new ethers.Contract(group.contract_address, AjooGroupABI.abi, signer);
      
      // 1. Check if user needs to join the group first
      const memberIndex = await groupContract.memberIndices(account);
      
      if (Number(memberIndex) === 0) {
        toast({ title: "Joining Circle...", description: "Adding your wallet to the group members." });
        const joinTx = await groupContract.joinGroup();
        await joinTx.wait();
        toast({ title: "Joined!", description: "You are now a member. Proceeding to deposit..." });
      }

      // 2. Approve USDC transfer
      const amountInWei = ethers.parseUnits(group.contribution_amount.toString(), 6);
      const usdcContract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);
      
      const currentAllowance = await usdcContract.allowance(account, group.contract_address);
      
      if (currentAllowance < amountInWei) {
        toast({ title: "Approving USDC...", description: "Please confirm the approval transaction." });
        const approveTx = await usdcContract.approve(group.contract_address, amountInWei);
        await approveTx.wait();
      }

      // 3. Call deposit on the AjooGroup contract
      toast({ title: "Depositing...", description: "Please confirm the deposit transaction." });
      const depositTx = await groupContract.deposit();
      await depositTx.wait();

      toast({
        title: "Successfully Joined & Contributed!",
        description: `You have joined and paid your contribution for ${group.name}.`,
      });
      
    } catch (error: any) {
      console.error("Error joining circle:", error);
      toast({
        title: "Transaction failed",
        description: error.message || "Transaction reverted",
        variant: "destructive",
      });
    } finally {
      setJoiningGroupId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-300" />
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="text-surface-500 py-8 text-center font-body-md">
        No active circles found. Create one to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {groups.map((poolData) => {
        const participantsTotal = 4; // Placeholder for now, could be dynamic
        const participantsCurrent = 1; // Placeholder
        const participantSquares = Array.from(
          { length: participantsTotal },
          (_, i) => ({
            filled: i < participantsCurrent,
          })
        );
        
        const shortHost = poolData.creator_address 
          ? `${poolData.creator_address.slice(0, 6)}...${poolData.creator_address.slice(-4)}`
          : "Unknown";
          
        const cycleDays = poolData.cycle_duration ? Math.floor(poolData.cycle_duration / (24 * 60 * 60)) : 0;
        const isJoining = joiningGroupId === poolData.id;

        return (
          <Card key={poolData.id} className="w-full bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-[#cbcfd299] transition-transform hover:scale-[1.02]">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2.5">
                <Avatar className="w-[46px] h-[46px] bg-primary-400">
                  <AvatarFallback className="bg-primary-400 font-title-xl font-[number:var(--title-xl-font-weight)] text-primary-200 text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
                    {poolData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-1">
                  <Link href={`/dashboard/circle/${poolData.id}`}>
                    <a className="font-title-xl font-[number:var(--title-xl-font-weight)] text-white hover:text-primary-300 transition-colors text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
                      {poolData.name}
                    </a>
                  </Link>
                  <p className="font-body-md font-[number:var(--body-md-font-weight)] text-surface-500 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                    Hosted by {shortHost}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className="h-auto bg-[#6e17174c] rounded border-[0.5px] border-[#c92929] font-body-md font-[number:var(--body-md-font-weight)] text-danger-200 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] hover:bg-[#6e17174c]">
                  AVALANCHE
                </Badge>
                <Badge className="h-auto bg-[#33383d4c] rounded border-[0.5px] border-[#8e979f] font-body-md font-[number:var(--body-md-font-weight)] text-surface-500 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] hover:bg-[#33383d4c]">
                  {cycleDays} days Cycle
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-[18px]">
                <Card className="bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-[#cbcfd299]">
                  <CardContent className="p-6 space-y-1">
                    <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                      CONTRIBUTION
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="[font-family:'Syne',Helvetica] font-normal text-surface-50 text-[32px] tracking-[0] leading-[48px]">
                        {poolData.contribution_amount || 0}
                      </span>
                      <span className="font-body-lg font-[number:var(--body-lg-font-weight)] text-surface-500 text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
                        USDC
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-[#cbcfd299]">
                  <CardContent className="p-6 space-y-1">
                    <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                      POOL TOTAL
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="[font-family:'Syne',Helvetica] font-normal text-surface-50 text-[32px] tracking-[0] leading-[48px]">
                        {(poolData.contribution_amount || 0) * participantsTotal}
                      </span>
                      <span className="font-body-lg font-[number:var(--body-lg-font-weight)] text-surface-500 text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
                        USDC
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                    PARTICIPANTS ({participantsCurrent}/
                    {participantsTotal})
                  </p>
                  <div className="flex items-center gap-1">
                    {participantSquares.map((square, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-md ${
                          square.filled ? "bg-primary-300" : "bg-[#d9d9d9]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                    STARTS IN
                  </p>
                  <p className="font-body-lg font-[number:var(--body-lg-font-weight)] text-white text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
                    Pending
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 bg-[#202327b2] rounded-xl">
                <img
                  className="w-3.5 h-[12.23px]"
                  alt="Staking icon"
                  src="/figmaAssets/group-3-1.png"
                />
                <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-white text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                  Stake Avax on completion
                </p>
              </div>

              <Button 
                onClick={() => handleJoin(poolData)}
                disabled={isJoining}
                className="w-full h-auto bg-opacityprimary rounded-xl border-[0.5px] border-[#87bbb7] font-body-md font-[number:var(--body-md-font-weight)] text-primary-100 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] hover:bg-opacityprimary/80"
              >
                {isJoining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isJoining ? "JOINING..." : `JOIN CIRCLE - ${participantsTotal - participantsCurrent} SPOTS LEFT`}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
