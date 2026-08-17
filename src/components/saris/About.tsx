import { Briefcase, Clapperboard, Globe2, Plane, Sparkles, Utensils } from "lucide-react";
import { Reveal } from "./Section";
import { useCountUp, useReveal } from "./useReveal";
import banner from "@/assets/saris-banner.png.asset.json";
import type { SiteContent } from "@/lib/youtube.functions";

const coverage = [
  { Icon: Briefcase, title: "Business & Entrepreneurship", copy: "Markets, prices, startups and the people building them." },
  { Icon: Globe2, title: "Economics & Opportunity", copy: "Practical knowledge for better decisions today." },
  { Icon: Clapperboard, title: "Entertainment", copy: "The stories, creators and moments people are talking about." },
  { Icon: Utensils, title: "Lifestyle & Culture", copy: "Food, community and everyday Ethiopian life." },
  { Icon: Plane, title: "Travel", copy: "From Addis Ababa to communities across the country." },
  { Icon: Sparkles, title: "Opportunities", copy: "Openings, ideas and ventures worth knowing about." },
];

function Stat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const n = useCountUp(value, active);
  return (
    <div className="border-t border-border pt-6">
      <p className="font-display text-4xl font-bold text-primary md:text-5xl">
        {n}
        {suffix}
      </p>
      <p className="micro-label mt-3 text-muted-foreground">{label}</p>
    </div>
  );
}

export function About({ content }: { content?: SiteContent | undefined }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const totalVideos = content?.totalVideos ?? 0;

  const stats = [
    { value: totalVideos, suffix: "+", label: "Videos Published" },
    { value: 1, suffix: "", label: "Official Channel" },
    { value: 8, suffix: "", label: "Content Pillars" },
    { value: 24, suffix: "/7", label: "Always Updating" },
  ];

  return (
    <section id="about" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
        <Reveal>
          <p className="micro-label mb-6 flex items-center gap-3 text-primary">
            <span className="h-px w-10 bg-accent" />
            About Us
          </p>
          <h2 className="text-[2.5rem] leading-[1] font-bold text-primary md:text-[3.5rem]">
            SARIS TV
            <span className="block text-foreground">ሳሪስ ቲቪ</span>
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p className="text-foreground md:text-xl">
              Saris TV is an Ethiopian digital media platform based in Addis Ababa, connecting
              audiences with business, entrepreneurship, economics, entertainment, lifestyle,
              travel, local culture, and opportunities.
            </p>
            <p>
              From Addis Ababa to communities across Ethiopia and audiences around the world, Saris
              TV tells stories, explores ideas, highlights opportunities, and creates content that
              informs, inspires, and entertains.
            </p>
            <p className="border-l-4 border-accent pl-5 text-foreground">
              Our goal is simple: to help people discover opportunities, make informed decisions,
              and build better lives today.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <span className="absolute -right-4 -top-4 hidden size-24 rounded-3xl border-4 border-accent md:block" />
            <div
              className="relative overflow-hidden rounded-[2rem] border border-border bg-card"
              style={{ boxShadow: "var(--shadow-lift)" }}
            >
              <img
                src={banner.url}
                alt="Saris Media — your daily source of opportunity"
                loading="lazy"
                width={1920}
                height={1080}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div ref={ref} className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} {...s} active={visible} />
        ))}
      </div>

      <div className="mt-20">
        <Reveal>
          <h3 className="text-[1.75rem] leading-tight font-bold text-primary md:text-4xl">
            What We Cover
          </h3>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coverage.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <article className="h-full rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <c.Icon size={20} />
                </span>
                <h4 className="mt-5 text-lg font-bold">{c.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{c.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
