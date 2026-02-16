import { ChevronDownIcon, Menu, X } from "lucide-react";
import { useState } from "react";

const navigationItems = [
  { label: "Home", active: true, hasDropdown: false },
  { label: "Products", active: false, hasDropdown: true },
  { label: "About", active: false, hasDropdown: false },
  { label: "Documentations", active: false, hasDropdown: false },
];

export const HeroSection = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative">
      <header className="w-full bg-[#202327] relative z-20">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between h-[84px] px-6 md:px-12 lg:px-20">
          <div className="flex items-center p-2.5">
            <div className="font-['Artifika',serif] font-normal text-[28px] md:text-[32px] leading-[30px] whitespace-nowrap">
              <span className="text-white">AJO</span>
              <span className="text-[#87bbb7]">O</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10 xl:gap-16 px-4 py-2" data-testid="nav-desktop">
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center cursor-pointer ${
                  item.active ? "border-b-2 border-[#0f766e] pb-0.5" : ""
                }`}
                data-testid={`nav-item-${item.label.toLowerCase()}`}
              >
                <span
                  className={`font-['Inter',sans-serif] font-normal text-[16px] leading-[24px] whitespace-nowrap ${
                    item.active ? "text-[#0f766e]" : "text-white"
                  }`}
                >
                  {item.label}
                </span>
                {item.hasDropdown && (
                  <ChevronDownIcon className="w-5 h-5 text-white ml-1" />
                )}
              </div>
            ))}
          </nav>

          <button
            className="hidden lg:inline-flex items-center justify-center px-5 py-2 bg-[#0f766e] rounded-3xl hover:bg-[#0f766e]/90 transition-colors"
            data-testid="button-launch-app-header"
          >
            <span className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px] whitespace-nowrap">
              Launch App
            </span>
          </button>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#202327] border-t border-white/10 px-6 pb-6">
            <nav className="flex flex-col gap-4 pt-4">
              {navigationItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  data-testid={`nav-mobile-item-${item.label.toLowerCase()}`}
                >
                  <span
                    className={`font-['Inter',sans-serif] font-normal text-[16px] leading-[24px] ${
                      item.active ? "text-[#0f766e]" : "text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.hasDropdown && (
                    <ChevronDownIcon className="w-5 h-5 text-white ml-1" />
                  )}
                </div>
              ))}
              <button
                className="inline-flex items-center justify-center px-5 py-2 bg-[#0f766e] rounded-3xl mt-2 w-fit"
                data-testid="button-launch-app-mobile"
              >
                <span className="font-['Inter',sans-serif] font-normal text-white text-[16px] leading-[24px]">
                  Launch App
                </span>
              </button>
            </nav>
          </div>
        )}
      </header>

      <div className="relative overflow-hidden bg-black">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-15"
          alt=""
          src="/figmaAssets/untitled-design--15--1.png"
        />

        <div className="relative max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between px-6 md:px-12 lg:px-20 pt-16 md:pt-24 lg:pt-[140px] pb-16 lg:pb-[100px] gap-8 lg:gap-4">
          <div className="max-w-[668px] z-10 text-center lg:text-left">
            <h1 className="font-['Manrope',sans-serif] font-semibold text-white text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[60px] lg:leading-[78px] mb-6 md:mb-8">
              Don't Just Save. Multiply Your Wealth Together
            </h1>

            <p className="font-['Inter',sans-serif] font-normal text-white text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] mb-8 md:mb-10">
              The crosschain protocol that turns traditional Ajo into an income
              generating asset. Enjoy instant payouts and high yield interest on
              your rotational savings.
            </p>

            <button
              className="inline-flex items-center justify-center px-5 py-2 bg-[#0f766e] rounded-3xl hover:bg-[#0f766e]/90 transition-colors"
              data-testid="button-launch-app-hero"
            >
              <span className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px]">
                Launch App
              </span>
            </button>
          </div>

          <div className="flex-shrink-0 relative w-full max-w-[500px] lg:max-w-[706px]">
            <img
              className="w-full h-auto object-contain"
              alt="Hero illustration"
              src="/figmaAssets/untitled-design--6--1.png"
            />
          </div>
        </div>

        <div className="flex items-center justify-center pb-12 lg:pb-20 px-6 md:px-12 lg:px-20">
          <img
            className="h-[50px] md:h-[65px] lg:h-[75px] object-contain max-w-full"
            alt="Powered by Avalanche"
            src="/figmaAssets/group-1.png"
          />
        </div>
      </div>
    </section>
  );
};
