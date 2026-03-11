import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useWeb3 } from "@/lib/Web3Context";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import AjooGroupABI from "@/lib/AjooGroupABI.json";
import { useToast } from "@/hooks/use-toast";

// Minimal ERC20 ABI for USDC approval
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)"
];

const USDC_ADDRESS = "0x5425890298aed601595a70AB815c96711a31Bc65"; // Fuji USDC

const PoolCard = ({ group, onJoin, isJoining, provider }: { group: any, onJoin: (g: any) => void, isJoining: boolean, provider: any }) => {
  const [count, setCount] = useState<number | null>(null);
  const [max, setMax] = useState<number>(4);

  useEffect(() => {
    if (!group.contract_address || !provider) return;
    
    const fetchCount = async () => {
      try {
        const contract = new ethers.Contract(group.contract_address, AjooGroupABI.abi, provider);
        let i = 0;
        while (i < 10) { 
          try {
            await contract.members(i);
            i++;
          } catch (err) {
            break;
          }
        }
        setCount(i);
        
        try {
          const maxMembers = await contract.maxMembers();
          setMax(Number(maxMembers));
        } catch (e) {}
      } catch (err) {
        console.error("Failed to fetch participant count:", err);
      }
    };
    
    fetchCount();
  }, [group.contract_address, provider]);

  const shortHost = group.creator_address 
    ? `${group.creator_address.slice(0, 6)}...${group.creator_address.slice(-4)}`
    : "Unknown";
    
  const cycleDays = group.cycle_duration ? Math.floor(group.cycle_duration / (24 * 60 * 60)) : 0;
  const participantsTotal = max;
  const participantsCurrent = count ?? 0;
  
  const participantSlots = Array.from(
    { length: participantsTotal },
    (_, i) => ({
      filled: i < participantsCurrent,
    })
  );

  const stats = [
    {
      label: "CONTRIBUTION",
      value: group.contribution_amount || 0,
      currency: "USDC",
    },
    {
      label: "POOL TOTAL",
      value: (group.contribution_amount || 0) * participantsTotal,
      currency: "USDC",
    },
  ];

  return (
    <Card className="w-full max-w-[470px] bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-solid border-[#cbcfd299]">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <Avatar className="w-[46px] h-[46px] bg-primary-400">
            <AvatarFallback className="bg-primary-400 font-title-xl text-primary-200">
              {group.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <Link href={`/dashboard/circle/${group.id}`}>
              <a className="font-title-xl text-white hover:text-primary-300 transition-colors">
                {group.name}
              </a>
            </Link>
            <p className="font-body-md text-surface-500">
              Hosted by {shortHost}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-[#6e17174c] text-danger-200 border-[#c92929]">AVALANCHE</Badge>
          <Badge className="bg-[#33383d4c] text-surface-500 border-[#8e979f]">
            {cycleDays} days Cycle
          </Badge>
        </div>

        <div className="flex items-center gap-[18px]">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="flex-1 bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-solid border-[#cbcfd299]"
            >
              <CardContent className="p-6 space-y-1">
                <p className="text-surface-500 text-xs uppercase font-semibold">
                  {stat.label}
                </p>
                <div className="flex items-end gap-1">
                  <span className="[font-family:'Syne',Helvetica] text-surface-50 text-2xl font-bold">
                    {stat.value}
                  </span>
                  <span className="text-surface-500 text-sm">
                    {stat.currency}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-body-sm font-semibold text-surface-500 text-xs uppercase">
              PARTICIPANTS ({count === null ? "..." : participantsCurrent}/{participantsTotal})
            </p>
            <div className="flex items-center gap-1">
              {participantSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-md ${
                    slot.filled ? "bg-primary-300" : "bg-[#d9d9d922]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <p className="text-surface-500 text-xs uppercase font-semibold">STARTS IN</p>
            <p className="text-white text-sm font-semibold">Pending</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 bg-[#202327b2] rounded-xl">
          <p className="text-white text-xs">Stake Avax on completion</p>
        </div>

        <Button 
          onClick={() => onJoin(group)}
          disabled={isJoining}
          className="h-auto w-full bg-primary-300 hover:bg-primary-400 text-primary-950 font-bold py-6 text-lg"
        >
          {isJoining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isJoining ? "PROCESSING..." : `JOIN CIRCLE - ${participantsTotal - participantsCurrent} SPOTS LEFT`}
        </Button>
      </CardContent>
    </Card>
  );
};

export const RotationalSavingsPoolsSection = (): JSX.Element => {
  const { account, signer, provider } = useWeb3();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [joiningGroupId, setJoiningGroupId] = useState<string | null>(null);

  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups", "pools"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(2);
      if (error) throw error;
      return data;
    },
  });

  const handleJoin = async (group: any) => {
    if (!account || !signer || !provider) {
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
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 43113) {
        throw new Error("Please switch your wallet to Avalanche Fuji Testnet.");
      }

      const usdcContract = new ethers.Contract(USDC_ADDRESS, [
        ...ERC20_ABI,
        "function balanceOf(address account) external view returns (uint256)"
      ], signer);
      
      const usdcBalance = await usdcContract.balanceOf(account);
      const amountInWei = ethers.parseUnits(group.contribution_amount.toString(), 6);
      
      if (usdcBalance < amountInWei) {
        throw new Error(`Insufficient USDC. You need ${group.contribution_amount} USDC.`);
      }

      const groupContract = new ethers.Contract(group.contract_address, AjooGroupABI.abi, signer);
      
      let memberIndex;
      try {
        memberIndex = await groupContract.memberIndices(account);
      } catch (err) {
        throw new Error("This circle uses an older contract version.");
      }
      
      if (Number(memberIndex) === 0) {
        toast({ title: "Joining Circle...", description: "Adding your wallet to the group." });
        const joinTx = await groupContract.joinGroup();
        await joinTx.wait();
        toast({ title: "Joined!", description: "You are now a member. Now sending deposit..." });
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      }

      const currentAllowance = await usdcContract.allowance(account, group.contract_address);
      
      if (currentAllowance < amountInWei) {
        toast({ title: "Approving USDC...", description: "Please confirm approval." });
        const approveTx = await usdcContract.approve(group.contract_address, amountInWei);
        await approveTx.wait();
      }

      toast({ title: "Depositing...", description: "Please confirm deposit." });
      const depositTx = await groupContract.deposit();
      await depositTx.wait();

      toast({
        title: "Success!",
        description: `You have joined and contributed to ${group.name}.`,
      });
      
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      
    } catch (error: any) {
      console.error("Error joining circle:", error);
      toast({
        title: "Action failed",
        description: error.reason || error.message || "Transaction reverted",
        variant: "destructive",
      });
    } finally {
      setJoiningGroupId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="w-6 h-6 animate-spin text-primary-300" />
      </div>
    );
  }

  if (!groups || groups.length === 0) return <></>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {groups.map((group) => (
        <PoolCard 
          key={group.id} 
          group={group} 
          onJoin={handleJoin} 
          isJoining={joiningGroupId === group.id} 
          provider={provider} 
        />
      ))}
    </div>
  );
};
