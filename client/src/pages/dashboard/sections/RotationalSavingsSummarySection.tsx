import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useWeb3 } from "@/lib/Web3Context";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import AjooGroupABI from "@/lib/AjooGroupABI.json";
import { Link } from "wouter";

const SummaryCard = ({ group, provider }: { group: any, provider: any }) => {
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
        console.error("Failed to fetch summary participant count:", err);
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
  
  const participantDots = Array.from(
    { length: participantsTotal },
    (_, i) => ({
      filled: i < participantsCurrent,
    })
  );

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
            <Card className="flex-1 bg-[#1212124c] rounded-3xl border-[0.2px] border-[#cbcfd299]">
              <CardContent className="p-6">
                <p className="text-surface-500 text-xs uppercase font-semibold mb-1">CONTRIBUTION</p>
                <div className="flex items-end">
                  <span className="[font-family:'Syne',Helvetica] text-surface-50 text-2xl font-bold">
                    {group.contribution_amount || 0}
                  </span>
                  <span className="text-surface-500 text-sm ml-1">USDC</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="flex-1 bg-[#1212124c] rounded-3xl border-[0.2px] border-[#cbcfd299]">
              <CardContent className="p-6">
                <p className="text-surface-500 text-xs uppercase font-semibold mb-1">POOL TOTAL</p>
                <div className="flex items-end">
                  <span className="[font-family:'Syne',Helvetica] text-surface-50 text-2xl font-bold">
                    {(group.contribution_amount || 0) * participantsTotal}
                  </span>
                  <span className="text-surface-500 text-sm ml-1">USDC</span>
                </div>
              </CardContent>
            </Card>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-body-sm font-semibold text-surface-500 text-xs uppercase">
              PARTICIPANTS ({count === null ? "..." : participantsCurrent}/{participantsTotal})
            </p>
            <div className="flex items-center gap-1">
              {participantDots.map((dot, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-md ${
                    dot.filled ? "bg-primary-300" : "bg-[#d9d9d922]"
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

        <Link href={`/dashboard/circle/${group.id}`}>
          <Button className="h-auto w-full bg-primary-300 hover:bg-primary-400 text-primary-950 font-bold py-6 text-lg">
            VIEW CIRCLE DETAILS
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export const RotationalSavingsSummarySection = (): JSX.Element => {
  const { provider } = useWeb3();
  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups", "summary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="w-6 h-6 animate-spin text-primary-300" />
      </div>
    );
  }

  const group = groups?.[0];
  if (!group) return <></>;

  return <SummaryCard group={group} provider={provider} />;
};
