import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const timeRanges = [
  { label: "1W", active: true },
  { label: "1M", active: false },
  { label: "3M", active: false },
  { label: "ALL", active: false },
];

export const PortfolioBalanceOverviewSection = (): JSX.Element => {
  const { data: groups } = useQuery({
    queryKey: ["groups", "portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  // Calculate total balance from all active contributions
  const totalBalance = groups?.reduce((sum, group) => {
    return sum + Number(group.contribution_amount || 0);
  }, 0) || 0;

  return (
    <Card className="relative w-full bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-solid border-[#cbcfd299]">
      <CardContent className="p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-body-md font-[number:var(--body-md-font-weight)] text-surface-500 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
            TOTAL PORTFOLIO BALANCE
          </p>

          <h2 className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-surface-50 text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]">
            ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>

          <div className="flex items-center gap-3">
            <span className="font-body-sm font-[number:var(--body-sm-font-weight)] text-success-100 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
              +0% this week
            </span>
            <span className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
              +$0.00 earned this week
            </span>
          </div>
        </div>

        <div className="relative w-full h-32 pl-4">
          <img
            className="w-[392px] h-32"
            alt="Portfolio performance chart"
            src="/figmaAssets/vector-1.svg"
          />
        </div>

        <div className="flex items-center gap-4">
          {timeRanges.map((range) => (
            <Button
              key={range.label}
              variant="ghost"
              className={`h-auto px-2 py-1 rounded-lg ${
                range.active
                  ? "bg-opacityprimary border-[0.5px] border-solid border-teal-700"
                  : ""
              }`}
            >
              <span className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                {range.label}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
