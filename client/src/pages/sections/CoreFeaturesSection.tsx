import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    title: "Decentralized Rotational Savings",
    description: 'Automate the "Ajo" cycle for groups of 2-4 people via smart contracts.',
    image: "/figmaAssets/pngwing-com--1--1.png",
  },
  {
    title: "Yield Generation",
    description: 'Generate "Remittance Interest" by routing idle pool funds through Avalanche DeFi protocols.',
    image: "/figmaAssets/pngwing-com--1--1-2.png",
  },
  {
    title: "Interoperable Access",
    description: "Enable users on Ethereum, BSC, or Polygon to participate without manual bridging.",
    image: "/figmaAssets/pngwing-com--1--1-3.png",
  },
  {
    title: "Targeted Commodity Savings",
    description: "Facilitate bulk purchasing of festive items through time-locked goal-based vaults.",
    image: "/figmaAssets/pngwing-com--1--1-1.png",
  },
];

export const CoreFeaturesSection = (): JSX.Element => {
  const heading = useScrollReveal(0.1);
  const grid = useScrollReveal(0.1);

  return (
    <section className="bg-black py-16 md:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={heading.ref} className={`reveal ${heading.isVisible ? "visible" : ""}`}>
          <h2 className="text-center font-['Manrope',sans-serif] font-normal text-white text-[28px] md:text-[34px] leading-[40px] md:leading-[48px] mb-12 md:mb-16">
            CORE FEATURES
          </h2>
        </div>

        <div ref={grid.ref} className={`reveal ${grid.isVisible ? "visible" : ""} grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-6 px-6 md:px-8 py-8 md:py-[34px] rounded-3xl border border-white"
              data-testid={`card-feature-${index}`}
            >
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <h3 className="font-['Manrope',sans-serif] font-normal text-white text-[20px] md:text-[24px] leading-[28px] md:leading-[34px]">
                  {feature.title}
                </h3>
                <p className="font-['Inter',sans-serif] font-normal text-white text-[13px] md:text-[14px] leading-[18px] md:leading-[20px]">
                  {feature.description}
                </p>
              </div>
              <img
                className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 object-cover"
                alt={feature.title}
                src={feature.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
