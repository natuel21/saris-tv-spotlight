import { BarChart3, Megaphone, Store, Users } from "lucide-react";
import { Reveal } from "./Section";
import { PromoMarquee } from "./PromoMarquee";

const pillars = [
  { Icon: Megaphone, title: "Promotional Videos", copy: "Full features and short-form promotions produced for the Saris TV audience." },
  { Icon: Store, title: "Business Features", copy: "Introduce your shop, hotel, clinic, or service to viewers across Ethiopia." },
  { Icon: BarChart3, title: "Product Reviews", copy: "Honest, informative coverage that helps customers make decisions." },
  { Icon: Users, title: "Event Coverage", copy: "Launches, expos, and openings captured and shared with our community." },
];

export function Promote({
  onRequest,
}: {
  onRequest: () => void;
}) {
  return (
    <section id="promote" className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
      <div className="drift-slow pointer-events-none absolute -right-24 -top-24 size-[26rem] rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-[22rem] rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="micro-label mb-6 flex items-center gap-3 text-accent">
              <span className="h-px w-10 bg-accent" />
              Promote With Saris TV
            </p>
            <h2 className="text-[2.5rem] leading-[1] font-bold sm:text-6xl">
              Promote Your Business
              <br />
              With <span className="text-accent">Saris TV</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-5 text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              <p>
                Put your business, product, service, or event in front of an engaged audience
                through Saris TV.
              </p>
              <p>
                Saris TV works with businesses, entrepreneurs, organizations, and brands to create
                promotional content that informs audiences and helps businesses reach new
                customers.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={onRequest}
                  className="font-display inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Request a Promotion
                </button>
                <a
                  href="#promotions"
                  className="font-display inline-flex items-center justify-center rounded-full border border-primary-foreground/40 px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground hover:text-primary"
                >
                  View Promotions
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <PromoMarquee />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="h-full rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/70">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <p.Icon size={22} />
                </span>
                <h3 className="mt-6 text-lg font-bold">{p.title}</h3>
                <p className="mt-3 text-sm text-primary-foreground/75">{p.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PromoteCta({ onRequest }: { onRequest: () => void }) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-14 text-center md:px-16">
          <span className="absolute inset-x-0 top-0 h-1.5 bg-accent" />
          <h2 className="text-[1.9rem] leading-[1.05] font-bold text-primary md:text-5xl">
            WANT YOUR BUSINESS FEATURED?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground md:text-lg">
            Let Saris TV help you introduce your business, product, service, or event to a wider
            audience.
          </p>
          <button
            type="button"
            onClick={onRequest}
            className="font-display mt-9 inline-flex items-center justify-center rounded-full bg-primary px-9 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Request a Promotion
          </button>
        </div>
      </Reveal>
    </section>
  );
}
