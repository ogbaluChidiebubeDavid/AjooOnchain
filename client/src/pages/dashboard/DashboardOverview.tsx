import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PortfolioBalanceOverviewSection } from "./sections/PortfolioBalanceOverviewSection";
import { RotationalSavingsCardsSection } from "./sections/RotationalSavingsCardsSection";
import { RotationalSavingsInfoSection } from "./sections/RotationalSavingsInfoSection";
import { DashboardLayout } from "./DashboardLayout";
import { CreateCircleModal } from "./components/CreateCircleModal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useWeb3 } from "@/lib/Web3Context";
import { Button } from "@/components/ui/button";
import { Wallet, Loader2 } from "lucide-react";

export const DashboardOverview = (): JSX.Element => {
  const { account, connectWallet, isConnecting } = useWeb3();
  
  const { data: groups } = useQuery({
    queryKey: ["groups", "overview"],
    enabled: !!account,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*");
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
              Connect to AJOO
            </h2>
            <p className="text-surface-500 font-body-md text-lg leading-relaxed">
              Your wallet is your identity. Connect to view your savings, manage circles, and track your earned yield.
            </p>
          </div>

          <Button 
            onClick={() => {
              console.log("Connect wallet clicked");
              connectWallet();
            }}
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
          
          <p className="text-surface-600 text-sm font-mono">
            Securely access the Avalanche Fuji Testnet
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const activeCirclesCount = groups?.length || 0;
  
  let nextPayout = "Pending";
  if (groups && groups.length > 0) {
     const nextGroup = groups[0];
     if (nextGroup.cycle_duration) {
       const days = Math.floor(nextGroup.cycle_duration / (24 * 60 * 60));
       nextPayout = `${days} days`;
     }
  }

  const statsData = [
    {
      label: "ACTIVE CIRCLE",
      value: activeCirclesCount.toString(),
      description: "Rotational Savings",
    },
    {
      label: "YIELD POOL",
      value: "0",
      description: "Coming soon",
    },
    {
      label: "NEXT PAYOUT",
      value: nextPayout,
      description: groups && groups.length > 0 ? groups[0].name : "No active pools",
    },
    {
      label: "TOTAL PNL",
      value: "Calculated from Aave",
      description: "All Positions",
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 max-w-[1200px] flex flex-col gap-10 lg:gap-14 py-8 lg:py-12">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="[font-family:'Syne',Helvetica] font-bold text-surface-100 text-3xl lg:text-[42px] tracking-tight leading-tight">
              Dashboard
            </h1>
            <p className="text-surface-500 font-body-md">Welcome back, {account.slice(0, 6)}...{account.slice(-4)}</p>
          </div>
          <CreateCircleModal />
        </header>

        {/* Dynamic Stats Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className="bg-[#1212124c] rounded-3xl border-[0.2px] border-solid border-[#cbcfd299] overflow-hidden hover:border-primary-300/50 transition-colors"
            >
              <CardContent className="p-6 lg:p-8 flex flex-col h-[160px] lg:h-[180px]">
                <div className="font-body-lg text-surface-500 tracking-wider text-xs uppercase font-semibold">
                  {stat.label}
                </div>

                <div className="mt-3 font-heading-md text-primary-100 text-2xl lg:text-3xl tracking-tight font-bold">
                  {stat.value}
                </div>

                <div className="mt-auto text-surface-500 text-xs lg:text-sm italic">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Portfolio Section */}
        <section>
          <PortfolioBalanceOverviewSection />
        </section>

        {/* Rotational Savings Section - consolidated to prevent clustering */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="font-bold text-surface-100 text-lg lg:text-xl tracking-wider uppercase">
              Available Rotational Savings
            </div>
            <Separator className="flex-1 mx-6 bg-white/10" />
            <Button variant="ghost" className="text-primary-300 hover:text-primary-200">
              View all
            </Button>
          </div>
          
          <RotationalSavingsCardsSection />
        </section>

        <RotationalSavingsInfoSection />

        <div className="pb-16 lg:pb-24" />
      </div>
    </DashboardLayout>
  );
};
