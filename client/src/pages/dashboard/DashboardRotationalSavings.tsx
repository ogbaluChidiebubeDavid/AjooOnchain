import { DashboardLayout } from "./DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useWeb3 } from "@/lib/Web3Context";
import { Loader2, Wallet, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CreateCircleModal } from "./components/CreateCircleModal";

export const DashboardRotationalSavings = (): JSX.Element => {
  const { account, connectWallet, isConnecting } = useWeb3();

  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups", "rotational"],
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
        <div className="flex flex-col items-center justify-center min-h-[75vh] gap-8 px-6 text-center">
          <div className="p-8 bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl">
            <Wallet className="w-16 h-12 text-primary-300" />
          </div>
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-title-xl tracking-tight">
              Connect to View Circles
            </h2>
            <p className="text-surface-500 font-body-md text-lg leading-relaxed">
              Join the future of rotational savings. Connect your wallet to manage your circles and track contributions.
            </p>
          </div>
          <Button 
            onClick={() => connectWallet()}
            disabled={isConnecting}
            className="bg-primary-300 hover:bg-primary-400 text-primary-950 font-bold px-10 py-8 rounded-2xl text-xl transition-all"
          >
            {isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const activeCirclesCount = groups?.length || 0;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 max-w-[1200px] flex flex-col gap-10 lg:gap-14 py-8 lg:py-12">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="[font-family:'Syne',Helvetica] font-bold text-surface-100 text-3xl lg:text-[42px] tracking-tight leading-tight">
              Rotational Savings
            </h1>
            <p className="text-surface-500 font-body-md">Manage your active savings circles</p>
          </div>
          <CreateCircleModal />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="bg-[#1212124c] rounded-3xl border-[0.2px] border-solid border-[#cbcfd299] overflow-hidden">
            <CardContent className="p-6 lg:p-8 flex flex-col h-[160px] justify-center">
              <p className="font-['Inter',sans-serif] font-semibold text-[#8e979f] text-xs uppercase tracking-wider">
                Active Circles
              </p>
              <p className="font-['Syne',sans-serif] font-bold text-primary-100 text-2xl lg:text-[34px] leading-[48px] tracking-tight">
                {activeCirclesCount}
              </p>
            </CardContent>
          </Card>
          {/* Other stat cards could go here */}
        </div>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <p className="font-['Inter',sans-serif] font-semibold text-[#8e979f] text-xs tracking-[1.2px] leading-[18px] whitespace-nowrap uppercase">
              Your Circles
            </p>
            <div className="flex-1 h-[0.2px] bg-[#8e979f]/30" />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary-300" />
            </div>
          ) : !groups || groups.length === 0 ? (
            <div className="text-center py-16 bg-[#1212124c] rounded-3xl border border-dashed border-[#cbcfd299]">
              <p className="text-surface-500 mb-6 font-body-md">You haven't joined or created any circles yet.</p>
              <CreateCircleModal />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groups.map((group) => {
                const cycleDays = group.cycle_duration ? Math.floor(group.cycle_duration / (24 * 60 * 60)) : 0;
                const participantsTotal = 4;
                const participantsCurrent = 1;

                return (
                  <Card key={group.id} className="w-full bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-[#cbcfd299] hover:border-primary-300/50 transition-all">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary-400 flex items-center justify-center font-bold text-primary-200 text-xl">
                          {group.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-['Syne',sans-serif] font-bold text-white text-xl leading-tight">
                            {group.name}
                          </h3>
                          <p className="text-surface-500 text-sm">
                            Hosted by {group.creator_address.slice(0, 6)}...{group.creator_address.slice(-4)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#6e17174c] text-danger-200 border-[#c92929]/50">AVALANCHE</Badge>
                        <Badge className="bg-[#33383d4c] text-surface-500 border-[#8e979f]/50">{cycleDays} Day Cycle</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                          <p className="text-[#8e979f] text-[10px] uppercase tracking-wider mb-1">Contribution</p>
                          <p className="text-white font-bold text-lg">{group.contribution_amount} USDC</p>
                        </div>
                        <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                          <p className="text-[#8e979f] text-[10px] uppercase tracking-wider mb-1">Pool Total</p>
                          <p className="text-white font-bold text-lg">{group.contribution_amount * participantsTotal} USDC</p>
                        </div>
                      </div>

                      <Link href={`/dashboard/circle/${group.id}`}>
                        <Button className="w-full bg-primary-300 hover:bg-primary-400 text-primary-950 font-bold py-6 rounded-xl">
                          MANAGE CIRCLE
                        </Button>
                      </Link>
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
