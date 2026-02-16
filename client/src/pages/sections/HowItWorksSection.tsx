import { Card, CardContent } from "@/components/ui/card";

export const HowItWorksSection = (): JSX.Element => {
  return (
    <Card className="w-full max-w-[553px] border-white rounded-3xl bg-transparent">
      <CardContent className="flex items-center gap-6 md:gap-[94px] p-6 md:px-[31px] md:py-[34px]">
        <div className="flex flex-col flex-1 gap-3">
          <h3 className="font-title-xl font-[number:var(--title-xl-font-weight)] text-white text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
            Targeted Commodity Savings
          </h3>
          <p className="font-body-md font-[number:var(--body-md-font-weight)] text-surface-50 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
            Facilitate bulk purchasing of festive items through time-locked
            goal-based vaults.
          </p>
        </div>
        <img
          className="w-24 h-24 flex-shrink-0"
          alt="Pngwing com"
          src="/figmaAssets/pngwing-com--1--1-1.png"
        />
      </CardContent>
    </Card>
  );
};
