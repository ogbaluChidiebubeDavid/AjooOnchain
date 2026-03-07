import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const YieldPoolCardsSection = (): JSX.Element => {
  const stats = [
    {
      label: "TVL",
      value: "$4.3M",
    },
    {
      label: "LOCK",
      value: "90D",
    },
    {
      label: "MIN. DEPOSIT",
      value: "0.5AVAX",
    },
  ];

  return (
    <Card className="relative w-full max-w-[470px] bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-solid border-[#cbcfd299]">
      <CardContent className="p-0 relative min-h-[423px]">
        <div className="flex items-center gap-[15px] pt-[35px] px-[52px]">
          <img
            className="w-12 h-[49px]"
            alt="Frame"
            src="/figmaAssets/frame-296.svg"
          />

          <div className="flex flex-col w-[182px] items-start gap-2">
            <h3 className="font-title-xl font-[number:var(--title-xl-font-weight)] text-white text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
              Avax Liquid Vault
            </h3>

            <div className="inline-flex items-start gap-1">
              <Badge className="h-auto px-2 py-1 bg-[#6e17174c] rounded overflow-hidden border-[0.5px] border-solid border-[#c92929] hover:bg-[#6e17174c]">
                <span className="font-body-sm font-[number:var(--body-sm-font-weight)] text-danger-200 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                  AVALANCHE
                </span>
              </Badge>

              <span className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                AAVE v3
              </span>
            </div>
          </div>
        </div>

        <Badge className="h-auto absolute top-[45px] right-[52px] px-2 py-1 bg-opacityprimary rounded-3xl overflow-hidden border-[0.5px] border-solid border-[#87bbb7] hover:bg-opacityprimary">
          <span className="font-caption font-[number:var(--caption-font-weight)] text-primary-100 text-[length:var(--caption-font-size)] tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] [font-style:var(--caption-font-style)]">
            POPULAR
          </span>
        </Badge>

        <div className="mt-[50px] mx-[50px] flex bg-[#523f2033] rounded-3xl overflow-hidden border-[0.2px] border-solid border-[#f6bd60] p-6">
          <div className="flex flex-col items-start">
            <span className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
              ESTIMATED APY
            </span>

            <div className="flex items-end">
              <span className="[font-family:'Syne',Helvetica] font-normal text-surface-50 text-[32px] tracking-[0] leading-[48px]">
                9.47%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-[32px] mx-[50px]">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="w-[116px] h-14 bg-[#33383d33] rounded-xl overflow-hidden border-[0.2px] border-solid border-[#a6adb4]"
            >
              <CardContent className="flex flex-col items-center justify-center h-full p-1.5">
                <span className="font-caption font-[number:var(--caption-font-weight)] text-surface-500 text-[length:var(--caption-font-size)] text-center tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] [font-style:var(--caption-font-style)]">
                  {stat.label}
                </span>

                <span className="font-body-xl font-[number:var(--body-xl-font-weight)] text-surface-50 text-[length:var(--body-xl-font-size)] text-center tracking-[var(--body-xl-letter-spacing)] leading-[var(--body-xl-line-height)] [font-style:var(--body-xl-font-style)]">
                  {stat.value}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-[24px] mx-[50px] pb-[50px]">
          <Button className="h-auto w-[90px] px-3 py-1 bg-opacityprimary rounded-xl overflow-hidden border-[0.5px] border-solid border-[#87bbb7] hover:bg-opacityprimary">
            <span className="font-body-md font-[number:var(--body-md-font-weight)] text-primary-100 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
              Low Risk
            </span>
          </Button>

          <Button className="h-auto flex-1 p-3 bg-opacitysecondary rounded-xl border-[0.5px] border-solid border-[#fbdeb0] hover:bg-opacitysecondary">
            <span className="font-body-md font-[number:var(--body-md-font-weight)] text-secondary-100 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
              JOIN CIRCLE - 2 SPOTS LEFT
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
