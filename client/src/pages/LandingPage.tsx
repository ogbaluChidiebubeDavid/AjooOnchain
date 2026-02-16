import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CallToActionSection } from "./sections/CallToActionSection";
import { CoreFeaturesSection } from "./sections/CoreFeaturesSection";
import { FeatureDetailsSection } from "./sections/FeatureDetailsSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { WhyAjoOnchainSection } from "./sections/WhyAjoOnchainSection";

const howItWorksCards = [
  {
    icon: "/figmaAssets/uil-wallet-1.svg",
    title: "Set up wallet",
    description: "set up your wallet to get your savings journey started",
  },
  {
    icon: "/figmaAssets/uil-wallet-1.svg",
    title: "Set up wallet",
    description: "set up your wallet to get your savings journey started",
  },
  {
    icon: "/figmaAssets/uil-wallet.png",
    title: "Set up wallet",
    description: "set up your wallet to get your savings journey started",
  },
  {
    icon: "/figmaAssets/uil-wallet-1.svg",
    title: "Set up wallet",
    description: "set up your wallet to get your savings journey started",
  },
  {
    icon: "/figmaAssets/uil-wallet-1.svg",
    title: "Set up wallet",
    description: "set up your wallet to get your savings journey started",
  },
  {
    icon: "/figmaAssets/uil-wallet-1.svg",
    title: "Set up wallet",
    description: "set up your wallet to get your savings journey started",
  },
];

export const LandingPage = (): JSX.Element => {
  return (
    <div className="bg-black w-full min-w-[1440px] relative">
      <HeroSection />

      <section className="relative w-full">
        <img
          className="absolute top-[54px] left-[90px] w-[1170px] h-[1195px] pointer-events-none"
          alt="Untitled design"
          src="/figmaAssets/untitled-design--15--1.png"
        />

        <img
          className="absolute top-[1195px] left-[108px] w-[1268px] h-[1197px] pointer-events-none"
          alt="Untitled design"
          src="/figmaAssets/untitled-design--15--2.png"
        />

        <div className="absolute top-[490px] left-20 w-[634px] font-body-xl font-[number:var(--body-xl-font-weight)] text-surface-50 text-[length:var(--body-xl-font-size)] tracking-[var(--body-xl-letter-spacing)] leading-[var(--body-xl-line-height)] [font-style:var(--body-xl-font-style)]">
          The crosschain protocol that turns traditional Ajo into an income
          generating asset. Enjoy instant payouts and high yield interest on
          your rotational savings.
        </div>

        <Button className="absolute top-[606px] left-20 px-8 py-2 h-auto bg-primary-200 rounded-3xl [font-family:'Manrope',Helvetica] font-semibold text-white text-base tracking-[0] leading-[30px]">
          Launch App
        </Button>

        <img
          className="absolute top-[826px] left-[calc(50.00%_-_400px)] w-[800px] h-[78px]"
          alt="Group"
          src="/figmaAssets/group-1.png"
        />

        <h2 className="absolute top-[936px] left-[calc(50.00%_-_157px)] [font-family:'Manrope',Helvetica] font-normal text-[34px] tracking-[0] leading-[34px]">
          <span className="text-white leading-[var(--heading-md-line-height)] font-heading-md [font-style:var(--heading-md-font-style)] font-[number:var(--heading-md-font-weight)] tracking-[var(--heading-md-letter-spacing)] text-[length:var(--heading-md-font-size)]">
            WHY{" "}
          </span>
          <span className="text-teal-700 leading-[var(--heading-md-line-height)] font-heading-md [font-style:var(--heading-md-font-style)] font-[number:var(--heading-md-font-weight)] tracking-[var(--heading-md-letter-spacing)] text-[length:var(--heading-md-font-size)]">
            AJO
          </span>
          <span className="text-white leading-[var(--heading-md-line-height)] font-heading-md [font-style:var(--heading-md-font-style)] font-[number:var(--heading-md-font-weight)] tracking-[var(--heading-md-letter-spacing)] text-[length:var(--heading-md-font-size)]">
            {" "}
            ONCHAIN?
          </span>
        </h2>

        <img
          className="absolute top-[1016px] left-[92px] w-[640px] h-[406px] object-cover"
          alt="Pngwing com"
          src="/figmaAssets/pngwing-com--3--1.png"
        />

        <h3 className="absolute top-[1016px] left-[780px] w-[523px] [font-family:'Manrope',Helvetica] font-semibold text-[34px] tracking-[0] leading-[48px]">
          <span className="text-white">Integrating </span>
          <span className="text-teal-700">Web3</span>
          <span className="text-white"> to Rotational saving model</span>
        </h3>

        <p className="absolute top-[1144px] left-[780px] w-[482px] font-body-xl font-[number:var(--body-xl-font-weight)] text-white text-[length:var(--body-xl-font-size)] tracking-[var(--body-xl-letter-spacing)] leading-[var(--body-xl-line-height)] [font-style:var(--body-xl-font-style)]">
          Ajoo Onchain is a decentralized fintech protocol that digitizes the
          traditional West African <br />
          &#34;Ajo/Esusu&#34; rotational savings model. By utilizing the
          Avalanche network, the platform provides <br />
          near-instant finality and low fees, while its interoperable
          architecture allows users to contribute <br />
          funds from any EVM-compatible chain.
        </p>

        <Button className="absolute top-[1372px] left-[780px] w-[153px] px-4 py-2 h-auto bg-primary-200 rounded-3xl [font-family:'Manrope',Helvetica] font-semibold text-white text-base tracking-[0] leading-[30px]">
          Learn More
        </Button>

        <h2 className="absolute top-[1450px] left-[calc(50.00%_-_129px)] font-heading-md font-[number:var(--heading-md-font-weight)] text-white text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] whitespace-nowrap [font-style:var(--heading-md-font-style)]">
          CORE FEATURES
        </h2>

        <h2 className="absolute top-[2010px] left-[calc(50.00%_-_118px)] font-heading-md font-[number:var(--heading-md-font-weight)] text-white text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] whitespace-nowrap [font-style:var(--heading-md-font-style)]">
          HOW IT WORKS
        </h2>

        <div className="absolute top-[2090px] left-20 grid grid-cols-4 gap-[81px]">
          {howItWorksCards.map((card, index) => (
            <Card
              key={`how-it-works-${index}`}
              className={`w-[259px] bg-[#0f766e26] rounded-lg border-[0.8px] border-solid border-[#cfe4e2] ${
                index >= 4 ? "mt-[296px]" : ""
              } ${index === 4 ? "col-start-1" : ""} ${index === 5 ? "col-start-2" : ""}`}
            >
              <CardContent className="flex flex-col items-center gap-1.5 px-7 py-12">
                <img className="w-10 h-10" alt="Uil wallet" src={card.icon} />
                <div className="flex flex-col items-center gap-1 w-full">
                  <h3 className="w-full [font-family:'Manrope',Helvetica] font-medium text-white text-2xl text-center tracking-[0] leading-[34px]">
                    {card.title}
                  </h3>
                  <p className="w-full font-body-xl font-[number:var(--body-xl-font-weight)] text-white text-[length:var(--body-xl-font-size)] text-center tracking-[var(--body-xl-letter-spacing)] leading-[var(--body-xl-line-height)] [font-style:var(--body-xl-font-style)]">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="absolute top-56 left-20 w-[668px] font-heading-xl-bold font-[number:var(--heading-xl-bold-font-weight)] text-white text-[length:var(--heading-xl-bold-font-size)] tracking-[var(--heading-xl-bold-letter-spacing)] leading-[var(--heading-xl-bold-line-height)] [font-style:var(--heading-xl-bold-font-style)]">
          Don&apos;t Just Save. Multiply Your Wealth Together
        </div>

        <img
          className="absolute top-[193px] left-[674px] w-[706px] h-[580px]"
          alt="Untitled design"
          src="/figmaAssets/untitled-design--6--1.png"
        />
      </section>

      <WhyAjoOnchainSection />
      <CoreFeaturesSection />
      <FeatureDetailsSection />
      <HowItWorksSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};
