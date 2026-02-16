import { Card, CardContent } from "@/components/ui/card";

export const WhyAjoOnchainSection = (): JSX.Element => {
  return (
    <Card className="w-full max-w-[553px] rounded-3xl border border-white bg-transparent">
      <CardContent className="flex items-center gap-6 md:gap-[94px] px-6 md:px-[31px] py-8 md:py-[34px]">
        <div className="flex flex-col flex-1 items-start gap-3">
          <h2 className="font-title-xl font-[number:var(--title-xl-font-weight)] text-white text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
            Decentralized Rotational Savings
          </h2>

          <p className="font-body-md font-[number:var(--body-md-font-weight)] text-surface-50 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
            Automate the "Ajo" cycle for groups of 2–4 people via smart
            contracts.
          </p>
        </div>

        <img
          className="w-24 h-24 flex-shrink-0 object-cover"
          alt="Pngwing com"
          src="/figmaAssets/pngwing-com--1--1.png"
        />
      </CardContent>
    </Card>
  );
};
