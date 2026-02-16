import { useScrollReveal } from "@/hooks/useScrollReveal";

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
  const heading = useScrollReveal(0.1);
  const grid = useScrollReveal(0.05);

  return (
    <section className="bg-black py-16 md:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={heading.ref} className={`reveal ${heading.isVisible ? "visible" : ""}`}>
          <h2 className="text-center font-['Manrope',sans-serif] font-normal text-white text-[28px] md:text-[34px] leading-[40px] md:leading-[48px] mb-12 md:mb-16">
            HOW IT WORKS
          </h2>
        </div>

        <div ref={grid.ref} className={`reveal ${grid.isVisible ? "visible" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`}>
          {howItWorksCards.map((card, index) => (
            <div
              key={index}
              className="bg-[rgba(15,118,110,0.15)] border-[0.8px] border-solid border-[#cfe4e2] rounded-lg flex flex-col items-center gap-2 px-6 py-10 md:px-7 md:py-12"
              data-testid={`card-how-it-works-${index}`}
            >
              <img className="w-10 h-10" alt="Wallet" src={card.icon} />
              <div className="flex flex-col items-center gap-1 w-full text-center text-white">
                <h3 className="font-['Manrope',sans-serif] font-medium text-[20px] md:text-[24px] leading-[30px] md:leading-[34px] w-full">
                  {card.title}
                </h3>
                <p className="font-['Inter',sans-serif] font-normal text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] w-full">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
