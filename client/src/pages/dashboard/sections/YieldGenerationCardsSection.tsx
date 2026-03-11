import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export const YieldGenerationCardsSection = (): JSX.Element => {
  const { data: yieldPools, isLoading } = useQuery({
    queryKey: ["yield_pools"],
    queryFn: async () => {
      // Fetch from a hypothetical yield_pools table or return empty for now
      return [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-300" />
      </div>
    );
  }

  if (!yieldPools || yieldPools.length === 0) {
    return (
      <div className="text-surface-500 py-8 text-center font-body-md bg-[#1212124c] rounded-3xl border-[0.2px] border-solid border-[#cbcfd299]">
        Dedicated Yield Pools are coming soon. Continue using Rotational Savings to earn Aave yield automatically.
      </div>
    );
  }

  return (
    <Card className="w-full max-w-[470px] bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-solid border-[#cbcfd299]">
      <CardContent className="p-0 relative">
        <div className="flex flex-col gap-6 p-[50px] pt-[35px]">
          {/* Content would be mapped here dynamically */}
        </div>
      </CardContent>
    </Card>
  );
};
