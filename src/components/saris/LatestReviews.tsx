import { useMemo, useState } from "react";
import { Reveal, SectionHead } from "./Section";
import { CardSkeleton, VideoCard } from "./VideoBits";
import { LiveStatus } from "./LiveStatus";
import { ContentProblem } from "./EmptyState";
import { UI_CATEGORIES, filterByCategory, type UiCategory } from "@/lib/categories";
import type { SiteContent } from "@/lib/youtube.functions";

export function LatestReviews({
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
  const [active, setActive] = useState<UiCategory>("All");
  const pool = content?.all ?? [];
  const shown = useMemo(() => filterByCategory(pool, active).slice(0, 12), [pool, active]);

  return (
    <section id="reviews" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHead kicker="Fresh Opinions" title="Latest from Saris TV" />
          <LiveStatus
            lastUpdated={content?.lastUpdated}
            isFetching={isFetching}
            onRefresh={onRefresh}
          />
        </div>
      </Reveal>

      <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
        {UI_CATEGORIES.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`font-display shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              active === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : pool.length === 0 ? (
        <div className="mt-10">
          <ContentProblem lastUpdated={content?.lastUpdated} error={content?.lastError} />
        </div>
      ) : shown.length === 0 ? (
        <p className="mt-12 rounded-3xl border border-border bg-surface p-10 text-center text-muted-foreground">
          No Saris TV videos in this category yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      )}

      {content?.lastError && pool.length > 0 ? (
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Unable to refresh right now — showing the latest successfully synchronized Saris TV
          content.
        </p>
      ) : null}
    </section>
  );
}