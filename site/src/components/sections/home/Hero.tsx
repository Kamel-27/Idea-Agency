import type { HomeContent } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroVisual } from "./HeroVisual";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {

  return (
    <Container className="grid items-center gap-10 pt-12 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-24">
      <div>
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="mt-4.5 mb-5.5 text-[clamp(40px,6vw,76px)] leading-[1.05] font-semibold tracking-[-1.5px] rtl:tracking-normal">
          {hero.titleLine1}
          <span className="block text-brand">{hero.titleLine2}</span>
        </h1>
        <p className="mb-8.5 max-w-[520px] text-[19px] text-muted">{hero.description}</p>
        <div className="flex flex-wrap gap-3.5">
          <Button href={hero.primaryAction.href} showArrow>
            {hero.primaryAction.label}
          </Button>
          <Button href={hero.secondaryAction.href} variant="outline">
            {hero.secondaryAction.label}
          </Button>
        </div>
      </div>

      <HeroVisual screenText={hero.screenText} />
    </Container>
  );
}
