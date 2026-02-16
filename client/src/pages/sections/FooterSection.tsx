import { Separator } from "@/components/ui/separator";

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

const socialIcons = [
  {
    name: "Facebook",
    src: "/figmaAssets/facebook.png",
  },
  {
    name: "Linkedin",
    src: "/figmaAssets/linkedin.png",
  },
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="w-full bg-dark-50 py-16 px-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="inline-flex items-center justify-center gap-2.5 p-2.5 mb-6">
              <div className="relative w-fit [font-family:'Artifika',Helvetica] font-normal text-[32px] tracking-[0] leading-[30px] whitespace-nowrap">
                <span className="text-white">AJO</span>
                <span className="text-[#87bbb7]">O</span>
              </div>
            </div>

            <p className="max-w-[360px] font-body-xl font-[number:var(--body-xl-font-weight)] text-surface-50 text-[length:var(--body-xl-font-size)] tracking-[var(--body-xl-letter-spacing)] leading-[var(--body-xl-line-height)] [font-style:var(--body-xl-font-style)] mb-8">
              The crosschain protocol that turns traditional Ajo into an income
              generating asset.
            </p>

            <div className="flex items-center gap-12">
              {socialIcons.map((icon) => (
                <img
                  key={icon.name}
                  className="w-6 h-6"
                  alt={icon.name}
                  src={icon.src}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="[font-family:'Manrope',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[34px] whitespace-nowrap mb-6">
              Protocol
            </h3>
            <ul className="space-y-3">
              {footerLinks.protocol.map((link) => (
                <li
                  key={link}
                  className="font-body-xl font-[number:var(--body-xl-font-weight)] text-white text-[length:var(--body-xl-font-size)] tracking-[var(--body-xl-letter-spacing)] leading-[var(--body-xl-line-height)] [font-style:var(--body-xl-font-style)]"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="[font-family:'Manrope',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[34px] whitespace-nowrap mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li
                  key={link}
                  className="font-body-xl font-[number:var(--body-xl-font-weight)] text-white text-[length:var(--body-xl-font-size)] tracking-[var(--body-xl-letter-spacing)] leading-[var(--body-xl-line-height)] [font-style:var(--body-xl-font-style)]"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="[font-family:'Manrope',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[34px] whitespace-nowrap mb-6">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li
                  key={link}
                  className="font-body-xl font-[number:var(--body-xl-font-weight)] text-white text-[length:var(--body-xl-font-size)] tracking-[var(--body-xl-letter-spacing)] leading-[var(--body-xl-line-height)] [font-style:var(--body-xl-font-style)]"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />
      </div>
    </footer>
  );
};
