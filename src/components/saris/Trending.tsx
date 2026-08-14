import { Eye, TrendingUp } from "lucide-react";
import { Reveal, SectionHead } from "./Section";
import { CardSkeleton, PlayOverlay, Thumb, TrendingBadge } from "./VideoBits";
import { LiveStatus } from "./LiveStatus";
import { ContentProblem } from "./EmptyState";
import { formatCount, timeAgo } from "@/lib/format";
import type { SiteContent } from "@/lib/youtube.functions";

export function Trending({
  content,
  isLoading,
  isFetching,
  onRefresh,
}: {
  content: SiteContent | undefined;
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
}) {
  const items = content?.trending ?? [];

  return (
    <section id="trending" className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHead
              kicker="Right Now"
              title="Trending Now"
              subtitle="Ranked by how fast Saris TV videos are gaining views right now."
            />
            <LiveStatus
              lastUpdated={content?.lastUpdated}
              isFetching={isFetching}
              onRefresh={onRefresh}
            />
          </div>
        </Reveal>
      </div>

      {isLoading ? (
        <div className="mx-auto mt-12 grid max-w-[1400px] gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3 md:px-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="mx-auto mt-12 max-w-[1400px] px-5 md:px-10">
          <ContentProblem lastUpdated={content?.lastUpdated} error={content?.lastError} />
        </div>
      ) : (
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-10">
          {items.map((v, i) => (
            <a
              key={v.id}
              href={v.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 sm:w-[380px]"
              style={{ boxShadow: "var(--shadow-lift)" }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Thumb
                  video={v}
                  className="transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/25" />
                <PlayOverlay />
                <span className="font-display absolute left-4 top-2 text-5xl font-bold text-background drop-shadow-lg">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="relative z-20 flex flex-col gap-3 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <TrendingBadge badge={v.badge} />
                  <span className="micro-label text-muted-foreground">{v.category}</span>
                </div>
                <h3 className="line-clamp-3 text-lg leading-snug font-semibold">{v.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Eye size={14} /> {formatCount(v.views)} views
                  </span>
                  {v.viewsPerHour >= 1 ? (
                    <span className="flex items-center gap-1.5 text-primary">
                      <TrendingUp size={14} /> {formatCount(Math.round(v.viewsPerHour))}/hr
                    </span>
                  ) : null}
                  <span>{timeAgo(v.publishedAt)}</span>
                </div>
              </div>
            </a>
          ))}
          <div className="w-1 shrink-0" />
        </div>
      )}
    </section>
  );
}