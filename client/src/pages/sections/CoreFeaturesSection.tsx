const features = [
  {
    title: "Decentralized Rotational Savings",
    description: 'Automate the "Ajo" cycle for groups of 2–4 people via smart contracts.',
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
  return (
    <section className="bg-black py-16 px-20">
      <h2 className="text-center font-['Manrope',sans-serif] font-normal text-white text-[34px] leading-[48px] mb-16">
        CORE FEATURES
      </h2>

      <div className="grid grid-cols-2 gap-8 max-w-[1280px] mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-6 px-[31px] py-[34px] rounded-3xl border border-white"
          >
            <div className="flex flex-col gap-3 flex-1">
              <h3 className="font-['Manrope',sans-serif] font-normal text-white text-[24px] leading-[34px]">
                {feature.title}
              </h3>
              <p className="font-['Inter',sans-serif] font-normal text-white text-[14px] leading-[20px] max-w-[204px]">
                {feature.description}
              </p>
            </div>
            <img
              className="w-24 h-24 flex-shrink-0 object-cover"
              alt={feature.title}
              src={feature.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
