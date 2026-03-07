import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const poolData = {
  initial: "A",
  name: "Ajo Pool",
  host: "0x2f3a...d76c",
  network: "AVALANCHE",
  cycle: "90 days Cycle",
  contribution: 200,
  poolTotal: 800,
  currency: "USDC",
  participants: {
    current: 2,
    total: 4,
  },
  startsIn: "3days",
  spotsLeft: 2,
  stakingInfo: "Stake Avax on completion",
};

const participantSquares = Array.from(
  { length: poolData.participants.total },
  (_, i) => ({
    filled: i < poolData.participants.current,
  }),
);

export const RotationalSavingsCardsSection = (): JSX.Element => {
  return (
    <Card className="w-full max-w-[470px] bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-[#cbcfd299]">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <Avatar className="w-[46px] h-[46px] bg-primary-400">
            <AvatarFallback className="bg-primary-400 font-title-xl font-[number:var(--title-xl-font-weight)] text-primary-200 text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
              {poolData.initial}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <h3 className="font-title-xl font-[number:var(--title-xl-font-weight)] text-white text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
              {poolData.name}
            </h3>
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-surface-500 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
              Hosted by {poolData.host}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="h-auto bg-[#6e17174c] rounded border-[0.5px] border-[#c92929] font-body-md font-[number:var(--body-md-font-weight)] text-danger-200 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] hover:bg-[#6e17174c]">
            {poolData.network}
          </Badge>
          <Badge className="h-auto bg-[#33383d4c] rounded border-[0.5px] border-[#8e979f] font-body-md font-[number:var(--body-md-font-weight)] text-surface-500 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] hover:bg-[#33383d4c]">
            {poolData.cycle}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-[18px]">
          <Card className="bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-[#cbcfd299]">
            <CardContent className="p-6 space-y-1">
              <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                CONTRIBUTION
              </p>
              <div className="flex items-end gap-2">
                <span className="[font-family:'Syne',Helvetica] font-normal text-surface-50 text-[32px] tracking-[0] leading-[48px]">
                  {poolData.contribution}
                </span>
                <span className="font-body-lg font-[number:var(--body-lg-font-weight)] text-surface-500 text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
                  {poolData.currency}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1212124c] rounded-3xl overflow-hidden border-[0.2px] border-[#cbcfd299]">
            <CardContent className="p-6 space-y-1">
              <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                POOL TOTAL
              </p>
              <div className="flex items-end gap-2">
                <span className="[font-family:'Syne',Helvetica] font-normal text-surface-50 text-[32px] tracking-[0] leading-[48px]">
                  {poolData.poolTotal}
                </span>
                <span className="font-body-lg font-[number:var(--body-lg-font-weight)] text-surface-500 text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
                  {poolData.currency}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
              PARTICIPANTS ({poolData.participants.current}/
              {poolData.participants.total})
            </p>
            <div className="flex items-center gap-1">
              {participantSquares.map((square, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-md ${
                    square.filled ? "bg-primary-300" : "bg-[#d9d9d9]"
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
              {poolData.startsIn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 bg-[#202327b2] rounded-xl">
          <img
            className="w-3.5 h-[12.23px]"
            alt="Staking icon"
            src="/figmaAssets/group-3-1.png"
          />
          <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-white text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
            {poolData.stakingInfo}
          </p>
        </div>

        <Button className="w-full h-auto bg-opacityprimary rounded-xl border-[0.5px] border-[#87bbb7] font-body-md font-[number:var(--body-md-font-weight)] text-primary-100 text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] hover:bg-opacityprimary/80">
          JOIN CIRCLE - {poolData.spotsLeft} SPOTS LEFT
        </Button>
      </CardContent>
    </Card>
  );
};
