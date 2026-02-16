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
  {
    icon: "/figmaAssets/uil-wallet-1.svg",
    title: "Set up wallet",
    description: "set up your wallet to get your savings journey started",
  },
];

export const HowItWorksSection = (): JSX.Element => {
  return (
    <section className="bg-black py-16 px-20">
      <h2 className="text-center font-['Manrope',sans-serif] font-normal text-white text-[34px] leading-[48px] mb-16">
        HOW IT WORKS
      </h2>

      <div className="grid grid-cols-4 gap-6 max-w-[1280px] mx-auto">
        {howItWorksCards.map((card, index) => (
          <div
            key={index}
            className={`bg-[rgba(15,118,110,0.15)] border-[0.8px] border-solid border-[#cfe4e2] rounded-lg flex flex-col items-center gap-1.5 px-7 py-12 w-[259px] ${
              index >= 4 ? "col-span-1" : ""
            }`}
          >
            <img className="w-10 h-10" alt="Wallet" src={card.icon} />
            <div className="flex flex-col items-center gap-1 w-full text-center text-white">
              <h3 className="font-['Manrope',sans-serif] font-medium text-[24px] leading-[34px] w-full">
                {card.title}
              </h3>
              <p className="font-['Inter',sans-serif] font-normal text-[18px] leading-[28px] w-full">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
