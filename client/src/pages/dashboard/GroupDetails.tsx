import { useParams } from "wouter";
import { DashboardLayout } from "./DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useWeb3 } from "@/lib/Web3Context";
import { useState } from "react";
import { ethers } from "ethers";
import AjooGroupABI from "@/lib/AjooGroupABI.json";
import { useToast } from "@/hooks/use-toast";

// Minimal ERC20 ABI for USDC approval
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)"
];

const USDC_ADDRESS = "0x5425890298aed601595a70AB815c96711a31Bc65"; // Fuji USDC

export const GroupDetails = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { account, signer, provider } = useWeb3();
  const { toast } = useToast();
  const [isJoining, setIsJoining] = useState(false);

  const { data: group, isLoading } = useQuery({
    queryKey: ["group", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: membersList, isLoading: isMembersLoading } = useQuery({
    queryKey: ["groupMembers", group?.contract_address],
    enabled: !!group?.contract_address && !!provider,
    queryFn: async () => {
      const groupContract = new ethers.Contract(group.contract_address, AjooGroupABI.abi, provider);
      const members = [];
      let i = 0;
      while (true) {
        try {
          const memberData = await groupContract.members(i);
          members.push({
            account: memberData[0],
            hasContributedThisCycle: memberData[1],
            totalContributed: ethers.formatUnits(memberData[2], 6), // assuming 6 decimals
          });
          i++;
        } catch (err) {
          // Reverts when index is out of bounds
          break;
        }
      }
      return members;
    },
  });

  const handleJoin = async () => {
    console.log("Initiating join for group in details:", group?.name, group?.contract_address);
    if (!account || !signer) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to join.",
        variant: "destructive",
      });
      return;
    }

    if (!group?.contract_address) {
      toast({
        title: "Invalid Contract",
        description: "This circle does not have a valid on-chain address yet.",
        variant: "destructive",
      });
      return;
    }

    setIsJoining(true);
    try {
      console.log("Instantiating contract at:", group.contract_address);
      const groupContract = new ethers.Contract(group.contract_address, AjooGroupABI.abi, signer);
      
      console.log("Checking if user is already a member...");
      const memberIndex = await groupContract.memberIndices(account);
      console.log("Member index:", memberIndex);
      
      if (Number(memberIndex) === 0) {
        console.log("User is not a member. Sending joinGroup transaction...");
        toast({ title: "Joining Circle...", description: "Adding your wallet to the group members." });
        const joinTx = await groupContract.joinGroup();
        console.log("Join TX hash:", joinTx.hash);
        await joinTx.wait();
        toast({ title: "Joined!", description: "You are now a member. Proceeding to deposit..." });
      }

      console.log("Formatting contribution amount:", group.contribution_amount);
      const amountInWei = ethers.parseUnits(group.contribution_amount.toString(), 6);
      const usdcContract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);
      
      console.log("Checking USDC allowance...");
      const currentAllowance = await usdcContract.allowance(account, group.contract_address);
      console.log("Current allowance:", currentAllowance.toString());
      
      if (currentAllowance < amountInWei) {
        console.log("Insufficient allowance. Sending approve transaction...");
        toast({ title: "Approving USDC...", description: "Please confirm the approval transaction." });
        const approveTx = await usdcContract.approve(group.contract_address, amountInWei);
        console.log("Approve TX hash:", approveTx.hash);
        await approveTx.wait();
      }

      console.log("Sending deposit transaction...");
      toast({ title: "Depositing...", description: "Please confirm the deposit transaction." });
      const depositTx = await groupContract.deposit();
      console.log("Deposit TX hash:", depositTx.hash);
      await depositTx.wait();

      console.log("Successfully joined and deposited!");
      toast({
        title: "Successfully Joined!",
        description: `You have joined ${group.name}.`,
      });
      
    } catch (error: any) {
      console.error("Error joining circle:", error);
      toast({
        title: "Join failed",
        description: error.message || "Transaction reverted",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary-300" />
        </div>
      </DashboardLayout>
    );
  }

  if (!group) {
    return (
      <DashboardLayout>
        <div className="py-24 text-center text-surface-500">Group not found</div>
      </DashboardLayout>
    );
  }

  const shortHost = group.creator_address 
    ? `${group.creator_address.slice(0, 6)}...${group.creator_address.slice(-4)}`
    : "Unknown";

  const cycleDays = group.cycle_duration ? Math.floor(group.cycle_duration / (24 * 60 * 60)) : 0;

  return (
    <DashboardLayout>
      <header className="pt-8 lg:pt-[100px] pb-8 lg:pb-12 flex flex-col gap-4">
        <Link href="/dashboard">
          <a className="inline-flex items-center text-sm text-surface-500 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </a>
        </Link>
        <h1 className="[font-family:'Syne',Helvetica] font-semibold text-surface-100 text-2xl lg:text-[34px] tracking-[0] leading-[48px]">
          {group.name}
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-[#cbcfd299]">
            <CardHeader>
              <CardTitle className="text-white text-xl">Circle Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.description && (
                <div>
                  <h4 className="text-surface-500 text-sm mb-1">Description</h4>
                  <p className="text-white text-base">{group.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-surface-500 text-sm mb-1">Host</h4>
                  <p className="text-white text-base">{shortHost}</p>
                </div>
                <div>
                  <h4 className="text-surface-500 text-sm mb-1">Network</h4>
                  <Badge className="bg-[#6e17174c] text-danger-200 border-[#c92929]">AVALANCHE</Badge>
                </div>
                <div>
                  <h4 className="text-surface-500 text-sm mb-1">Contract Address</h4>
                  <p className="text-white text-sm font-mono break-all">{group.contract_address || "Pending Deployment"}</p>
                </div>
                <div>
                  <h4 className="text-surface-500 text-sm mb-1">Created At</h4>
                  <p className="text-white text-base">{new Date(group.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-[#cbcfd299]">
            <CardHeader>
              <CardTitle className="text-white text-xl">Members ({membersList?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {isMembersLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-300" />
                </div>
              ) : membersList && membersList.length > 0 ? (
                <div className="space-y-4">
                  {membersList.map((member: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-[#1a1a1a] border border-[#333]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center text-primary-950 font-bold text-xs">
                          {index + 1}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white text-sm font-mono">{`${member.account.slice(0, 6)}...${member.account.slice(-4)}`}</span>
                          <span className="text-surface-500 text-xs">Total: {member.totalContributed} USDC</span>
                        </div>
                      </div>
                      <Badge className={member.hasContributedThisCycle ? "bg-success-200/20 text-success-100 border-success-200/50" : "bg-danger-200/20 text-danger-200 border-danger-200/50"}>
                        {member.hasContributedThisCycle ? "PAID" : "PENDING"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-surface-500">No members found or contract not deployed yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-[#cbcfd299]">
            <CardHeader>
              <CardTitle className="text-white text-xl">Deposit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-surface-500 text-sm mb-1">Contribution Amount</h4>
                <p className="[font-family:'Syne',Helvetica] font-normal text-surface-50 text-[32px] tracking-[0] leading-[48px]">
                  {group.contribution_amount || 0} <span className="text-lg text-surface-500">USDC</span>
                </p>
              </div>

              <div>
                <h4 className="text-surface-500 text-sm mb-1">Cycle Duration</h4>
                <p className="text-white text-lg">{cycleDays} Days</p>
              </div>

              <Button 
                onClick={handleJoin}
                disabled={isJoining}
                className="w-full bg-primary-300 hover:bg-primary-400 text-primary-950 font-bold py-6 text-lg"
              >
                {isJoining ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                {isJoining ? "PROCESSING..." : "JOIN & DEPOSIT"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="pb-16 lg:pb-24" />
    </DashboardLayout>
  );
};
