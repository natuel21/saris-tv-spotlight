import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { sarisContentQuery, useSarisContent } from "@/hooks/useSarisContent";
import type { SiteContent, SiteVideo } from "@/lib/youtube.functions";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/saris/Nav";
import { ScrollProgress } from "@/components/saris/ScrollProgress";
import { Hero } from "@/components/saris/Hero";
import { Featured } from "@/components/saris/Featured";
import { LatestReviews } from "@/components/saris/LatestReviews";
import { Trending } from "@/components/saris/Trending";
import { Videos } from "@/components/saris/Videos";
import { Promote, PromoteCta } from "@/components/saris/Promote";
import { Promotions } from "@/components/saris/Promotions";
import { PromotionForm } from "@/components/saris/PromotionForm";
import { About } from "@/components/saris/About";
import { Founder } from "@/components/saris/Founder";
import { AboutVideo } from "@/components/saris/AboutVideo";
import { Social } from "@/components/saris/Social";
import { Newsletter } from "@/components/saris/Newsletter";
import { Footer } from "@/components/saris/Footer";

const SITE_URL = "https://sarismultimedia.com";
const OG_IMAGE = `${SITE_URL}/__l5e/assets-v1/97be2517-b4f9-423c-856d-a715ba9436ba/saris-banner.png`;

function isoDuration(seconds: number) {
  if (!seconds) return undefined;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s ? `${s}S` : ""}`;
}

/** VideoObject schema built strictly from real YouTube API data. */
function videoSchema(v: SiteVideo) {
  const duration = isoDuration(v.durationSeconds);
  if (!v.id || !v.title || !v.thumbnail || !v.publishedAt || !duration) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: v.description || v.title,
    thumbnailUrl: v.thumbnail,
    uploadDate: v.publishedAt,
    duration,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    publisher: { "@type": "Organization", name: "Saris TV" },
    ...(v.views ? { interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: { "@type": "WatchAction" },
      userInteractionCount: v.views,
    } } : {}),
  };
}

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(sarisContentQuery),
  head: ({ loaderData }) => {
    const content = loaderData as SiteContent | undefined;
    const videos = [
      ...(content?.featured ? [content.featured] : []),
      ...(content?.latest ?? []).slice(0, 6),
    ];
    const seen = new Set<string>();
    const schemas = videos
      .filter((v) => (seen.has(v.id) ? false : (seen.add(v.id), true)))
      .map(videoSchema)
      .filter(Boolean);

    return {
      meta: [
        { title: "Saris TV Ethiopia | Movies, Music, TV, Creators, Trends & Culture" },
        {
          name: "description",
          content:
            "Saris TV Ethiopia brings you the latest reviews, opinions, trends, entertainment, business, culture and stories from Addis Ababa and beyond.",
        },
        {
          property: "og:title",
          content: "Saris TV Ethiopia | Movies, Music, TV, Creators, Trends & Culture",
        },
        {
          property: "og:description",
          content:
            "Saris TV Ethiopia brings you the latest reviews, opinions, trends, entertainment, business, culture and stories from Addis Ababa and beyond.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/` },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Saris TV Ethiopia | Movies, Music, TV, Creators, Trends & Culture",
        },
        {
          name: "twitter:description",
          content:
            "Latest reviews, opinions, trends, entertainment, business and culture from Addis Ababa and beyond.",
        },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/` }],
      scripts: schemas.map((schema) => ({
        type: "application/ld+json",
        children: JSON.stringify(schema),
      })),
    };
  },
  component: Index,
});


function Index() {
  const { data, isLoading, isFetching, refetch } = useSarisContent();
  const [formOpen, setFormOpen] = useState(false);
  const refresh = () => void refetch();
  const openForm = () => setFormOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero latest={data?.latest?.[0] ?? data?.featured ?? null} />
        <Featured video={data?.featured ?? null} isLoading={isLoading} />
        <LatestReviews
          content={data}
          isLoading={isLoading}
          isFetching={isFetching}
          onRefresh={refresh}
        />
        <Trending
          content={data}
          isLoading={isLoading}
          isFetching={isFetching}
          onRefresh={refresh}
        />
        <Videos content={data} isLoading={isLoading} />
        <Promote onRequest={openForm} />
        <Promotions content={data} isLoading={isLoading} onRequest={openForm} />
        <About content={data} />
        <Founder />
        <AboutVideo />
        <PromoteCta onRequest={openForm} />
        <Social />
        <Newsletter />
      </main>
      <Footer />
      <PromotionForm open={formOpen} onOpenChange={setFormOpen} />
      <Toaster />
    </div>
  );
}
