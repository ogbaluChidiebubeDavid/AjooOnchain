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
    <footer className="w-full bg-[#121212] py-16 px-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between gap-12 mb-16">
          <div className="max-w-[360px]">
            <div className="inline-flex items-center justify-center p-2.5 mb-6">
              <div className="font-['Artifika',serif] font-normal text-[32px] leading-[30px] whitespace-nowrap">
                <span className="text-white">AJO</span>
                <span className="text-[#87bbb7]">O</span>
              </div>
            </div>

            <p className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px] mb-8">
              The crosschain protocol that turns traditional Ajo into an income
              generating asset.
            </p>

            <div className="flex items-center gap-6">
              <img
                className="w-6 h-6 cursor-pointer"
                alt="Facebook"
                src="/figmaAssets/facebook.png"
              />
              <img
                className="w-6 h-6 cursor-pointer"
                alt="LinkedIn"
                src="/figmaAssets/linkedin.png"
              />
            </div>
          </div>

          <div>
            <h3 className="font-['Manrope',sans-serif] font-semibold text-white text-[24px] leading-[34px] mb-3">
              Protocol
            </h3>
            <ul className="space-y-0">
              {footerLinks.protocol.map((link) => (
                <li
                  key={link}
                  className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px] cursor-pointer hover:text-[#0f766e] transition-colors"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Manrope',sans-serif] font-semibold text-white text-[24px] leading-[34px] mb-3">
              Company
            </h3>
            <ul className="space-y-0">
              {footerLinks.company.map((link) => (
                <li
                  key={link}
                  className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px] cursor-pointer hover:text-[#0f766e] transition-colors"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Manrope',sans-serif] font-semibold text-white text-[24px] leading-[34px] mb-3">
              Resources
            </h3>
            <ul className="space-y-0">
              {footerLinks.resources.map((link) => (
                <li
                  key={link}
                  className="font-['Inter',sans-serif] font-normal text-white text-[18px] leading-[28px] cursor-pointer hover:text-[#0f766e] transition-colors"
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
