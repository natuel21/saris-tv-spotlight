import { useEffect, useRef } from "react";
import { Reveal } from "./Section";
import storyVideo from "@/assets/saris-story.mp4.asset.json";

export function AboutVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tryPlay = () => void el.play().catch(() => {});
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) tryPlay();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    tryPlay();
    return () => io.disconnect();
  }, []);

  return (
    <section id="story" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <div className="border-t border-border pt-8">
          <p className="micro-label mb-3 text-primary">Saris TV</p>
          <h2 className="text-[2.25rem] leading-[1.05] font-bold sm:text-5xl">
            WATCH THE SARIS TV STORY
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Discover the vision, stories, and journey behind Saris TV.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <div
          className="relative aspect-video w-full overflow-hidden rounded-[2rem] border border-border bg-secondary"
          style={{ boxShadow: "var(--shadow-lift)" }}
        >
          <video
            ref={ref}
            src={storyVideo.url}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            aria-label="The Saris TV story"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
