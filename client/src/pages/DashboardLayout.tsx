import { useState } from "react";
import { SideNavigationSection, MobileMenuButton } from "./sections/SideNavigationSection";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps): JSX.Element => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-black">
      <div className="absolute top-[104px] left-[83px] w-[400px] lg:w-[879px] h-[400px] lg:h-[879px] bg-primary-400 rounded-full blur-[200px] lg:blur-[300px] opacity-50 pointer-events-none" />

      <MobileMenuButton onClick={() => setMobileNavOpen(true)} />

      <SideNavigationSection
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <main className="relative lg:pl-[301px] min-h-screen">
        <div className="px-4 sm:px-6 lg:px-[71px] pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
};
