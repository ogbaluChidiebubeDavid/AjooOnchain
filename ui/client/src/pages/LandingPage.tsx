import { CallToActionSection } from "./sections/CallToActionSection";
import { CoreFeaturesSection } from "./sections/CoreFeaturesSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { WhyAjoOnchainSection } from "./sections/WhyAjoOnchainSection";

export const LandingPage = (): JSX.Element => {
  return (
    <div className="bg-black w-full min-h-screen">
      <HeroSection />
      <WhyAjoOnchainSection />
      <CoreFeaturesSection />
      <HowItWorksSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};
