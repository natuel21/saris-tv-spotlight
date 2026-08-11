import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import musicImg from "@/assets/music.jpg";
import creatorImg from "@/assets/creator.jpg";
import cultureImg from "@/assets/culture.jpg";
import tvImg from "@/assets/tv.jpg";
import trendImg from "@/assets/trend.jpg";
import featuredImg from "@/assets/featured.jpg";
import { Rating, VerdictBadge, type Verdict } from "./Rating";
import { Reveal, SectionHead } from "./Section";

const filters = ["All", "Movies", "Music", "TV", "Creators", "Trends", "Culture"] as const;

type Review = {
  category: (typeof filters)[number];
  title: string;
  desc: string;
  rating: number;
  date: string;
  verdict: Verdict;
  image: string;
};

const reviews: Review[] = [
  {
    category: "Music",
    title: "New Album Review: Is It Worth the Hype?",
    desc: "Fourteen tracks, three producers and one very ambitious closing song.",
    rating: 4.5,
    date: "Aug 9, 2026",
    verdict: "MUST WATCH",
    image: musicImg,
  },
  {
    category: "Creators",
    title: "The Creator Everyone Is Arguing About This Week",
    desc: "Her vlogs feel effortless — we look at whether the format can last.",
    rating: 4,
    date: "Aug 7, 2026",
    verdict: "WORTH IT",
    image: creatorImg,
  },
  {
    category: "Culture",
    title: "Coffee, Comments and Culture: The Ritual Goes Viral",
    desc: "How a centuries-old ceremony became this month's most-shared format.",
    rating: 4.5,
    date: "Aug 5, 2026",
    verdict: "MUST WATCH",
    image: cultureImg,
  },
  {
    category: "TV",
    title: "The Drama Series That Split the Timeline in Half",
    desc: "Strong performances, uneven writing, and an ending people can't agree on.",
    rating: 3,
    date: "Aug 3, 2026",
    verdict: "MIXED",
    image: tvImg,
  },
  {
    category: "Trends",
    title: "Street Style Season: The Look Taking Over Addis",
    desc: "A trend report on the fits, the sounds and the creators driving it.",
    rating: 4,
    date: "Aug 1, 2026",
    verdict: "WORTH IT",
    image: trendImg,
  },
  {
    category: "Movies",
    title: "A Beautiful Film With Nothing Underneath",
    desc: "Gorgeous frames can't rescue a script that never picks a direction.",
    rating: 2,
    date: "Jul 28, 2026",
    verdict: "SKIP IT",
    image: featuredImg,
  },
];

export function LatestReviews() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const shown = active === "All" ? reviews : reviews.filter((r) => r.category === active);

  return (
    <section id="reviews" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <SectionHead kicker="Fresh Opinions" title="Latest Reviews" />
      </Reveal>

      <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`font-display shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              active === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r, i) => (
          <Reveal key={r.title} delay={(i % 3) * 90}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40">
              <div className="relative overflow-hidden">
                <img
                  src={r.image}
                  alt={r.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <span className="micro-label absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-foreground backdrop-blur-md">
                  {r.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <VerdictBadge verdict={r.verdict} />
                <h3 className="text-xl leading-snug font-semibold">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <Rating value={r.rating} />
                  <span className="micro-label text-muted-foreground">{r.date}</span>
                </div>
                <a
                  href="#reviews"
                  className="font-display inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Read more
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}