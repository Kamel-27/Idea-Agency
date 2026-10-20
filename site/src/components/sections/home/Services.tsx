import { homeContent } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Services() {
  const { services } = homeContent;

  return (
    <section id="services" className="bg-brand-tint py-16 lg:py-24">
      <Container>
        <div className="mb-12 max-w-[640px]">
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-[clamp(30px,4vw,44px)] leading-[1.15] font-semibold tracking-[-0.8px]">
            {services.title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.items.map((service, index) => (
            <article
              key={service.title}
              className="rounded-card border border-line bg-white p-8 transition hover:-translate-y-1 hover:border-brand"
            >
              <div className="mb-5 grid size-12 place-items-center rounded-[14px] bg-brand-soft font-display text-xl font-bold text-brand">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2.5 text-[22px] font-semibold">{service.title}</h3>
              <p className="text-muted">{service.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
