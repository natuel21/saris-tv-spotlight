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
      { property: "og:url", content: "https://sarismultimedia.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: "https://sarismultimedia.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": "https://sarismultimedia.com/about#webpage",
          url: "https://sarismultimedia.com/about",
          name: "About Saris TV — Ethiopian Digital Media, Addis Ababa",
          description:
            "Saris TV is an Ethiopian digital media platform based in Addis Ababa covering business, entrepreneurship, economics, entertainment, lifestyle, travel, local culture and opportunities.",
          isPartOf: { "@id": "https://sarismultimedia.com/#website" },
          mainEntity: { "@id": "https://sarismultimedia.com/#organization" },
          about: { "@id": "https://sarismultimedia.com/#organization" },
          publisher: { "@id": "https://sarismultimedia.com/#organization" },
          inLanguage: ["en", "am"],
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sarismultimedia.com/" },
              { "@type": "ListItem", position: 2, name: "About", item: "https://sarismultimedia.com/about" },
            ],
          },
        }),
      },
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
        <AboutVideo />
        <PromoteCta onRequest={() => setFormOpen(true)} />
      </main>
      <Footer />
      <PromotionForm open={formOpen} onOpenChange={setFormOpen} />
      <Toaster />
    </div>
  );
}
