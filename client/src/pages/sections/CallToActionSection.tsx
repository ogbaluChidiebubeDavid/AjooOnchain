export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#121212] py-[74px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-20 relative">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[114px] max-w-[668px]">
            <h2 className="font-['Manrope',sans-serif] font-semibold text-[60px] leading-[78px]">
              <span className="text-white">Get Your </span>
              <span className="text-[#0f766e]">Savings</span>
              <span className="text-white"> Journey Started</span>
            </h2>

            <button className="inline-flex items-center justify-center px-4 py-2 bg-[#0f766e] rounded-3xl hover:bg-[#0f766e]/90 transition-colors w-fit">
              <span className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px]">
                Launch App
              </span>
            </button>
          </div>

          <div className="relative flex-shrink-0">
            <img
              className="relative w-[394px] h-[379px] object-cover"
              alt="Savings illustration"
              src="/figmaAssets/untitled-design--14--1.png"
            />
            <img
              className="absolute top-[24px] -left-[142px] w-[467px] h-[379px] object-cover"
              alt="Financial graphics"
              src="/figmaAssets/untitled-design--13--1.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
