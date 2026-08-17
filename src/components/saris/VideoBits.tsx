import { useMemo, useState } from "react";
import { Play, Eye, TrendingUp } from "lucide-react";
import type { SiteVideo } from "@/lib/youtube.functions";
import { formatCount, formatDuration, timeAgo } from "@/lib/format";

/** Real YouTube thumbnail with the documented resolution fallback chain. */
export function Thumb({
  video,
  className = "",
  eager = false,
}: {
  video: SiteVideo;
  className?: string;
  eager?: boolean;
}) {
  const sources = useMemo(() => {
    const cdn = (name: string) => `https://i.ytimg.com/vi/${video.id}/${name}.jpg`;
    return [
      video.thumbnail,
      cdn("maxresdefault"),
      cdn("sddefault"),
      cdn("hqdefault"),
      cdn("mqdefault"),
      cdn("default"),
    ].filter(Boolean) as string[];
  }, [video.id, video.thumbnail]);
  const [index, setIndex] = useState(0);

  return (
    <img
      src={sources[Math.min(index, sources.length - 1)]}
      alt={video.title}
      width={1280}
      height={720}
      loading={eager ? "eager" : "lazy"}
      onError={() => setIndex((i) => (i < sources.length - 1 ? i + 1 : i))}
      className={`size-full object-cover ${className}`}
    />
  );
}

export function TrendingBadge({ badge }: { badge: string | null }) {
  if (!badge) return null;
  return (
    <span className="micro-label rounded-full bg-accent px-3 py-1 text-accent-foreground">
      {badge}
    </span>
  );
}

export function PlayOverlay({ big = false }: { big?: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <span
        className={`inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-110 ${
          big ? "size-20" : "size-14"
        }`}
      >
        <Play size={big ? 28 : 20} className="ml-0.5 fill-current" strokeWidth={0} />
      </span>
    </div>
  );
}

export function VideoCard({ video, rank }: { video: SiteVideo; rank?: number }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50"
      style={{ boxShadow: "var(--shadow-lift)" }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Thumb video={video} className="transition-transform duration-500 ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/25" />
        <PlayOverlay />
        {rank !== undefined ? (
          <span className="font-display absolute left-4 top-3 text-4xl font-bold text-background drop-shadow-md">
            {String(rank + 1).padStart(2, "0")}
          </span>
        ) : null}
        <span className="micro-label absolute left-4 bottom-3 rounded-full bg-background/90 px-3 py-1 backdrop-blur-md">
          {video.category}
        </span>
        {video.isPromotion ? (
          <span className="micro-label absolute right-4 top-3 rounded-full bg-accent px-3 py-1 text-accent-foreground">
            Promotion
          </span>
        ) : null}
        {video.durationSeconds ? (
          <span className="micro-label absolute bottom-3 right-3 rounded-md bg-foreground/85 px-2 py-1 text-background">
            {formatDuration(video.durationSeconds)}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <TrendingBadge badge={video.badge} />
          {video.liveStatus === "live" ? (
            <span className="micro-label rounded-full bg-destructive px-3 py-1 text-destructive-foreground">
              ● LIVE
            </span>
          ) : null}
        </div>
        <h3 className="line-clamp-3 text-lg leading-snug font-semibold">{video.title}</h3>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Eye size={14} /> {formatCount(video.views)} views
          </span>
          {video.recentGain > 0 ? (
            <span className="flex items-center gap-1.5 text-primary">
              <TrendingUp size={14} /> +{formatCount(video.recentGain)} recent
            </span>
          ) : null}
          <span>{timeAgo(video.publishedAt)}</span>
        </div>
      </div>
    </a>
  );
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="aspect-video w-full animate-pulse bg-surface" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-24 animate-pulse rounded-full bg-surface" />
        <div className="h-4 w-full animate-pulse rounded-full bg-surface" />
        <div className="h-4 w-3/5 animate-pulse rounded-full bg-surface" />
        <div className="h-3 w-2/5 animate-pulse rounded-full bg-surface" />
      </div>
    </div>
  );
}