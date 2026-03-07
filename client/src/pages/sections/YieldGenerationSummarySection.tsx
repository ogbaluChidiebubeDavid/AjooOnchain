import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
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

export const YieldGenerationSummarySection = (): JSX.Element => {
  return (
    <Card className="relative w-full bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-solid border-[#cbcfd299]">
      <CardContent className="p-0 relative h-[423px]">
        <div className="absolute top-[35px] left-[52px] inline-flex items-center gap-[15px]">
          <img
            className="relative w-12 h-[49px]"
            alt="Frame"
            src="/figmaAssets/frame-296.svg"
          />

          <div className="flex flex-col w-[182px] items-start gap-2 relative">
            <h2 className="relative self-stretch mt-[-1.00px] font-title-xl font-[number:var(--title-xl-font-weight)] text-white text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
              Avax Liquid Vault
            </h2>

            <div className="inline-flex items-start gap-1 relative flex-[0_0_auto]">
              <Badge className="h-auto inline-flex items-center justify-center gap-2.5 px-2 py-1 relative flex-[0_0_auto] bg-[#6e17174c] rounded overflow-hidden border-[0.5px] border-solid border-[#c92929] hover:bg-[#6e17174c]">
                <span className="relative w-fit mt-[-0.50px] font-body-sm font-[number:var(--body-sm-font-weight)] text-danger-200 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] whitespace-nowrap [font-style:var(--body-sm-font-style)]">
                  AVALANCHE
                </span>
              </Badge>

              <span className="relative w-[57px] mt-[-1.00px] font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                AAVE v3
              </span>
            </div>
          </div>
        </div>

        <Badge className="h-auto inline-flex items-center justify-center gap-2.5 px-2 py-1 absolute top-[45px] left-[calc(50.00%_+_126px)] bg-opacityprimary rounded-3xl overflow-hidden border-[0.5px] border-solid border-[#87bbb7] hover:bg-opacityprimary">
          <span className="relative w-fit mt-[-0.50px] font-caption font-[number:var(--caption-font-weight)] text-primary-100 text-[length:var(--caption-font-size)] tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] whitespace-nowrap [font-style:var(--caption-font-style)]">
            POPULAR
          </span>
        </Badge>

        <Card className="absolute top-[135px] left-[50px] w-[372px] h-[89px] flex bg-[#523f2033] rounded-3xl overflow-hidden border-[0.2px] border-solid border-[#f6bd60]">
          <CardContent className="p-0 mt-4 w-[111px] h-[53px] ml-6 items-start flex relative flex-col">
            <span className="relative self-stretch mt-[-1.00px] font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
              ESTIMATED APY
            </span>

            <div className="flex items-end relative self-stretch w-full flex-[0_0_auto]">
              <span className="relative w-[85px] h-[35px] mt-[-1.00px] [font-family:'Syne',Helvetica] font-normal text-surface-50 text-[32px] tracking-[0] leading-[48px] whitespace-nowrap">
                9.47%
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="inline-flex items-center gap-3 absolute top-64 left-[50px]">
          {statsData.map((stat, index) => (
            <Card
              key={`stat-${index}`}
              className="relative w-[116px] h-14 bg-[#33383d33] rounded-xl overflow-hidden border-[0.2px] border-solid border-[#a6adb4]"
            >
              <CardContent className="p-0 w-[102px] items-center top-1.5 left-[calc(50.00%_-_51px)] flex relative flex-col">
                <span className="relative mt-[-1.00px] font-caption font-[number:var(--caption-font-weight)] text-surface-500 text-[length:var(--caption-font-size)] text-center tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] [font-style:var(--caption-font-style)]">
                  {stat.label}
                </span>

                <div className="flex items-end relative flex-[0_0_auto]">
                  <span className="relative mt-[-1.00px] font-body-xl font-[number:var(--body-xl-font-weight)] text-surface-50 text-[length:var(--body-xl-font-size)] text-center tracking-[var(--body-xl-letter-spacing)] leading-[var(--body-xl-line-height)] [font-style:var(--body-xl-font-style)]">
                    {stat.value}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex w-[372px] items-center gap-3 absolute top-[344px] left-[50px]">
          <Button className="h-auto flex w-[90px] items-center justify-center gap-2.5 px-3 py-1 relative bg-opacityprimary rounded-xl overflow-hidden border-[0.5px] border-solid border-[#87bbb7] hover:bg-opacityprimary">
            <span className="relative w-fit mt-[-0.50px] font-body-md font-[number:var(--body-md-font-weight)] text-primary-100 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] whitespace-nowrap [font-style:var(--body-md-font-style)]">
              Low Risk
            </span>
          </Button>

          <Button className="h-auto flex w-[268px] items-center justify-center gap-2.5 p-3 relative bg-opacitysecondary rounded-xl border-[0.5px] border-solid border-[#fbdeb0] hover:bg-opacitysecondary">
            <span className="relative w-fit mt-[-0.50px] font-body-md font-[number:var(--body-md-font-weight)] text-secondary-100 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] whitespace-nowrap [font-style:var(--body-md-font-style)]">
              JOIN CIRCLE - 2 SPOTS LEFT
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
