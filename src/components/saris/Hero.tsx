import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import banner from "@/assets/saris-banner.png.asset.json";
import { CHANNEL_URL } from "@/lib/saris";
import type { SiteVideo } from "@/lib/youtube.functions";

const floaters = [
  { label: "New Stories", className: "left-[-1.5rem] top-10", delay: "0s" },
  { label: "Reviews", className: "right-[-1rem] top-24", delay: "1.2s" },
  { label: "Business", className: "left-[-2rem] bottom-24", delay: "2.1s" },
  { label: "Opportunities", className: "right-[-1.5rem] bottom-10", delay: "0.6s" },
];

export function Hero({ latest }: { latest?: SiteVideo | null }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || small) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setOffset(Math.min(window.scrollY, 700) * 0.06);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="drift-slow pointer-events-none absolute -left-40 -top-24 size-[34rem] rounded-full bg-primary/10 blur-3xl" />
      <div
        className="drift-slow pointer-events-none absolute -right-32 top-40 size-[26rem] rounded-full bg-accent/15 blur-3xl"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
        <div>
          <p
            className="line-up micro-label flex items-center gap-3 text-primary"
            style={{ animationDelay: "60ms" }}
          >
            <span className="h-px w-10 bg-accent" />
            Saris TV | ሳሪስ ቲቪ
          </p>

          <h1 className="mt-6 font-bold text-primary">
            <span
              className="line-up block text-[2.6rem] leading-[0.95] sm:text-6xl lg:text-[4.75rem]"
              style={{ animationDelay: "160ms" }}
            >
              FIND
              <span className="text-foreground"> OPPORTUNITIES.</span>
            </span>
            <span
              className="line-up mt-2 block text-[2.6rem] leading-[0.95] sm:text-6xl lg:text-[4.75rem]"
              style={{ animationDelay: "300ms" }}
            >
              BUILD
              <span className="relative ml-3 inline-block text-foreground">
                WEALTH.
                <span className="absolute inset-x-0 -bottom-1 h-[7px] rounded-full bg-accent" />
              </span>
            </span>
          </h1>

          <p
            className="line-up mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "440ms" }}
          >
            Stories, businesses, ideas, entertainment, culture, and opportunities from Ethiopia and
            beyond.
          </p>

          <div
            className="line-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "560ms" }}
          >
            <a
              href={latest?.url ?? CHANNEL_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="font-display inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <Play size={14} className="fill-current" strokeWidth={0} />
              Watch Saris TV
            </a>
            <a
              href="#promote"
              className="font-display group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore Opportunities
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div
            className="line-up mt-10 inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-2"
            style={{ animationDelay: "680ms" }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="micro-label text-muted-foreground">
              Live from the official Saris TV channel
            </span>
          </div>
        </div>

        <div className="relative" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
          <span className="absolute -left-5 -top-5 hidden size-28 rounded-[2rem] border-4 border-accent md:block" />
          <span className="absolute -bottom-6 -right-6 hidden size-32 rounded-full bg-primary/10 md:block" />

          <div
            className="image-reveal relative overflow-hidden rounded-[2.25rem] border border-border bg-card"
            style={{ boxShadow: "var(--shadow-lift)" }}
          >
            <img
              src={banner.url}
              alt="Saris Media — your daily source of opportunity"
              width={1920}
              height={1080}
              className="h-auto w-full object-contain"
            />
            <span className="absolute inset-x-0 bottom-0 h-1.5 bg-accent" />
          </div>

          {floaters.map((f) => (
            <span
              key={f.label}
              style={{ animationDelay: f.delay }}
              className={`float-soft micro-label absolute hidden rounded-full border border-border bg-background px-4 py-2.5 text-primary shadow-lg lg:inline-flex ${f.className}`}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
