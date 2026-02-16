import { useScrollReveal } from "@/hooks/useScrollReveal";

export const WhyAjoOnchainSection = (): JSX.Element => {
  const heading = useScrollReveal(0.1);
  const content = useScrollReveal(0.1);

  return (
    <section className="relative bg-black py-16 md:py-20 lg:py-24 overflow-hidden">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-10"
        alt=""
        src="/figmaAssets/untitled-design--15--2.png"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={heading.ref} className={`reveal ${heading.isVisible ? "visible" : ""}`}>
          <h2 className="text-center font-['Manrope',sans-serif] font-normal text-[28px] md:text-[34px] leading-[40px] md:leading-[48px] mb-12 md:mb-16">
            <span className="text-white">WHY </span>
            <span className="text-[#0f766e]">AJO</span>
            <span className="text-white"> ONCHAIN?</span>
          </h2>
        </div>

        <div ref={content.ref} className={`reveal ${content.isVisible ? "visible" : ""} flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-12`}>
          <div className="flex-shrink-0 w-full max-w-[500px] lg:max-w-[640px]">
            <img
              className="w-full h-auto object-cover"
              alt="Crypto coins"
              src="/figmaAssets/pngwing-com--3--1.png"
            />
          </div>

          <div className="max-w-[523px] text-center lg:text-left">
            <h3 className="font-['Manrope',sans-serif] font-semibold text-white text-[28px] md:text-[34px] leading-[38px] md:leading-[48px] mb-6 md:mb-8">
              <span>Integrating </span>
              <span className="text-[#0f766e]">Web3</span>
              <span> to Rotational saving model</span>
            </h3>

            <p className="font-['Inter',sans-serif] font-normal text-white text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] mb-8 md:mb-10">
              Ajoo Onchain is a decentralized fintech protocol that digitizes
              the traditional West African "Ajo/Esusu" rotational savings model.
              By utilizing the Avalanche network, the platform provides
              near-instant finality and low fees, while its interoperable
              architecture allows users to contribute funds from any
              EVM-compatible chain.
            </p>

            <button
              className="inline-flex items-center justify-center px-5 py-2 bg-[#0f766e] rounded-3xl hover:bg-[#0f766e]/90 transition-colors"
              data-testid="button-learn-more"
            >
              <span className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px]">
                Learn More
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
