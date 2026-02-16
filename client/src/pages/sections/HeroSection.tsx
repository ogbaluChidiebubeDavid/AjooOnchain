import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { label: "Home", active: true, hasDropdown: false },
  { label: "Products", active: false, hasDropdown: true },
  { label: "About", active: false, hasDropdown: false },
  { label: "Documentations", active: false, hasDropdown: false },
];

export const HeroSection = (): JSX.Element => {
  return (
    <header className="w-full h-[84px] bg-surface-900 relative">
      <div className="flex items-center justify-between h-full px-20">
        <div className="flex items-center justify-center gap-2.5 p-2.5">
          <div className="[font-family:'Artifika',Helvetica] font-normal text-[32px] tracking-[0] leading-[30px] whitespace-nowrap">
            <span className="text-white">AJO</span>
            <span className="text-[#87bbb7]">O</span>
          </div>
        </div>

        <nav className="flex items-center gap-16 px-4 py-2 rounded-3xl">
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center ${
                item.active
                  ? "justify-center gap-2.5 border-b-2 border-teal-700"
                  : ""
              }`}
            >
              <div
                className={`font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] whitespace-nowrap [font-style:var(--body-lg-font-style)] ${
                  item.active ? "text-primary-200" : "text-white"
                }`}
              >
                {item.label}
              </div>
              {item.hasDropdown && (
                <ChevronDownIcon className="w-6 h-6 text-white" />
              )}
            </div>
          ))}
        </nav>

        <Button className="h-auto inline-flex items-center justify-center gap-2.5 px-4 py-2 bg-primary-200 rounded-3xl hover:bg-primary-200/90">
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-white text-base tracking-[0] leading-[30px] whitespace-nowrap">
            Launch App
          </span>
        </Button>
      </div>
    </header>
  );
};
