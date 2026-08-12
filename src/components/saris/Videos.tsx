import { Play, Youtube, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Section";
import { CHANNEL_URL, thumb, videos, watchUrl } from "@/lib/saris";

const featured = videos[0]!;
const rest = videos.slice(1, 7);

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
          title="Latest from YouTube"
          subtitle="Fresh episodes straight from the Saris TV channel."
        />
      </Reveal>

      <Reveal className="mt-12">
        <a
          href={watchUrl(featured.id)}
          target="_blank"
          rel="noreferrer noopener"
          className="group relative block overflow-hidden rounded-3xl border border-border"
        >
          <img
            src={thumb(featured.id)}
            alt={featured.title}
            loading="lazy"
            width={1600}
            height={912}
            className="h-[280px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-[520px]"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <PlayOverlay big />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-on-hero md:p-10">
            <div className="max-w-2xl">
              <p className="micro-label mb-3 text-accent">Newest Episode · {featured.category}</p>
              <h3 className="text-2xl leading-tight font-bold md:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-2 text-sm text-on-hero/80">{featured.amharic}</p>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-on-hero/30 bg-on-hero/10 px-4 py-2 backdrop-blur-md">
              <Youtube size={18} className="text-accent" />
              <span className="micro-label text-on-hero/85">YouTube · Saris TV</span>
            </div>
          </div>
        </a>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {rest.map((v, i) => (
            <Reveal key={v.id} delay={i * 90}>
              <a
                href={watchUrl(v.id)}
                target="_blank"
                rel="noreferrer noopener"
                className="group block h-full overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40"
                style={{ boxShadow: "var(--shadow-lift)" }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={thumb(v.id)}
                    alt={v.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <PlayOverlay />
                  <span className="micro-label absolute bottom-3 right-3 rounded-md bg-background/90 px-2 py-1 backdrop-blur-md">
                    {v.category}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <h3 className="text-lg leading-snug font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.amharic}</p>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Youtube size={16} className="text-primary" />
                    <span className="micro-label">YouTube</span>
                    <span className="micro-label">{v.date}</span>
                  </div>
                </div>
              </a>
            </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="font-display inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
        >
          View all videos on YouTube
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}