import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const statCards = [
  {
    label: "CONTRIBUTION",
    value: "200",
    currency: "USDC",
  },
  {
    label: "POOL TOTAL",
    value: "800",
    currency: "USDC",
  },
];

const participantDots = [
  { filled: true },
  { filled: true },
  { filled: false },
  { filled: false },
];

export const RotationalSavingsSummarySection = (): JSX.Element => {
  return (
    <Card className="w-full max-w-[470px] bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-solid border-[#cbcfd299]">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <Avatar className="w-[46px] h-[46px] bg-primary-400">
            <AvatarFallback className="bg-primary-400 font-title-xl font-[number:var(--title-xl-font-weight)] text-primary-200 text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
              A
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <h3 className="font-title-xl font-[number:var(--title-xl-font-weight)] text-white text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
              Ajo Pool
            </h3>
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-surface-500 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
              Hosted by 0x2f3a...d76c
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="h-auto bg-[#6e17174c] rounded border-[0.5px] border-solid border-[#c92929] font-body-md font-[number:var(--body-md-font-weight)] text-danger-200 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] hover:bg-[#6e17174c]">
            AVALANCHE
          </Badge>
          <Badge className="h-auto bg-[#33383d4c] rounded border-[0.5px] border-solid border-[#8e979f] font-body-md font-[number:var(--body-md-font-weight)] text-surface-500 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] hover:bg-[#33383d4c]">
            90 days Cycle
          </Badge>
        </div>

        <div className="flex items-center gap-[18px]">
          {statCards.map((stat, index) => (
            <Card
              key={index}
              className="flex-1 bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-solid border-[#cbcfd299]"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-start">
                  <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                    {stat.label}
                  </p>
                  <div className="flex items-end">
                    <span className="[font-family:'Syne',Helvetica] font-normal text-surface-50 text-[32px] tracking-[0] leading-[48px]">
                      {stat.value}
                    </span>
                    <span className="font-body-lg font-[number:var(--body-lg-font-weight)] text-surface-500 text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
                      {stat.currency}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-2">
            <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
              PARTICIPANTS (2/4)
            </p>
            <div className="flex items-center gap-1">
              {participantDots.map((dot, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-md ${
                    dot.filled ? "bg-primary-300" : "bg-[#d9d9d9]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
              STARTS IN
            </p>
            <p className="font-body-lg font-[number:var(--body-lg-font-weight)] text-white text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
              3days
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 bg-[#202327b2] rounded-xl">
          <img
            className="w-3.5 h-[12.23px]"
            alt="Group"
            src="/figmaAssets/group-3.png"
          />
          <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-white text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
            Stake Avax on completion
          </p>
        </div>

        <Button className="h-auto w-full bg-opacityprimary rounded-xl border-[0.5px] border-solid border-[#87bbb7] font-body-md font-[number:var(--body-md-font-weight)] text-primary-100 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] hover:bg-opacityprimary/80">
          JOIN CIRCLE - 2 SPOTS LEFT
        </Button>
      </CardContent>
    </Card>
  );
};
