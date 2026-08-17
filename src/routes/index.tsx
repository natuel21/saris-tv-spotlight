import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSarisContent } from "@/hooks/useSarisContent";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saris TV — Find Opportunities. Build Wealth." },
      {
        name: "description",
        content:
          "Saris TV is an Ethiopian digital media platform in Addis Ababa covering business, entrepreneurship, entertainment, lifestyle, travel and opportunities.",
      },
      { property: "og:title", content: "Saris TV — Find Opportunities. Build Wealth." },
      {
        property: "og:description",
        content:
          "Stories, businesses, ideas, entertainment, culture and opportunities from Ethiopia and beyond.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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
        <AboutVideo content={data} />
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
