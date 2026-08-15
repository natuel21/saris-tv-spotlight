import { useState } from "react";
import { Play, Youtube } from "lucide-react";
import { Reveal } from "./Section";
import { CHANNEL_URL } from "@/lib/saris";
import { formatCount, timeAgo } from "@/lib/format";
import type { SiteContent } from "@/lib/youtube.functions";

export function AboutVideo({ content }: { content: SiteContent | undefined }) {
  const [playing, setPlaying] = useState(false);
  const videoId = content?.aboutVideoId ?? null;
  const video = content?.aboutVideo ?? null;
  const poster = video?.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : null);

  return (
    <section id="story" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <div className="border-t border-border pt-8">
          <p className="micro-label mb-3 text-primary">Saris TV</p>
          <h2 className="text-[2.25rem] leading-[1.05] font-bold sm:text-5xl">
            WATCH THE SARIS TV STORY
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Discover the vision, mission, and journey behind Saris TV.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <div
          className="overflow-hidden rounded-[2rem] border border-border bg-card"
          style={{ boxShadow: "var(--shadow-lift)" }}
        >
          <div className="relative aspect-video w-full bg-secondary">
            {videoId && playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title={video?.title ?? "The Saris TV story"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            ) : videoId ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the Saris TV story"
                className="group absolute inset-0 size-full"
              >
                {poster ? (
                  <img
                    src={poster}
                    alt={video?.title ?? "The Saris TV story"}
                    className="size-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                ) : null}
                <span className="absolute inset-0 bg-primary/25 transition-colors duration-300 group-hover:bg-primary/35" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex size-20 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-110">
                    <Play size={30} className="ml-1 fill-current" strokeWidth={0} />
                  </span>
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <Youtube size={32} className="text-primary" />
                <p className="max-w-md text-sm text-muted-foreground">
                  The official Saris TV story video has not been selected yet. Set{" "}
                  <span className="font-semibold text-primary">ABOUT_VIDEO_ID</span> in the site
                  configuration to feature it here.
                </p>
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-display rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Visit the Saris TV channel
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 p-6 md:p-8">
            <h3 className="text-xl leading-snug font-bold md:text-2xl">
              {video?.title ?? "The Saris TV Story"}
            </h3>
            <p className="line-clamp-3 text-sm text-muted-foreground md:text-base">
              {video?.description?.trim() ||
                "Our vision, our mission, and the journey of building an Ethiopian digital media platform that connects people with real opportunities."}
            </p>
            {video ? (
              <p className="micro-label text-muted-foreground">
                {formatCount(video.views)} views · {timeAgo(video.publishedAt)}
              </p>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
