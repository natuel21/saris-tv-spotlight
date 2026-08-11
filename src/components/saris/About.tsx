import { Reveal } from "./Section";
import { useCountUp, useReveal } from "./useReveal";

const stats = [
  { value: 100, suffix: "+", label: "Reviews" },
  { value: 50, suffix: "K+", label: "Community" },
  { value: 4, suffix: "", label: "Platforms" },
  { value: 1, suffix: "", label: "Saris TV" },
];

function Stat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const n = useCountUp(value, active);
  return (
    <div className="border-t border-border pt-6">
      <p className="font-display text-5xl font-bold text-primary md:text-6xl">
        {n}
        {suffix}
      </p>
      <p className="micro-label mt-3 text-muted-foreground">{label}</p>
    </div>
  );
}

export function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <p className="micro-label mb-8 flex items-center gap-3 text-primary">
          <span className="h-px w-10 bg-primary" />
          About Saris TV
        </p>
        <h2 className="max-w-4xl text-[2.5rem] leading-[0.98] font-bold md:text-[4.25rem]">
          More than a<br />
          review channel.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Saris TV is a platform for honest opinions, entertaining conversations, and thoughtful
          reviews of the culture and entertainment shaping today's audience.
        </p>
      </Reveal>

      <div ref={ref} className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} {...s} active={visible} />
        ))}
      </div>
    </section>
  );
}