import { DashboardLayout } from "./DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const statsData = [
  {
    label: "ACTIVE CIRCLE",
    value: "4",
    description: "Rotational Savings",
  },
  {
    label: "YIELD POOL",
    value: "3",
    description: "Earning Continuously",
  },
  {
    label: "NEXT PAYOUT",
    value: "5 days",
    description: "Ajo Pool 2",
  },
  {
    label: "TOTAL PNL",
    value: "+$2000.35",
    description: "All Positions",
  },
];

const pools = [
  {
    name: "Ajo Pool",
    host: "0x2f3a...d76c",
    chain: "AVALANCHE",
    cycle: "90 days Cycle",
    contribution: "200",
    contributionCurrency: "USDC",
    poolTotal: "800",
    poolTotalCurrency: "USDC",
    participants: { current: 2, total: 4 },
    startsIn: "3 days",
    stakingInfo: "Staking rewards distributed on payout day",
    spotsLeft: 2,
    status: "joining",
  },
  {
    name: "Ajo Pool 2",
    host: "0x4b7e...a12d",
    chain: "AVALANCHE",
    cycle: "30 days Cycle",
    contribution: "500",
    contributionCurrency: "USDC",
    poolTotal: "2,000",
    poolTotalCurrency: "USDC",
    participants: { current: 3, total: 4 },
    startsIn: "5 days",
    stakingInfo: "Next payout in 5 days — you are position 2",
    spotsLeft: 1,
    status: "active",
  },
  {
    name: "Community Circle",
    host: "0x9c1f...b84e",
    chain: "AVALANCHE",
    cycle: "60 days Cycle",
    contribution: "100",
    contributionCurrency: "USDC",
    poolTotal: "400",
    poolTotalCurrency: "USDC",
    participants: { current: 1, total: 4 },
    startsIn: "10 days",
    stakingInfo: "Earn staking rewards while you wait for payout",
    spotsLeft: 3,
    status: "joining",
  },
];

export const DashboardRotationalSavings = (): JSX.Element => {
  return (
    <DashboardLayout>
      <header className="pt-8 lg:pt-[100px] pb-8 lg:pb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="[font-family:'Syne',Helvetica] font-semibold text-[#f7f9fd] text-2xl lg:text-[34px] tracking-[0] leading-[48px]">
            Rotational Savings
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <button className="bg-[rgba(15,118,110,0.15)] border-[0.5px] border-[#87bbb7] border-solid flex items-center gap-1 px-6 py-3 rounded-xl">
              <span className="text-[#87bbb7] text-sm leading-[20px] font-['Inter',sans-serif] whitespace-nowrap">
                + JOIN A CIRCLE
              </span>
            </button>
            <button className="bg-[rgba(15,118,110,0.15)] border-[0.5px] border-[#87bbb7] border-solid flex items-center gap-1 px-6 py-3 rounded-xl">
              <span className="text-[#87bbb7] text-sm leading-[20px] font-['Inter',sans-serif] whitespace-nowrap">
                + CREATE A CIRCLE
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="bg-[rgba(18,18,18,0.3)] rounded-3xl border-[0.2px] border-solid border-[rgba(203,207,210,0.6)] overflow-hidden"
          >
            <CardContent className="p-5 lg:p-8 flex flex-col h-[160px] lg:h-[205px]">
              <div className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-xs lg:text-base leading-[24px]">
                {stat.label}
              </div>
              <div className="mt-1.5 font-['Syne',sans-serif] font-normal text-[#87bbb7] text-xl lg:text-[34px] leading-[48px]">
                {stat.value}
              </div>
              <div className="mt-auto font-['Inter',sans-serif] font-normal text-[#8e979f] text-xs lg:text-base leading-[24px]">
                {stat.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-8 lg:mt-12">
        <div className="flex items-center gap-4 mb-6">
          <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-xs tracking-[1.2px] leading-[18px] whitespace-nowrap">
            YOUR CIRCLES
          </p>
          <div className="flex-1 h-[0.2px] bg-[#8e979f]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pools.map((pool, i) => (
            <Card
              key={i}
              className="bg-[rgba(18,18,18,0.3)] rounded-3xl border-[0.2px] border-[rgba(203,207,210,0.6)] overflow-hidden"
            >
              <CardContent className="p-6 lg:p-8 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Avatar className="w-[46px] h-[46px] bg-[#052725]">
                    <AvatarFallback className="bg-[#052725] text-[#0f766e] font-['Syne',sans-serif] text-xl font-normal">
                      A
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-['Syne',sans-serif] font-normal text-white text-xl leading-7">
                      {pool.name}
                    </h3>
                    <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-sm leading-5">
                      Hosted by {pool.host}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="h-auto bg-[rgba(110,23,23,0.3)] rounded border-[0.5px] border-solid border-[#c92929] text-[#c92929] text-xs hover:bg-[rgba(110,23,23,0.3)]">
                    {pool.chain}
                  </Badge>
                  <Badge className="h-auto bg-[rgba(51,56,61,0.3)] rounded border-[0.5px] border-solid border-[#8e979f] text-[#8e979f] text-xs hover:bg-[rgba(51,56,61,0.3)]">
                    {pool.cycle}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Card className="bg-[rgba(18,18,18,0.3)] rounded-2xl border-[0.2px] border-[rgba(203,207,210,0.6)]">
                    <CardContent className="p-4">
                      <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-xs leading-5">
                        CONTRIBUTION
                      </p>
                      <div className="flex items-end gap-1 mt-0.5">
                        <span className="font-['Syne',sans-serif] font-normal text-[#f7f9fd] text-2xl leading-9">
                          {pool.contribution}
                        </span>
                        <span className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-sm leading-6 mb-0.5">
                          {pool.contributionCurrency}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-[rgba(18,18,18,0.3)] rounded-2xl border-[0.2px] border-[rgba(203,207,210,0.6)]">
                    <CardContent className="p-4">
                      <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-xs leading-5">
                        POOL TOTAL
                      </p>
                      <div className="flex items-end gap-1 mt-0.5">
                        <span className="font-['Syne',sans-serif] font-normal text-[#f7f9fd] text-2xl leading-9">
                          {pool.poolTotal}
                        </span>
                        <span className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-sm leading-6 mb-0.5">
                          {pool.poolTotalCurrency}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-xs leading-5">
                      PARTICIPANTS ({pool.participants.current}/
                      {pool.participants.total})
                    </p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: pool.participants.total }).map(
                        (_, idx) => (
                          <div
                            key={idx}
                            className={`w-3 h-3 rounded-sm ${
                              idx < pool.participants.current
                                ? "bg-[#0f766e]"
                                : "bg-[#d9d9d9]"
                            }`}
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-xs leading-5">
                      STARTS IN
                    </p>
                    <p className="font-['Inter',sans-serif] font-normal text-white text-base leading-6">
                      {pool.startsIn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 bg-[rgba(32,35,39,0.7)] rounded-xl">
                  <img
                    className="w-3.5 h-[12px]"
                    alt="Info"
                    src="/figmaAssets/group-3-1.png"
                  />
                  <p className="font-['Inter',sans-serif] font-normal text-white text-xs leading-5">
                    {pool.stakingInfo}
                  </p>
                </div>

                {pool.status === "active" ? (
                  <Button className="w-full h-auto bg-[rgba(15,118,110,0.15)] rounded-xl border-[0.5px] border-[#87bbb7] text-[#87bbb7] font-['Inter',sans-serif] text-sm py-3 hover:bg-[rgba(15,118,110,0.25)]">
                    MANAGE CIRCLE
                  </Button>
                ) : (
                  <Button className="w-full h-auto bg-[rgba(15,118,110,0.15)] rounded-xl border-[0.5px] border-[#87bbb7] text-[#87bbb7] font-['Inter',sans-serif] text-sm py-3 hover:bg-[rgba(15,118,110,0.25)]">
                    JOIN CIRCLE — {pool.spotsLeft} SPOTS LEFT
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="pb-16 lg:pb-24" />
    </DashboardLayout>
  );
};
