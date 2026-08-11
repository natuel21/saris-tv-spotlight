import { Eye, Flame } from "lucide-react";
import musicImg from "@/assets/music.jpg";
import creatorImg from "@/assets/creator.jpg";
import tvImg from "@/assets/tv.jpg";
import trendImg from "@/assets/trend.jpg";
import cultureImg from "@/assets/culture.jpg";
import { Reveal, SectionHead } from "./Section";

const items = [
  { n: "01", title: "The Ethiopian Music Video Everyone Is Talking About", cat: "Music", views: "412K", image: musicImg },
  { n: "02", title: "The Creator Taking Over TikTok This Month", cat: "Creators", views: "308K", image: creatorImg },
  { n: "03", title: "This Movie Has Everyone Divided", cat: "Movies", views: "266K", image: tvImg },
  { n: "04", title: "Street Style Is the New Timeline Obsession", cat: "Trends", views: "191K", image: trendImg },
  { n: "05", title: "The Coffee Ceremony Format That Won August", cat: "Culture", views: "154K", image: cultureImg },
];

export function Trending() {
  return (
    <section id="trending" className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionHead
            kicker="Right Now"
            title="Trending Now"
            subtitle="The stories, sounds and people dominating Ethiopian timelines this week."
          />
        </Reveal>
      </div>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-10">
        {items.map((it) => (
          <article
            key={it.n}
            className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 sm:w-[380px]"
          >
            <span
              className="font-display pointer-events-none absolute -right-2 top-0 z-10 text-[7rem] leading-none font-bold text-foreground/8 select-none"
              aria-hidden
            >
              {it.n}
            </span>
            <div className="overflow-hidden">
              <img
                src={it.image}
                alt={it.title}
                loading="lazy"
                width={1200}
                height={800}
                className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
            <div className="relative z-20 flex flex-col gap-3 p-6">
              <div className="flex items-center gap-3">
                <span className="micro-label text-primary">{it.n}</span>
                <span className="micro-label text-muted-foreground">{it.cat}</span>
              </div>
              <h3 className="text-lg leading-snug font-semibold">{it.title}</h3>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1.5 text-xs">
                  <Eye size={14} /> {it.views}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-primary">
                  <Flame size={14} /> Hot
                </span>
              </div>
            </div>
          </article>
        ))}
        <div className="w-1 shrink-0" />
      </div>
    </section>
  );
}