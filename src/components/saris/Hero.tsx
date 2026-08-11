import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
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
        <div className="max-w-4xl">
          <p className="micro-label animate-fade-in mb-6 flex items-center gap-3 text-primary">
            <span className="h-px w-10 bg-primary" />
            Saris TV
          </p>
          <h1 className="animate-fade-in text-[2.75rem] leading-[0.95] font-bold sm:text-6xl lg:text-[5.5rem]">
            We Watch. We Review.
            <br />
            <span className="text-primary">You Decide.</span>
          </h1>
          <p className="animate-fade-in mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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
              href="#videos"
              className="font-display inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/30 px-7 py-4 text-sm font-semibold backdrop-blur-md transition-colors duration-200 hover:bg-secondary"
            >
              <Play size={14} className="fill-current" strokeWidth={0} />
              Watch Latest Video
            </a>
          </div>

          <div className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-border bg-background/40 px-4 py-2 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="micro-label text-muted-foreground">New episode every week</span>
          </div>
        </div>
      </div>
    </section>
  );
}