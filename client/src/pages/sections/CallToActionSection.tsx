import { Button } from "@/components/ui/button";

export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-dark-50 py-[74px] overflow-hidden">
      <div className="container mx-auto px-20 relative">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[114px] max-w-[668px]">
            <h2 className="font-heading-xl-bold font-[number:var(--heading-xl-bold-font-weight)] text-[length:var(--heading-xl-bold-font-size)] tracking-[var(--heading-xl-bold-letter-spacing)] leading-[var(--heading-xl-bold-line-height)] [font-style:var(--heading-xl-bold-font-style)]">
              <span className="text-white">Get Your </span>
              <span className="text-teal-700">Savings</span>
              <span className="text-white"> Journey Started</span>
            </h2>

            <Button className="h-auto px-8 py-2 bg-primary-200 hover:bg-primary-200/90 rounded-3xl w-fit">
              <span className="[font-family:'Manrope',Helvetica] font-semibold text-white text-base tracking-[0] leading-[30px]">
                Launch App
              </span>
            </Button>
          </div>

          <div className="relative flex-shrink-0">
            <img
              className="relative w-[394px] h-[379px] object-cover"
              alt="Savings illustration"
              src="/figmaAssets/untitled-design--14--1.png"
            />
            <img
              className="absolute top-[24px] -left-[142px] w-[467px] h-[379px] object-cover"
              alt="Financial graphics"
              src="/figmaAssets/untitled-design--13--1.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
