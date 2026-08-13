import { Play, Eye, TrendingUp } from "lucide-react";
import type { SiteVideo } from "@/lib/youtube.functions";
import { formatCount, formatDuration, thumbnailFor, timeAgo } from "@/lib/format";

export function TrendingBadge({ badge }: { badge: string | null }) {
  if (!badge) return null;
  const label =
    badge === "TRENDING" ? "🔥 TRENDING" : badge === "RISING" ? "🚀 RISING" : badge;
  return (
    <span className="micro-label rounded-full bg-accent px-3 py-1 text-accent-foreground">
      {label}
    </span>
  );
}

export function PlayOverlay({ big = false }: { big?: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

export function VideoCard({ video, rank }: { video: SiteVideo; rank?: number }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50"
      style={{ boxShadow: "var(--shadow-lift)" }}
    >
      <div className="relative overflow-hidden">
        <img
          src={thumbnailFor(video.id, "md", video.thumbnail)}
          alt={video.title}
          loading="lazy"
          width={480}
          height={360}
          className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <PlayOverlay />
        {rank !== undefined ? (
          <span className="font-display absolute left-4 top-3 text-4xl font-bold text-background drop-shadow-md">
            {String(rank + 1).padStart(2, "0")}
          </span>
        ) : null}
        <span className="micro-label absolute left-4 bottom-3 rounded-full bg-background/90 px-3 py-1 backdrop-blur-md">
          {video.category}
        </span>
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
    <div className="h-[22rem] animate-pulse rounded-3xl border border-border bg-surface" />
  );
}