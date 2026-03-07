import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PortfolioBalanceOverviewSection } from "./sections/PortfolioBalanceOverviewSection";
import { RotationalSavingsCardsSection } from "./sections/RotationalSavingsCardsSection";
import { RotationalSavingsInfoSection } from "./sections/RotationalSavingsInfoSection";
import { RotationalSavingsPoolsSection } from "./sections/RotationalSavingsPoolsSection";
import { RotationalSavingsSummarySection } from "./sections/RotationalSavingsSummarySection";
<<<<<<< HEAD
import { SideNavigationSection } from "./sections/SideNavigationSection";
=======
>>>>>>> main
import { YieldGenerationCardsSection } from "./sections/YieldGenerationCardsSection";
import { YieldGenerationSummarySection } from "./sections/YieldGenerationSummarySection";
import { YieldPoolCardsSection } from "./sections/YieldPoolCardsSection";
import { YieldPoolInfoSection } from "./sections/YieldPoolInfoSection";
<<<<<<< HEAD
=======
import { DashboardLayout } from "./DashboardLayout";
>>>>>>> main

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

export const DashboardOverview = (): JSX.Element => {
  return (
<<<<<<< HEAD
    <div className="relative min-h-screen w-full bg-black">
      <div className="absolute top-[104px] left-[83px] w-[879px] h-[879px] bg-primary-400 rounded-[439.5px] blur-[300px] opacity-50" />

      <div className="relative flex">
        <SideNavigationSection />

        <main className="flex-1 pl-[375px] pr-[71px]">
          <header className="pt-[100px] pb-12">
            <h1 className="[font-family:'Syne',Helvetica] font-semibold text-surface-100 text-[34px] tracking-[0] leading-[48px]">
              OVERVIEW
            </h1>
          </header>

          <PortfolioBalanceOverviewSection />

          <section className="mt-12">
            <div className="grid grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-[#1212124c] rounded-3xl border-[0.2px] border-solid border-[#cbcfd299] overflow-hidden"
                >
                  <CardContent className="p-8 flex flex-col h-[205px]">
                    <div className="font-body-lg font-[number:var(--body-lg-font-weight)] text-surface-500 text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] whitespace-nowrap [font-style:var(--body-lg-font-style)]">
                      {stat.label}
                    </div>

                    <div className="mt-1.5 font-heading-md font-[number:var(--heading-md-font-weight)] text-primary-100 text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] whitespace-nowrap [font-style:var(--heading-md-font-style)]">
                      {stat.value}
                    </div>

                    <div className="mt-auto font-body-lg font-[number:var(--body-lg-font-weight)] text-surface-500 text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] whitespace-nowrap [font-style:var(--body-lg-font-style)]">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-12">
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

          <section className="mt-12">
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
        </main>
      </div>
    </div>
=======
    <DashboardLayout>
      <header className="pt-8 lg:pt-[100px] pb-8 lg:pb-12">
        <h1 className="[font-family:'Syne',Helvetica] font-semibold text-surface-100 text-2xl lg:text-[34px] tracking-[0] leading-[48px]">
          OVERVIEW
        </h1>
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
>>>>>>> main
  );
};
