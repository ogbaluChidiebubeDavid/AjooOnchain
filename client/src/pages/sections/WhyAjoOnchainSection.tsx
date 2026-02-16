export const WhyAjoOnchainSection = (): JSX.Element => {
  return (
    <section className="relative bg-black py-16 overflow-hidden">
      <img
        className="absolute top-0 left-[108px] w-[1268px] h-[1197px] pointer-events-none opacity-10"
        alt=""
        src="/figmaAssets/untitled-design--15--2.png"
      />

      <h2 className="relative z-10 text-center font-['Manrope',sans-serif] font-normal text-[34px] leading-[48px] mb-16">
        <span className="text-white">WHY </span>
        <span className="text-[#0f766e]">AJO</span>
        <span className="text-white"> ONCHAIN?</span>
      </h2>

      <div className="relative z-10 flex items-start justify-between px-20 gap-12">
        <div className="flex-shrink-0">
          <img
            className="w-[640px] h-[406px] object-cover"
            alt="Crypto coins"
            src="/figmaAssets/pngwing-com--3--1.png"
          />
        </div>

        <div className="max-w-[523px] pt-0">
          <h3 className="font-['Manrope',sans-serif] font-semibold text-white text-[34px] leading-[48px] mb-8">
            <span>Integrating </span>
            <span className="text-[#0f766e]">Web3</span>
            <span> to Rotational saving model</span>
          </h3>

          <p className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px] mb-10">
            Ajoo Onchain is a decentralized fintech protocol that digitizes
            the traditional West African "Ajo/Esusu" rotational savings model.
            By utilizing the Avalanche network, the platform provides
            near-instant finality and low fees, while its interoperable
            architecture allows users to contribute funds from any
            EVM-compatible chain.
          </p>

          <button className="inline-flex items-center justify-center px-4 py-2 bg-[#0f766e] rounded-3xl hover:bg-[#0f766e]/90 transition-colors">
            <span className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px]">
              Learn More
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
