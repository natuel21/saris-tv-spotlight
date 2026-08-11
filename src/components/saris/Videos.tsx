import { Play, Youtube, Instagram, Music2 } from "lucide-react";
import studioImg from "@/assets/studio.jpg";
import musicImg from "@/assets/music.jpg";
import creatorImg from "@/assets/creator.jpg";
import trendImg from "@/assets/trend.jpg";
import { Reveal, SectionHead } from "./Section";

const platformIcon = { YouTube: Youtube, TikTok: Music2, Instagram: Instagram } as const;

const videos = [
  { title: "We Reviewed the Most Talked-About Album of the Year", platform: "YouTube", duration: "12:42", date: "Aug 8, 2026", image: musicImg },
  { title: "Reacting to the Creator Everyone Is Copying", platform: "TikTok", duration: "01:58", date: "Aug 6, 2026", image: creatorImg },
  { title: "Street Interviews: What Are You Actually Watching?", platform: "Instagram", duration: "04:20", date: "Aug 2, 2026", image: trendImg },
] as const;

function PlayOverlay({ big = false }: { big?: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <span
        className={`inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110 ${
          big ? "size-20" : "size-14"
        }`}
      >
        <Play size={big ? 28 : 20} className="ml-0.5 fill-current" strokeWidth={0} />
      </span>
    </div>
  );
}

export function Videos() {
  return (
    <section id="videos" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <SectionHead
          kicker="On Screen"
          title="Watch Saris TV"
          subtitle="Reviews are better when you see the reaction."
        />
      </Reveal>

      <Reveal className="mt-12">
        <article className="group relative overflow-hidden rounded-3xl border border-border">
          <img
            src={studioImg}
            alt="Saris TV hosts recording a review episode in a neon-lit studio"
            loading="lazy"
            width={1600}
            height={912}
            className="h-[280px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-[520px]"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <PlayOverlay big />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-10">
            <div className="max-w-2xl">
              <p className="micro-label mb-3 text-primary">Featured Episode · Watch 12:42</p>
              <h3 className="text-2xl leading-tight font-bold md:text-4xl">
                The Review Show: Everything Ethiopian Social Media Argued About in August
              </h3>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-border bg-background/50 px-4 py-2 backdrop-blur-md">
              <Youtube size={18} className="text-primary" />
              <span className="micro-label text-muted-foreground">YouTube · Aug 10, 2026</span>
            </div>
          </div>
        </article>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {videos.map((v, i) => {
          const Icon = platformIcon[v.platform];
          return (
            <Reveal key={v.title} delay={i * 90}>
              <article className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40">
                <div className="relative overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <PlayOverlay />
                  <span className="micro-label absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-1 backdrop-blur-md">
                    {v.duration}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <h3 className="text-lg leading-snug font-semibold">{v.title}</h3>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Icon size={16} className="text-primary" />
                    <span className="micro-label">{v.platform}</span>
                    <span className="micro-label">{v.date}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}