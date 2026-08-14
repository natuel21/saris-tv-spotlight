import { Eye, Youtube, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Section";
import { CardSkeleton, PlayOverlay, Thumb, VideoCard } from "./VideoBits";
import { CHANNEL_URL } from "@/lib/saris";
import { formatCount, timeAgo } from "@/lib/format";
import type { SiteContent } from "@/lib/youtube.functions";

export function Videos({
  content,
  isLoading,
}: {
  content: SiteContent | undefined;
  isLoading: boolean;
}) {
  const newest = content?.latest?.[0] ?? content?.all?.[0] ?? null;
  const rest = (content?.latest ?? []).slice(1, 7);
  const shorts = content?.shorts ?? [];

  return (
    <section id="videos" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <SectionHead
          kicker="On Screen"
          title="Latest from YouTube"
          subtitle="Fresh episodes straight from the Saris TV channel."
        />
      </Reveal>

      {isLoading ? (
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {newest ? (
            <Reveal className="mt-12">
              <a
                href={newest.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative block aspect-video overflow-hidden rounded-3xl border border-border"
              >
                <Thumb
                  video={newest}
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
                <PlayOverlay big />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-on-hero md:p-10">
                  <div className="max-w-2xl">
                    <p className="micro-label mb-3 text-accent">
                      Newest Episode · {newest.category}
                    </p>
                    <h3 className="text-2xl leading-tight font-bold md:text-4xl">{newest.title}</h3>
                    <p className="mt-2 text-sm text-on-hero/80">
                      {formatCount(newest.views)} views · {timeAgo(newest.publishedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-on-hero/30 bg-on-hero/10 px-4 py-2 backdrop-blur-md">
                    <Youtube size={18} className="text-accent" />
                    <span className="micro-label text-on-hero/85">YouTube · Saris TV</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {rest.map((v, i) => (
                <Reveal key={v.id} delay={i * 90}>
                  <VideoCard video={v} />
                </Reveal>
              ))}
            </div>
          ) : null}

          {shorts.length > 0 ? (
            <div className="mt-16">
              <Reveal>
                <SectionHead
                  kicker="Quick Hits"
                  title="Saris Shorts"
                  subtitle="Sixty seconds or less, straight from the channel."
                />
              </Reveal>
              <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0">
                {shorts.map((v) => (
                  <a
                    key={v.id}
                    href={`https://www.youtube.com/shorts/${v.id}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group w-[62vw] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 sm:w-[240px]"
                    style={{ boxShadow: "var(--shadow-lift)" }}
                  >
                    <div className="relative aspect-[9/16] overflow-hidden">
                      <Thumb
                        video={v}
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <PlayOverlay />
                      <span className="micro-label absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-accent-foreground">
                        SHORT
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                      <h4 className="line-clamp-2 text-sm leading-snug font-semibold">{v.title}</h4>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Eye size={13} /> {formatCount(v.views)}
                      </span>
                    </div>
                  </a>
                ))}
                <div className="w-1 shrink-0" />
              </div>
            </div>
          ) : null}
        </>
      )}

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