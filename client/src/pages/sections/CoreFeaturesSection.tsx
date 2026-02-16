import { Card, CardContent } from "@/components/ui/card";

export const CoreFeaturesSection = (): JSX.Element => {
  return (
    <Card className="inline-flex items-center gap-6 px-[31px] py-[34px] rounded-3xl border border-white bg-transparent">
      <CardContent className="flex flex-col items-start gap-3 p-0 w-[285px]">
        <h3 className="self-stretch font-title-xl font-[number:var(--title-xl-font-weight)] text-white text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
          Yield Generation
        </h3>

        <p className="w-[204px] font-body-md font-[number:var(--body-md-font-weight)] text-surface-50 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
          Generate &#34;Remittance Interest&#34; by routing idle pool funds
          through <br />
          Avalanche DeFi protocols.
        </p>
      </CardContent>

      <img
        className="w-24 h-24 object-cover flex-shrink-0"
        alt="Pngwing com"
        src="/figmaAssets/pngwing-com--1--1-2.png"
      />
    </Card>
  );
};
