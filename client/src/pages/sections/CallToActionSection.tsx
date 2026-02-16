export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#121212] py-16 md:py-20 lg:py-[74px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-8">
          <div className="flex flex-col gap-12 md:gap-16 lg:gap-[114px] max-w-[668px] text-center lg:text-left">
            <h2 className="font-['Manrope',sans-serif] font-semibold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[60px] lg:leading-[78px]">
              <span className="text-white">Get Your </span>
              <span className="text-[#0f766e]">Savings</span>
              <span className="text-white"> Journey Started</span>
            </h2>

            <button
              className="inline-flex items-center justify-center px-5 py-2 bg-[#0f766e] rounded-3xl hover:bg-[#0f766e]/90 transition-colors w-fit mx-auto lg:mx-0"
              data-testid="button-launch-app-cta"
            >
              <span className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px]">
                Launch App
              </span>
            </button>
          </div>

          <div className="relative flex-shrink-0 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[400px] lg:w-[500px] lg:h-[420px]">
            <img
              className="absolute top-0 right-0 w-[65%] h-[90%] object-cover"
              alt="Savings illustration"
              src="/figmaAssets/untitled-design--14--1.png"
            />
            <img
              className="absolute bottom-0 left-0 w-[80%] h-[85%] object-cover"
              alt="Financial graphics"
              src="/figmaAssets/untitled-design--13--1.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
