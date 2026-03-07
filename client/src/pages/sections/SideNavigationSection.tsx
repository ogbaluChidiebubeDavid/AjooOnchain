<<<<<<< HEAD
import { ChevronLeftIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
=======
import { ChevronLeftIcon, MenuIcon, XIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";
>>>>>>> main

const navigationItems = [
  {
    id: "overview",
    label: "Overview",
    icon: "/figmaAssets/subway-four-box.svg",
<<<<<<< HEAD
    isActive: true,
=======
    path: "/",
>>>>>>> main
  },
  {
    id: "assets",
    label: "Assets",
    icon: "/figmaAssets/uil-wallet.svg",
<<<<<<< HEAD
    isActive: false,
=======
    path: "/assets",
>>>>>>> main
  },
  {
    id: "rotational-savings",
    label: "Rotational Savings",
    icon: "/figmaAssets/nrk-rotate.svg",
    secondaryIcon: "/figmaAssets/material-symbols-savings-outline-rounded.svg",
<<<<<<< HEAD
    isActive: false,
=======
    path: "/rotational-savings",
>>>>>>> main
  },
  {
    id: "yields",
    label: "Yields",
    icon: "/figmaAssets/badge-dollar-sign.svg",
<<<<<<< HEAD
    isActive: false,
  },
];

export const SideNavigationSection = (): JSX.Element => {
  return (
    <aside className="relative w-full h-full bg-black shadow-[2px_0px_2px_#ffffff40]">
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between p-8">
          <div className="flex items-center gap-2.5">
            <h1 className="[font-family:'Syne',Helvetica] font-semibold text-[32px] leading-[30px] whitespace-nowrap">
              <span className="text-white">AJO</span>
              <span className="text-[#87bbb7]">O</span>
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 p-0 hover:bg-transparent"
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </Button>
        </header>

        <nav className="flex flex-col gap-3 px-[18px] mt-[78px]">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full h-auto justify-start gap-2.5 pl-6 pr-10 py-2.5 rounded-xl hover:bg-primary-300 ${
                item.isActive ? "bg-primary-300" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-2.5 p-2 bg-primary-400 rounded-full">
                {item.secondaryIcon ? (
                  <div className="relative w-6 h-6">
                    <img
                      className="absolute w-[82.35%] top-[5px] left-0 h-5"
                      alt={item.label}
                      src={item.icon}
                    />
                    <img
                      className="absolute w-[70.59%] top-0 left-[29.41%] h-[17px]"
                      alt={item.label}
                      src={item.secondaryIcon}
                    />
                  </div>
                ) : (
                  <img
                    className="w-[22px] h-[22px]"
                    alt={item.label}
                    src={item.icon}
                  />
                )}
              </div>
              <span className="font-title-lg font-[number:var(--title-lg-font-weight)] text-surface-300 text-[length:var(--title-lg-font-size)] tracking-[var(--title-lg-letter-spacing)] leading-[var(--title-lg-line-height)] [font-style:var(--title-lg-font-style)]">
                {item.label}
              </span>
            </Button>
          ))}
        </nav>

        <footer className="mt-auto px-[18px] pb-[86px]">
          <div className="flex items-center gap-2.5 px-10 py-2.5">
            <Avatar className="w-10 h-10 bg-primary-400">
              <AvatarFallback className="bg-primary-400 font-title-xl font-[number:var(--title-xl-font-weight)] text-primary-200 text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
                A
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="[font-family:'Poppins',Helvetica] font-medium text-white text-xl leading-7 whitespace-nowrap">
                0x2f3a...d76c
              </p>
              <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                Avalanche
              </p>
              <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                ~ Connected
              </p>
            </div>
          </div>
        </footer>
      </div>
    </aside>
=======
    path: "/yields",
  },
];

interface SideNavigationSectionProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export const SideNavigationSection = ({
  mobileOpen,
  onClose,
}: SideNavigationSectionProps): JSX.Element => {
  const [location, setLocation] = useLocation();

  const handleNavigate = (path: string) => {
    setLocation(path);
    onClose?.();
  };

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-[280px] lg:w-[301px] bg-black shadow-[2px_0px_2px_#ffffff40]
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-6 lg:p-8">
            <div className="flex items-center gap-2.5">
              <h1 className="[font-family:'Syne',Helvetica] font-semibold text-[28px] lg:text-[32px] leading-[30px] whitespace-nowrap">
                <span className="text-white">AJO</span>
                <span className="text-[#87bbb7]">O</span>
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 p-0 hover:bg-transparent lg:flex"
              onClick={onClose}
            >
              <XIcon className="w-5 h-5 text-white lg:hidden" />
              <ChevronLeftIcon className="w-6 h-6 text-white hidden lg:block" />
            </Button>
          </header>

          <nav className="flex flex-col gap-3 px-[18px] mt-8 lg:mt-[78px]">
            {navigationItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location === "/"
                  : location.startsWith(item.path);
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full h-auto justify-start gap-2.5 pl-6 pr-10 py-2.5 rounded-xl hover:bg-[#0a4f49] transition-colors ${
                    isActive ? "bg-[#0a4f49]" : ""
                  }`}
                  onClick={() => handleNavigate(item.path)}
                >
                  <div className="flex items-center justify-center gap-2.5 p-2 bg-[#052725] rounded-full">
                    {item.secondaryIcon ? (
                      <div className="relative w-6 h-6">
                        <img
                          className="absolute w-[82.35%] top-[5px] left-0 h-5"
                          alt={item.label}
                          src={item.icon}
                        />
                        <img
                          className="absolute w-[70.59%] top-0 left-[29.41%] h-[17px]"
                          alt={item.label}
                          src={item.secondaryIcon}
                        />
                      </div>
                    ) : (
                      <img
                        className="w-[22px] h-[22px]"
                        alt={item.label}
                        src={item.icon}
                      />
                    )}
                  </div>
                  <span className="font-title-lg font-[number:var(--title-lg-font-weight)] text-surface-300 text-[length:var(--title-lg-font-size)] tracking-[var(--title-lg-letter-spacing)] leading-[var(--title-lg-line-height)] [font-style:var(--title-lg-font-style)]">
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </nav>

          <footer className="mt-auto px-[18px] pb-12 lg:pb-[86px]">
            <div className="flex items-center gap-2.5 px-6 lg:px-10 py-2.5">
              <Avatar className="w-10 h-10 bg-[#052725]">
                <AvatarFallback className="bg-[#052725] font-title-xl font-[number:var(--title-xl-font-weight)] text-[#0f766e] text-[length:var(--title-xl-font-size)] tracking-[var(--title-xl-letter-spacing)] leading-[var(--title-xl-line-height)] [font-style:var(--title-xl-font-style)]">
                  A
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <p className="[font-family:'Poppins',Helvetica] font-medium text-white text-xl leading-7 whitespace-nowrap">
                  0x2f3a...d76c
                </p>
                <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                  Avalanche
                </p>
                <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-surface-500 text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                  ~ Connected
                </p>
              </div>
            </div>
          </footer>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export const MobileMenuButton = ({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden fixed top-4 left-4 z-50 bg-black/80 border border-white/10 rounded-lg"
      onClick={onClick}
    >
      <MenuIcon className="w-5 h-5 text-white" />
    </Button>
>>>>>>> main
  );
};
