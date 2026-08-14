import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SOCIAL, CHANNEL_URL } from "@/lib/saris";
import type { SiteVideo } from "@/lib/youtube.functions";

export function Hero({ latest }: { latest?: SiteVideo | null }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 600) * 0.15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="grain relative min-h-[88vh] overflow-hidden md:min-h-[86vh]">
      <img
        src={heroImg}
        alt="Saris TV crew filming on a neon-lit Addis Ababa street at night"
        width={1920}
        height={1088}
        className="absolute inset-0 size-full scale-110 object-cover"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.1)` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 md:min-h-[86vh] md:px-10 md:pb-24">
        <div className="max-w-4xl text-on-hero">
          <p className="micro-label animate-fade-in mb-6 flex items-center gap-3 text-accent">
            <span className="h-px w-10 bg-accent" />
            Saris TV
          </p>
          <h1 className="animate-fade-in text-[2.75rem] leading-[0.95] font-bold sm:text-6xl lg:text-[5.5rem]">
            We Watch. We Review.
            <br />
            <span className="text-accent">You Decide.</span>
          </h1>
          <p className="animate-fade-in mt-6 max-w-xl text-base leading-relaxed text-on-hero/85 sm:text-lg">
            Honest reviews, conversations, and reactions to the people, entertainment, trends, and
            stories shaping Ethiopian social media.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#reviews"
              className="font-display group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Explore Reviews
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href={latest?.url ?? CHANNEL_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="font-display inline-flex items-center justify-center gap-2 rounded-full border border-on-hero/40 bg-on-hero/10 px-7 py-4 text-sm font-semibold text-on-hero backdrop-blur-md transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
            >
              <Play size={14} className="fill-current" strokeWidth={0} />
              Watch Latest Video
            </a>
            <a
              href={SOCIAL.youtube}
              target="_blank"
              rel="noreferrer noopener"
              className="font-display inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03]"
            >
              Subscribe on YouTube
            </a>
          </div>

          <div className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-on-hero/30 bg-on-hero/10 px-4 py-2 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="micro-label text-on-hero/85">New episode every week</span>
          </div>
        </div>
      </div>
    </section>
  );
}