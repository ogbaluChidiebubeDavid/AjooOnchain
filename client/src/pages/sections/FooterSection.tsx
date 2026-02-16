const footerLinks = {
  protocol: [
    "Rotational Savings",
    "Yield Generation",
    "Interoperability",
    "Target Savings",
  ],
  company: [
    "About Us",
    "Partners",
    "Career",
    "Contact Us",
    "Privacy Policy",
    "Term of Service",
  ],
  resources: ["Documentations", "Help Center"],
};

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="w-full bg-[#121212] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 md:mb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="inline-flex items-center p-2.5 mb-4 md:mb-6">
              <div className="font-['Artifika',serif] font-normal text-[28px] md:text-[32px] leading-[30px] whitespace-nowrap">
                <span className="text-white">AJO</span>
                <span className="text-[#87bbb7]">O</span>
              </div>
            </div>

            <p className="font-['Inter',sans-serif] font-normal text-white text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] mb-6 md:mb-8 max-w-[360px]">
              The crosschain protocol that turns traditional Ajo into an income
              generating asset.
            </p>

            <div className="flex items-center gap-6">
              <img
                className="w-6 h-6 cursor-pointer"
                alt="Facebook"
                src="/figmaAssets/facebook.png"
                data-testid="link-facebook"
              />
              <img
                className="w-6 h-6 cursor-pointer"
                alt="LinkedIn"
                src="/figmaAssets/linkedin.png"
                data-testid="link-linkedin"
              />
            </div>
          </div>

          <div>
            <h3 className="font-['Manrope',sans-serif] font-semibold text-white text-[20px] md:text-[24px] leading-[30px] md:leading-[34px] mb-3">
              Protocol
            </h3>
            <ul className="space-y-1">
              {footerLinks.protocol.map((link) => (
                <li
                  key={link}
                  className="font-['Inter',sans-serif] font-normal text-white text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] cursor-pointer hover:text-[#0f766e] transition-colors"
                  data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Manrope',sans-serif] font-semibold text-white text-[20px] md:text-[24px] leading-[30px] md:leading-[34px] mb-3">
              Company
            </h3>
            <ul className="space-y-1">
              {footerLinks.company.map((link) => (
                <li
                  key={link}
                  className="font-['Inter',sans-serif] font-normal text-white text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] cursor-pointer hover:text-[#0f766e] transition-colors"
                  data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Manrope',sans-serif] font-semibold text-white text-[20px] md:text-[24px] leading-[30px] md:leading-[34px] mb-3">
              Resources
            </h3>
            <ul className="space-y-1">
              {footerLinks.resources.map((link) => (
                <li
                  key={link}
                  className="font-['Inter',sans-serif] font-normal text-white text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] cursor-pointer hover:text-[#0f766e] transition-colors"
                  data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-white/20" />
      </div>
    </footer>
  );
};
