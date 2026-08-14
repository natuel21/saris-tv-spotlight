import { createFileRoute } from "@tanstack/react-router";
import { useSarisContent } from "@/hooks/useSarisContent";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/saris/Nav";
import { Hero } from "@/components/saris/Hero";
import { Featured } from "@/components/saris/Featured";
import { LatestReviews } from "@/components/saris/LatestReviews";
import { Trending } from "@/components/saris/Trending";
import { Videos } from "@/components/saris/Videos";
import { Social } from "@/components/saris/Social";
import { About } from "@/components/saris/About";
import { Newsletter } from "@/components/saris/Newsletter";
import { Footer } from "@/components/saris/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saris TV — Ethiopian Reviews, Trends & Entertainment" },
      {
        name: "description",
        content:
          "Saris TV reviews Ethiopian film, music, TV, creators and trends. Honest ratings, trending stories and weekly video episodes.",
      },
      { property: "og:title", content: "Saris TV — We Watch. We Review. You Decide." },
      {
        property: "og:description",
        content:
          "Honest reviews and reactions to the people, entertainment and trends shaping Ethiopian social media.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data, isLoading, isFetching, refetch } = useSarisContent();
  const refresh = () => void refetch();

  return (
    <div className="min-h-screen bg-background">
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
        <Social />
        <About />
        <Newsletter />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
