import { DashboardLayout } from "./DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

const recentActivity = [
  {
    asset: "USDC",
    name: "USD Coin",
    chain: "AVAX",
    chainColor: "#c92929",
    chainBg: "rgba(110,23,23,0.3)",
    type: "ROTATIONAL SAVINGS",
    amount: "4,200",
    currency: "USDC",
    value: "$4,200.00",
    duration: "12 Days",
    change: "+2.5%",
    changePositive: true,
  },
  {
    asset: "AVAX",
    name: "Avalanche",
    chain: "AVAX",
    chainColor: "#c92929",
    chainBg: "rgba(110,23,23,0.3)",
    type: "YIELD GENERATION",
    amount: "10.5",
    currency: "AVAX",
    value: "$420.00",
    duration: "30 Days",
    change: "+9.47%",
    changePositive: true,
  },
  {
    asset: "USDT",
    name: "Tether",
    chain: "AVAX",
    chainColor: "#c92929",
    chainBg: "rgba(110,23,23,0.3)",
    type: "ROTATIONAL SAVINGS",
    amount: "1,000",
    currency: "USDT",
    value: "$1,000.00",
    duration: "7 Days",
    change: "+1.2%",
    changePositive: true,
  },
];

const assetCards = [
  {
    label: "YIELD GENERATION",
    value: "$8,500.24",
    gain: "+$450.24",
    pct: "+5.3%",
  },
  {
    label: "ROTATIONAL SAVINGS",
    value: "$3,500.00",
    gain: "+$150.24",
    pct: "+4.3%",
  },
  {
    label: "NET WORTH",
    value: "$24,120.24",
    gain: "+$2,000.35",
    pct: "+9.0%",
  },
];

export const DashboardAssets = (): JSX.Element => {
  return (
    <DashboardLayout>
      <header className="pt-8 lg:pt-[100px] pb-8 lg:pb-12">
        <h1 className="[font-family:'Syne',Helvetica] font-semibold text-[#f7f9fd] text-2xl lg:text-[34px] tracking-[0] leading-[48px]">
          YOUR ASSETS
        </h1>
      </header>

      <Card className="bg-[rgba(18,18,18,0.3)] rounded-3xl border-[0.2px] border-[rgba(203,207,210,0.6)] overflow-hidden">
        <CardContent className="p-6 lg:p-8">
          <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-sm leading-[20px]">
            TOTAL PORTFOLIO BALANCE
          </p>
          <p className="font-['Syne',sans-serif] text-[#f7f9fd] text-4xl lg:text-[48px] leading-[64px] mt-2">
            $20,000.24
          </p>
          <p className="font-['Inter',sans-serif] font-normal text-[#1bc590] text-xs leading-[18px] mt-1">
            +15% this week
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 lg:mt-8">
        {assetCards.map((card, i) => (
          <Card
            key={i}
            className="bg-[rgba(18,18,18,0.3)] rounded-3xl border-[0.2px] border-[rgba(203,207,210,0.6)] overflow-hidden"
          >
            <CardContent className="p-6 lg:p-8 flex flex-col gap-1">
              <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-sm leading-[24px]">
                {card.label}
              </p>
              <p className="font-['Syne',sans-serif] font-normal text-[#87bbb7] text-2xl lg:text-[34px] leading-[48px]">
                {card.value}
              </p>
              <p className="font-['Inter',sans-serif] font-semibold text-[#0f766e] text-sm leading-[20px]">
                {card.gain} &nbsp;
                <span className="text-[#1bc590]">{card.pct}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-8 lg:mt-12">
        <div className="flex items-center gap-4 mb-6">
          <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-xs tracking-[1.2px] leading-[18px] whitespace-nowrap">
            RECENT ACTIVITY
          </p>
          <div className="flex-1 h-[0.2px] bg-[#8e979f]" />
          <button className="font-['Inter',sans-serif] font-normal text-[#0f766e] text-sm leading-[14px]">
            View all
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {recentActivity.map((item, i) => (
            <Card
              key={i}
              className="bg-[rgba(18,18,18,0.3)] rounded-3xl border-[0.2px] border-[rgba(203,207,210,0.6)] overflow-hidden"
            >
              <CardContent className="p-5 lg:p-8">
                <div className="flex flex-wrap items-center gap-4 lg:gap-[52px]">
                  <div className="flex flex-col gap-1 min-w-[100px]">
                    <p className="font-['Syne',sans-serif] font-medium text-white text-xl lg:text-[34px] leading-[48px]">
                      {item.asset}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-sm leading-[20px]">
                        {item.name}
                      </p>
                      <div
                        className="border-[0.5px] border-solid flex items-center justify-center overflow-hidden px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: item.chainBg,
                          borderColor: item.chainColor,
                        }}
                      >
                        <p
                          className="font-['Inter',sans-serif] font-normal text-xs leading-[18px]"
                          style={{ color: item.chainColor }}
                        >
                          {item.chain}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="font-['Inter',sans-serif] font-normal text-white text-sm lg:text-base leading-[24px] hidden sm:block">
                    {item.type}
                  </p>

                  <div className="flex flex-col gap-px">
                    <p className="font-['Syne',sans-serif] font-normal text-white text-xl lg:text-[24px] leading-[34px]">
                      {item.amount}
                    </p>
                    <p className="font-['Inter',sans-serif] font-normal text-[#8e979f] text-sm leading-[20px]">
                      {item.currency}
                    </p>
                  </div>

                  <div className="flex flex-col gap-px">
                    <p className="font-['Syne',sans-serif] font-normal text-white text-xl lg:text-[24px] leading-[34px]">
                      {item.value}
                    </p>
                    <p className="font-['Inter',sans-serif] font-semibold text-[#0f766e] text-sm leading-[20px]">
                      {item.duration}
                    </p>
                  </div>

                  <p className="font-['Inter',sans-serif] font-normal text-[#0f766e] text-sm lg:text-base leading-[24px]">
                    {item.change}
                  </p>

                  <div className="ml-auto">
                    <button className="bg-[rgba(15,118,110,0.15)] border-[0.5px] border-[#87bbb7] border-solid flex items-center justify-center px-6 py-3 rounded-xl">
                      <p className="font-['Inter',sans-serif] font-normal text-[#87bbb7] text-sm leading-[20px] whitespace-nowrap">
                        Manage
                      </p>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="pb-16 lg:pb-24" />
    </DashboardLayout>
  );
};
