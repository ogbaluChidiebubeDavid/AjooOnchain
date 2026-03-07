import { DashboardLayout } from "./DashboardLayout";
import { YieldGenerationSummarySection } from "./sections/YieldGenerationSummarySection";
import { YieldGenerationCardsSection } from "./sections/YieldGenerationCardsSection";
import { YieldPoolInfoSection } from "./sections/YieldPoolInfoSection";
import { YieldPoolCardsSection } from "./sections/YieldPoolCardsSection";

export const DashboardYields = (): JSX.Element => {
  return (
    <DashboardLayout>
      <header className="pt-8 lg:pt-[100px] pb-8 lg:pb-12">
        <h1 className="[font-family:'Syne',Helvetica] font-semibold text-[#f7f9fd] text-2xl lg:text-[34px] tracking-[0] leading-[48px]">
          YIELDS
        </h1>
      </header>

      <YieldGenerationSummarySection />
      <YieldGenerationCardsSection />
      <YieldPoolInfoSection />
      <YieldPoolCardsSection />

      <div className="pb-16 lg:pb-24" />
    </DashboardLayout>
  );
};
