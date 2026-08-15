import { Reveal } from "./Section";

const paragraphs = [
  "Saris TV began in Addis Ababa with a vision to connect people with opportunities, ideas, businesses, and stories that can contribute to a better life today.",
  "Our mission is to travel beyond the city, reach communities across Ethiopia, and share their stories with audiences around the world.",
  "Through business, marketing, entrepreneurship, economics, entertainment, lifestyle, travel, and local culture, Saris TV creates content designed to inform, inspire, educate, and entertain.",
  "We believe that a better life should not be something people wait for in the future. Opportunities, knowledge, and meaningful change should be accessible today.",
];

export function Founder() {
  return (
    <section id="founder" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="micro-label mb-8 flex items-center gap-3 text-primary">
            <span className="h-px w-10 bg-accent" />
            A Message From the Founder
          </p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <blockquote className="border-l-4 border-accent pl-6 md:pl-8">
              <p className="text-[1.75rem] leading-[1.12] font-bold text-primary sm:text-4xl lg:text-[3rem]">
                We want our people to live better lives now — not someday in the future.
              </p>
              <footer className="mt-8">
                <p className="font-display text-lg font-semibold">We have to deliver now.</p>
                <p className="micro-label mt-3 text-muted-foreground">Founder, Saris TV</p>
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <p className="micro-label text-primary">Our commitment</p>
                <p className="mt-3 text-foreground">
                  Opportunities, knowledge, and meaningful change delivered to Ethiopian
                  communities <span className="font-semibold text-primary">today</span> — not
                  someday.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
