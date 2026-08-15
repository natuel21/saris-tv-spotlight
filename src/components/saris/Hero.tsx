import { ArrowRight, Play } from "lucide-react";
import banner from "@/assets/saris-banner.png.asset.json";
import logo from "@/assets/saris-logo.png.asset.json";
import { CHANNEL_URL } from "@/lib/saris";
import type { SiteVideo } from "@/lib/youtube.functions";

export function Hero({ latest }: { latest?: SiteVideo | null }) {
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      <div
        className="pointer-events-none absolute -left-40 top-10 size-[28rem] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "var(--gradient-accent)" }}
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="animate-fade-in">
          <img src={logo.url} alt="Saris TV logo" width={320} height={160} className="h-12 w-auto md:h-16" />

          <p className="micro-label mt-8 flex items-center gap-3 text-primary">
            <span className="h-px w-10 bg-accent" />
            Ethiopian Digital Media · Addis Ababa
          </p>

          <h1 className="mt-5 text-[2.75rem] leading-[0.98] font-bold text-primary sm:text-6xl lg:text-[4.5rem]">
            SARIS TV
            <span className="mt-3 block text-[1.75rem] leading-[1.08] text-foreground sm:text-4xl lg:text-[3rem]">
              Find Opportunities.
              <br />
              <span className="relative inline-block">
                Build Wealth.
                <span className="absolute inset-x-0 -bottom-1 h-[6px] rounded-full bg-accent" />
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Saris TV connects people with opportunities, ideas, businesses, stories, entertainment,
            and experiences that can help create a better life today.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={latest?.url ?? CHANNEL_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="font-display inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <Play size={14} className="fill-current" strokeWidth={0} />
              Watch Saris TV
            </a>
            <a
              href="#promote"
              className="font-display group inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03]"
            >
              Explore Opportunities
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="relative">
          <span className="absolute -left-4 -top-4 hidden size-24 rounded-3xl border-4 border-accent md:block" />
          <span className="absolute -bottom-5 -right-4 hidden size-28 rounded-full bg-primary/10 md:block" />
          <div
            className="relative overflow-hidden rounded-[2rem] border border-border bg-card"
            style={{ boxShadow: "var(--shadow-lift)" }}
          >
            <img
              src={banner.url}
              alt="Saris Media — your daily source of opportunity"
              width={1920}
              height={1080}
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="micro-label rounded-full bg-primary px-4 py-2 text-primary-foreground">
              Your Daily Source of Opportunity
            </span>
            <span className="micro-label rounded-full border border-border px-4 py-2 text-muted-foreground">
              Business · Culture · Lifestyle · Travel
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
