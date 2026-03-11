import { DashboardLayout } from "./DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useWeb3 } from "@/lib/Web3Context";
import { Loader2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export const DashboardAssets = (): JSX.Element => {
  const { account, connectWallet, isConnecting } = useWeb3();

  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups", "assets"],
    enabled: !!account,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (!account) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[75vh] gap-8 px-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary-500/20 blur-xl rounded-full" />
            <div className="relative p-8 bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl">
              <Wallet className="w-16 h-12 text-primary-300" />
            </div>
          </div>
          
          <div className="max-w-md text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-title-xl tracking-tight">
              Connect to View Assets
            </h2>
            <p className="text-surface-500 font-body-md text-lg leading-relaxed">
              Connect your wallet to track your portfolio balance, active savings, and yield across all circles.
            </p>
          </div>

          <Button 
            onClick={() => connectWallet()}
            disabled={isConnecting}
            className="group relative bg-primary-300 hover:bg-primary-400 text-primary-950 font-bold px-10 py-8 rounded-2xl text-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary-900/20"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                CONNECTING...
              </>
            ) : (
              <>
                <Wallet className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" />
                CONNECT WALLET
              </>
            )}
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate total balance from all active contributions
  const totalRotationalSavings = groups?.reduce((sum, group) => {
    return sum + Number(group.contribution_amount || 0);
  }, 0) || 0;

  const totalYield = 0; // Coming soon
  const netWorth = totalRotationalSavings + totalYield;

  const assetCards = [
    {
      label: "YIELD GENERATION",
      value: `$${totalYield.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      gain: "+$0.00",
      pct: "+0.0%",
    },
    {
      label: "ROTATIONAL SAVINGS",
      value: `$${totalRotationalSavings.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      gain: "Active",
      pct: "",
    },
    {
      label: "NET WORTH",
      value: `$${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      gain: "Total Value",
      pct: "",
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 max-w-[1200px] flex flex-col gap-12 lg:gap-16 py-8 lg:py-12">
        <header className="flex flex-col gap-2">
          <h1 className="[font-family:'Syne',Helvetica] font-semibold text-surface-100 text-2xl lg:text-[34px] tracking-[0] leading-[48px]">
            YOUR ASSETS
          </h1>
          <p className="text-primary-300 text-sm font-medium tracking-wide">LIVE PORTFOLIO TRACKING</p>
        </header>

        <Card className="bg-[#1212124c] rounded-3xl border-[0.2px] border-solid border-[#cbcfd299] overflow-hidden">
          <CardContent className="p-6 lg:p-8">
            <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-sm leading-[20px] uppercase tracking-wider">
              Total Portfolio Balance
            </p>
            <p className="font-['Syne',sans-serif] text-[#f7f9fd] text-4xl lg:text-[48px] leading-[64px] mt-2 font-bold tracking-tight">
              ${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="font-['Inter',sans-serif] font-normal text-success-100 text-sm leading-[18px] mt-2">
              Tracking live assets
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {assetCards.map((card, i) => (
            <Card
              key={i}
              className="bg-[#1212124c] rounded-3xl border-[0.2px] border-solid border-[#cbcfd299] overflow-hidden hover:border-primary-300/50 transition-colors"
            >
              <CardContent className="p-6 lg:p-8 flex flex-col gap-1 h-[160px] justify-center">
                <p className="font-['Inter',sans-serif] font-semibold text-[#8e979f] text-xs leading-[24px] uppercase tracking-wider">
                  {card.label}
                </p>
                <p className="font-['Syne',sans-serif] font-bold text-primary-100 text-2xl lg:text-[34px] leading-[48px] tracking-tight">
                  {card.value}
                </p>
                <p className="font-['Inter',sans-serif] font-medium text-surface-500 text-sm leading-[20px]">
                  {card.gain} &nbsp;
                  <span className="text-success-100">{card.pct}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-4">
          <div className="flex items-center gap-4 mb-8">
            <p className="font-['Inter',sans-serif] font-semibold text-[#8e979f] text-xs tracking-[1.2px] leading-[18px] whitespace-nowrap uppercase">
              Active Circles
            </p>
            <div className="flex-1 h-[0.2px] bg-[#8e979f]/30" />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary-300" />
            </div>
          ) : !groups || groups.length === 0 ? (
            <div className="text-center py-12 text-surface-500 bg-[#1212124c] rounded-3xl border-[0.2px] border-[#cbcfd299]">
              No active circles found. Join or create one to start growing your assets!
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {groups.map((group) => {
                const cycleDays = group.cycle_duration ? Math.floor(group.cycle_duration / (24 * 60 * 60)) : 0;
                
                return (
                  <Card
                    key={group.id}
                    className="bg-[#1212124c] rounded-3xl border-[0.2px] border-solid border-[#cbcfd299] overflow-hidden hover:bg-[#1a1a1a] transition-colors"
                  >
                    <CardContent className="p-5 lg:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-6">
                        
                        <div className="flex items-center gap-4 min-w-[200px]">
                          <div className="w-12 h-12 rounded-full bg-primary-400 flex items-center justify-center font-bold text-primary-200 text-xl font-heading-md">
                            {group.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="font-['Syne',sans-serif] font-bold text-white text-xl lg:text-2xl leading-tight">
                              {group.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="font-['Inter',sans-serif] text-surface-500 text-sm">Rotational Savings</span>
                              <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#6e17174c] text-danger-200 border border-[#c92929]/50">
                                AVAX Fuji
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <p className="font-['Inter',sans-serif] text-surface-500 text-xs uppercase tracking-wider">Contribution</p>
                          <p className="font-['Syne',sans-serif] font-bold text-white text-xl">
                            {group.contribution_amount} USDC
                          </p>
                        </div>

                        <div className="flex flex-col gap-1 hidden sm:flex">
                          <p className="font-['Inter',sans-serif] text-surface-500 text-xs uppercase tracking-wider">Cycle</p>
                          <p className="font-['Inter',sans-serif] font-medium text-white text-base">
                            {cycleDays} Days
                          </p>
                        </div>

                        <div className="ml-auto flex shrink-0">
                          <Link href={`/dashboard/circle/${group.id}`}>
                            <Button className="bg-primary-300/20 hover:bg-primary-300 text-primary-100 hover:text-primary-950 border border-primary-300/50 rounded-xl px-8 py-6 h-auto font-bold transition-all">
                              Manage
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        <div className="pb-16 lg:pb-24" />
      </div>
    </DashboardLayout>
  );
};
