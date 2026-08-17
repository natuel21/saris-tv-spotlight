import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSarisContent } from "@/hooks/useSarisContent";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/saris/Nav";
import { ScrollProgress } from "@/components/saris/ScrollProgress";
import { About } from "@/components/saris/About";
import { Founder } from "@/components/saris/Founder";
import { AboutVideo } from "@/components/saris/AboutVideo";
import { PromoteCta } from "@/components/saris/Promote";
import { PromotionForm } from "@/components/saris/PromotionForm";
import { Footer } from "@/components/saris/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Saris TV — Ethiopian Digital Media, Addis Ababa" },
      {
        name: "description",
        content:
          "Meet Saris TV: an Addis Ababa digital media platform covering business, entrepreneurship, culture and opportunities. Read the founder's message and watch our story.",
      },
      { property: "og:title", content: "About Saris TV — Our Mission and Story" },
      {
        property: "og:description",
        content:
          "The vision, mission and journey behind Saris TV, an Ethiopian digital media platform based in Addis Ababa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data } = useSarisContent();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Nav />
      <main className="pt-20 md:pt-24">
        <About content={data} />
        <Founder />
        <AboutVideo content={data} />
        <PromoteCta onRequest={() => setFormOpen(true)} />
      </main>
      <Footer />
      <PromotionForm open={formOpen} onOpenChange={setFormOpen} />
      <Toaster />
    </div>
  );
}
