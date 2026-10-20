import { Spark } from "@/components/brand/Spark";
import { SocialIcon, type SocialNetwork } from "@/components/icons/SocialIcon";

// The right side of the hero: a laptop drawn with CSS (no photo to load),
// a pink blob behind it and small floating cards around it.
// Decorative only, so it is hidden from screen readers.

const networks: SocialNetwork[] = ["instagram", "tiktok", "facebook", "linkedin"];

const floatingCard = "absolute rounded-[14px] bg-white shadow-card";

export function HeroVisual({ screenText }: { screenText: string[] }) {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[7/6] w-full max-w-[560px]">
      {/* Background blob and desk */}
      <div className="absolute inset-[20px_0_0_40px] rounded-[58%_42%_46%_54%/52%_48%_52%_48%] bg-brand-soft" />
      <div className="absolute inset-x-0 bottom-8.5 h-5 rounded-[10px] bg-gradient-to-b from-[#fafafb] to-[#f1f1f4]" />

      {/* Laptop: screen + base */}
      <div className="absolute right-[6%] bottom-11.5 left-[14%] lg:right-[12%] lg:bottom-13 lg:left-[20%]">
        <div className="origin-left rounded-t-2xl rounded-b-sm bg-[#1d1d1f] p-3 shadow-[0_24px_50px_rgb(23_23_23/0.18)] [transform:perspective(1200px)_rotateY(-10deg)]">
          <div className="grid aspect-[16/10] place-items-center rounded-md bg-white p-5 text-center">
            <div>
              <p dir="ltr" className="-rotate-6 font-script text-[clamp(22px,2.4vw,34px)] leading-[1.1] text-brand">
                {screenText.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <svg width="120" height="14" viewBox="0 0 120 14" className="mx-auto mt-2">
                <path d="M4 10 C40 2, 80 2, 116 6" className="stroke-brand" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative -mx-[7%] h-4 rounded-t-[2px] rounded-b-[14px] bg-gradient-to-b from-[#e9e9ed] to-[#c8c8cf]">
          <div className="absolute inset-x-[42%] top-0 h-1.5 rounded-b-lg bg-[#b9b9c1]" />
        </div>
      </div>

      {/* Floating cards */}
      <div className={`${floatingCard} top-2.5 left-[4%] px-3 py-2 lg:top-10 lg:px-4.5 lg:py-3.5`}>
        <svg viewBox="0 0 110 56" className="h-9 w-[70px] lg:h-14 lg:w-[110px]" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <g className="stroke-brand">
            <path d="M6 48 L30 28 L48 38 L72 16 L100 8" />
            <path d="M86 6 L100 8 L98 22" />
          </g>
        </svg>
      </div>

      <div className={`${floatingCard} bottom-0 left-0 flex gap-3.5 px-3.5 py-2.5 lg:bottom-22 lg:px-4.5 lg:py-3.5`}>
        {networks.map((network) => (
          <SocialIcon key={network} network={network} className="size-[22px] text-brand lg:size-7" />
        ))}
      </div>

      <div className={`${floatingCard} right-0 bottom-[24%] flex h-14 items-end gap-1.5 px-3.5 py-2.5 lg:bottom-22 lg:h-[74px] lg:px-4.5 lg:py-3.5`}>
        <i className="h-[30%] w-2.5 rounded-full bg-brand opacity-25" />
        <i className="h-[60%] w-2.5 rounded-full bg-brand" />
        <i className="h-full w-2.5 rounded-full bg-brand" />
      </div>

      <Spark className="absolute top-0 right-0 size-[70px]" />
    </div>
  );
}
