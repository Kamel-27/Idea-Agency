import { Spark } from "@/components/brand/Spark";
import { SocialIcon, type SocialNetwork } from "@/components/icons/SocialIcon";

// The right side of the hero: a laptop drawn with CSS (no photo to load),
// a sand blob behind it and small floating cards around it.
// Amber is the accent, teal is for the numbers (brand kit).
// Decorative only, so it is hidden from screen readers.

const networks: SocialNetwork[] = ["instagram", "tiktok", "facebook", "linkedin"];

const floatingCard = "absolute rounded-[14px] bg-white shadow-card";

export function HeroVisual({ screenText }: { screenText: string[] }) {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[7/6] w-full max-w-[560px]">
      {/* Background blob and desk */}
      <div className="absolute inset-[20px_0_0_40px] rounded-[58%_42%_46%_54%/52%_48%_52%_48%] bg-sand" />
      <div className="absolute inset-x-0 bottom-8.5 h-5 rounded-[10px] bg-gradient-to-b from-white to-paper" />

      {/* Laptop: screen + base */}
      <div className="absolute right-[6%] bottom-11.5 left-[14%] lg:right-[12%] lg:bottom-13 lg:left-[20%]">
        <div className="origin-left rounded-t-2xl rounded-b-sm bg-ink p-3 shadow-[0_24px_50px_rgb(14_27_61/0.22)] [transform:perspective(1200px)_rotateY(-10deg)]">
          <div className="grid aspect-[16/10] place-items-center rounded-md bg-white p-5 text-center">
            <div>
              <p dir="ltr" className="font-display text-[clamp(18px,2vw,28px)] leading-[1.15] font-bold text-ink">
                {screenText.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <svg width="120" height="14" viewBox="0 0 120 14" className="mx-auto mt-2">
                <path d="M4 10 C40 2, 80 2, 116 6" className="stroke-brand" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative -mx-[7%] h-4 rounded-t-[2px] rounded-b-[14px] bg-gradient-to-b from-[#dcd5c7] to-[#b9b2a4]">
          <div className="absolute inset-x-[42%] top-0 h-1.5 rounded-b-lg bg-[#a8a194]" />
        </div>
      </div>

      {/* Floating cards */}
      <div className={`${floatingCard} top-2.5 left-[4%] px-3 py-2 lg:top-10 lg:px-4.5 lg:py-3.5`}>
        <svg viewBox="0 0 110 56" className="h-9 w-[70px] lg:h-14 lg:w-[110px]" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <g className="stroke-teal">
            <path d="M6 48 L30 28 L48 38 L72 16 L100 8" />
            <path d="M86 6 L100 8 L98 22" />
          </g>
        </svg>
      </div>

      <div className={`${floatingCard} bottom-0 left-0 flex gap-3.5 px-3.5 py-2.5 lg:bottom-22 lg:px-4.5 lg:py-3.5`}>
        {networks.map((network) => (
          <SocialIcon key={network} network={network} className="size-[22px] text-ink lg:size-7" />
        ))}
      </div>

      <div className={`${floatingCard} right-0 bottom-[24%] flex h-14 items-end gap-1.5 px-3.5 py-2.5 lg:bottom-22 lg:h-[74px] lg:px-4.5 lg:py-3.5`}>
        <i className="h-[30%] w-2.5 rounded-full bg-teal opacity-30" />
        <i className="h-[60%] w-2.5 rounded-full bg-teal opacity-60" />
        <i className="h-full w-2.5 rounded-full bg-teal" />
      </div>

      <Spark className="absolute top-0 right-0 size-[70px]" />
    </div>
  );
}
