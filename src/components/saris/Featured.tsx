import { Eye, Play, ThumbsUp, MessageCircle } from "lucide-react";
import { Reveal } from "./Section";
import { CardSkeleton, PlayOverlay, Thumb, TrendingBadge } from "./VideoBits";
import { formatCount, formatDuration, timeAgo } from "@/lib/format";
import type { SiteVideo } from "@/lib/youtube.functions";

export function Featured({
  video,
  isLoading,
}: {
  video: SiteVideo | null | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <CardSkeleton />
      </section>
    );
  }
  if (!video) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <p className="micro-label mb-8 flex items-center gap-3 text-primary">
          <span className="h-px w-10 bg-primary" />
          Featured Right Now
        </p>

        <a
          href={video.url}
          target="_blank"
          rel="noreferrer noopener"
          className="group grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[1.15fr_1fr]"
          style={{ boxShadow: "var(--shadow-lift)" }}
        >
          <div className="relative aspect-video overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
            <Thumb
              video={video}
              eager
              className="transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <PlayOverlay big />
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <TrendingBadge badge={video.badge} />
            </div>
            {video.durationSeconds ? (
              <span className="micro-label absolute bottom-4 right-4 rounded-md bg-foreground/85 px-2 py-1 text-background">
                {formatDuration(video.durationSeconds)}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col justify-center gap-6 p-7 md:p-12">
            <div className="flex flex-wrap items-center gap-4">
              <span className="micro-label rounded-full bg-primary px-3 py-1 text-primary-foreground">
                {video.category}
              </span>
              <span className="micro-label text-muted-foreground">Saris TV Episode</span>
              <span className="micro-label text-muted-foreground">
                {timeAgo(video.publishedAt)}
              </span>
            </div>

            <h3 className="text-3xl leading-[1.08] font-bold md:text-[2.75rem]">
              {video.title}
            </h3>

            {video.description ? (
              <p className="line-clamp-4 text-muted-foreground md:text-lg">
                {video.description}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Eye size={16} /> {formatCount(video.views)} views
              </span>
              {video.likes !== null ? (
                <span className="flex items-center gap-2">
                  <ThumbsUp size={16} /> {formatCount(video.likes)}
                </span>
              ) : null}
              {video.comments !== null ? (
                <span className="flex items-center gap-2">
                  <MessageCircle size={16} /> {formatCount(video.comments)}
                </span>
              ) : null}
            </div>

            <div className="h-px w-full bg-border" />

            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="font-display text-sm font-semibold">Reviewed by the Saris TV team</p>
                <p className="micro-label mt-1 text-muted-foreground">Straight from the channel</p>
              </div>
              <span className="font-display inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 group-hover:scale-[1.04]">
                <Play size={14} className="fill-current" strokeWidth={0} />
                Watch on YouTube
              </span>
            </div>
          </div>

          <div className="h-0.5 w-0 bg-primary transition-[width] duration-500 ease-out group-hover:w-full lg:col-span-2" />
        </a>
      </Reveal>
    </section>
  );
}