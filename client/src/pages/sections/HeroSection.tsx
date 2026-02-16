import { ChevronDownIcon } from "lucide-react";

const navigationItems = [
  { label: "Home", active: true, hasDropdown: false },
  { label: "Products", active: false, hasDropdown: true },
  { label: "About", active: false, hasDropdown: false },
  { label: "Documentations", active: false, hasDropdown: false },
];

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative">
      <header className="w-full h-[84px] bg-surface-900 relative z-10">
        <div className="flex items-center justify-between h-full px-20">
          <div className="flex items-center justify-center gap-2.5 p-2.5">
            <div className="font-['Artifika',serif] font-normal text-[32px] tracking-[0] leading-[30px] whitespace-nowrap">
              <span className="text-white">AJO</span>
              <span className="text-[#87bbb7]">O</span>
            </div>
          </div>

          <nav className="flex items-center gap-16 px-4 py-2 rounded-3xl">
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center cursor-pointer ${
                  item.active
                    ? "justify-center border-b-2 border-[#0f766e]"
                    : ""
                }`}
              >
                <span
                  className={`font-['Inter',sans-serif] font-normal text-[16px] leading-[24px] whitespace-nowrap ${
                    item.active ? "text-[#0f766e]" : "text-white"
                  }`}
                >
                  {item.label}
                </span>
                {item.hasDropdown && (
                  <ChevronDownIcon className="w-6 h-6 text-white" />
                )}
              </div>
            ))}
          </nav>

          <button className="inline-flex items-center justify-center px-4 py-2 bg-[#0f766e] rounded-3xl hover:bg-[#0f766e]/90 transition-colors">
            <span className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px] whitespace-nowrap">
              Launch App
            </span>
          </button>
        </div>
      </header>

      <div className="relative overflow-hidden bg-black">
        <img
          className="absolute top-0 left-[90px] w-[1170px] h-[1195px] pointer-events-none opacity-15"
          alt=""
          src="/figmaAssets/untitled-design--15--1.png"
        />

        <div className="relative flex items-start justify-between px-20 pt-[140px] pb-[100px]">
          <div className="max-w-[668px] z-10">
            <h1 className="font-['Manrope',sans-serif] font-semibold text-white text-[60px] leading-[78px] mb-8">
              Don't Just Save. Multiply Your Wealth Together
            </h1>

            <p className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px] mb-10 max-w-[634px]">
              The crosschain protocol that turns traditional Ajo into an income
              generating asset. Enjoy instant payouts and high yield interest on
              your rotational savings.
            </p>

            <button className="inline-flex items-center justify-center px-4 py-2 bg-[#0f766e] rounded-3xl hover:bg-[#0f766e]/90 transition-colors">
              <span className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px]">
                Launch App
              </span>
            </button>
          </div>

          <div className="flex-shrink-0 relative">
            <img
              className="w-[706px] h-[580px] object-contain"
              alt="Hero illustration"
              src="/figmaAssets/untitled-design--6--1.png"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-16 pb-20 px-20">
          <img
            className="h-[75px] object-contain"
            alt="Powered by Avalanche"
            src="/figmaAssets/group-1.png"
          />
        </div>
      </div>
    </section>
  );
};
