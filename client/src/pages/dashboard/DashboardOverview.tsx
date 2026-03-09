import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PortfolioBalanceOverviewSection } from "./sections/PortfolioBalanceOverviewSection";
import { RotationalSavingsCardsSection } from "./sections/RotationalSavingsCardsSection";
import { RotationalSavingsInfoSection } from "./sections/RotationalSavingsInfoSection";
import { RotationalSavingsPoolsSection } from "./sections/RotationalSavingsPoolsSection";
import { RotationalSavingsSummarySection } from "./sections/RotationalSavingsSummarySection";
import { YieldGenerationCardsSection } from "./sections/YieldGenerationCardsSection";
import { YieldGenerationSummarySection } from "./sections/YieldGenerationSummarySection";
import { YieldPoolCardsSection } from "./sections/YieldPoolCardsSection";
import { YieldPoolInfoSection } from "./sections/YieldPoolInfoSection";
import { DashboardLayout } from "./DashboardLayout";
import { CreateCircleModal } from "./components/CreateCircleModal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useWeb3 } from "@/lib/Web3Context";
import { Button } from "@/components/ui/button";
import { Wallet, Loader2 } from "lucide-react";

export const DashboardOverview = (): JSX.Element => {
  const { account, connectWallet, isConnecting } = useWeb3();
  
  const { data: groups, isLoading: isGroupsLoading } = useQuery({
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
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 px-6">
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
            onClick={connectWallet}
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
      <header className="pt-8 lg:pt-[100px] pb-8 lg:pb-12 flex items-center justify-between">
        <h1 className="[font-family:'Syne',Helvetica] font-semibold text-surface-100 text-2xl lg:text-[34px] tracking-[0] leading-[48px]">
          OVERVIEW
        </h1>
        <CreateCircleModal />
      </header>

      <PortfolioBalanceOverviewSection />

      <section className="mt-8 lg:mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className="bg-[#1212124c] rounded-3xl border-[0.2px] border-solid border-[#cbcfd299] overflow-hidden"
            >
              <CardContent className="p-5 lg:p-8 flex flex-col h-[160px] lg:h-[205px]">
                <div className="font-body-lg font-[number:var(--body-lg-font-weight)] text-surface-500 text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)] text-xs lg:text-sm">
                  {stat.label}
                </div>

                <div className="mt-1.5 font-heading-md font-[number:var(--heading-md-font-weight)] text-primary-100 text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] whitespace-nowrap [font-style:var(--heading-md-font-style)]">
                  {stat.value}
                </div>

                <div className="mt-auto font-body-lg font-[number:var(--body-lg-font-weight)] text-surface-500 text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] whitespace-nowrap [font-style:var(--body-lg-font-style)] text-xs lg:text-sm">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8 lg:mt-12">
        <div className="flex items-center justify-between">
          <div className="[font-family:'Inter',Helvetica] font-normal text-[#8e979f] text-xs tracking-[1.20px] leading-[18px] whitespace-nowrap">
            AVAILABLE ROTATIONAL SAVINGS
          </div>
          <Separator className="flex-1 mx-4 bg-[#8e979f]" />
          <button className="[font-family:'Inter',Helvetica] font-normal text-primary-200 text-sm tracking-[0] leading-[14px]">
            <span className="text-teal-700 leading-[var(--body-md-line-height)] font-body-md [font-style:var(--body-md-font-style)] font-[number:var(--body-md-font-weight)] tracking-[var(--body-md-letter-spacing)] text-[length:var(--body-md-font-size)]">
              View all
            </span>
          </button>
        </div>
      </section>

      <RotationalSavingsSummarySection />
      <RotationalSavingsCardsSection />
      <RotationalSavingsPoolsSection />
      <RotationalSavingsInfoSection />

      <section className="mt-8 lg:mt-12">
        <div className="flex items-center justify-between">
          <div className="[font-family:'Inter',Helvetica] font-normal text-[#8e979f] text-xs tracking-[1.20px] leading-[18px] whitespace-nowrap">
            AVAILABLE YIELD POOL
          </div>
          <Separator className="flex-1 mx-4 bg-[#8e979f]" />
          <button className="[font-family:'Inter',Helvetica] font-normal text-primary-200 text-sm tracking-[0] leading-[14px]">
            <span className="text-teal-700 leading-[var(--body-md-line-height)] font-body-md [font-style:var(--body-md-font-style)] font-[number:var(--body-md-font-weight)] tracking-[var(--body-md-letter-spacing)] text-[length:var(--body-md-font-size)]">
              View all
            </span>
          </button>
        </div>
      </section>

      <YieldGenerationSummarySection />
      <YieldGenerationCardsSection />
      <YieldPoolInfoSection />
      <YieldPoolCardsSection />

      <div className="pb-16 lg:pb-24" />
    </DashboardLayout>
  );
};
