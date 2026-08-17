import { ArrowRight, Eye, Clock } from "lucide-react";
import { Thumb } from "./VideoBits";
import { formatCount, formatDuration, timeAgo } from "@/lib/format";
import type { SiteVideo } from "@/lib/youtube.functions";

export function PromotionBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`micro-label rounded-full bg-accent px-3 py-1 text-accent-foreground ${className}`}
    >
      Promotion
    </span>
  );
}

export function PromotionCard({ video }: { video: SiteVideo }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-accent"
      style={{ boxShadow: "var(--shadow-lift)" }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Thumb
          video={video}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/20" />
        <PromotionBadge className="absolute left-4 top-4" />
        {video.durationSeconds ? (
          <span className="micro-label absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-foreground/85 px-2 py-1 text-background">
            <Clock size={11} />
            {formatDuration(video.durationSeconds)}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="line-clamp-2 text-lg leading-snug font-bold text-primary">{video.title}</h3>
        {video.brand ? (
          <p className="text-sm font-semibold text-foreground">{video.brand}</p>
        ) : null}
        <p className="micro-label text-muted-foreground">Featured by Saris TV</p>
        <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs text-muted-foreground">
          <span className="font-semibold text-accent-foreground/80">
            PROMOTION · Published {timeAgo(video.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye size={13} /> {formatCount(video.views)} views
          </span>
        </p>
        <span className="font-display inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
          Watch Promotion
          <ArrowRight size={15} />
        </span>
      </div>
    </a>
  );
}
