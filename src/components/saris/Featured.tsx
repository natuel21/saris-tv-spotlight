import { Play } from "lucide-react";
import { Rating, VerdictBadge } from "./Rating";
import { Reveal } from "./Section";
import { thumb, videos, watchUrl } from "@/lib/saris";

const feature = videos[1]!;

export function Featured() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <p className="micro-label mb-8 flex items-center gap-3 text-primary">
          <span className="h-px w-10 bg-primary" />
          The Review of the Week
        </p>

        <article
          className="group grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[1.15fr_1fr]"
          style={{ boxShadow: "var(--shadow-lift)" }}
        >
          <div className="relative overflow-hidden">
            <img
              src={thumb(feature.id)}
              alt={feature.title}
              loading="lazy"
              width={1600}
              height={1104}
              className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-96 lg:h-full"
            />
            <div className="absolute left-5 top-5">
              <VerdictBadge verdict="MUST WATCH" />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 p-7 md:p-12">
            <div className="flex flex-wrap items-center gap-4">
              <span className="micro-label rounded-full bg-primary px-3 py-1 text-primary-foreground">
                {feature.category}
              </span>
              <span className="micro-label text-muted-foreground">Saris TV Episode</span>
              <span className="micro-label text-muted-foreground">{feature.date}</span>
            </div>

            <h3 className="text-3xl leading-[1.08] font-bold md:text-[2.75rem]">
              {feature.title}
            </h3>

            <p className="text-muted-foreground md:text-lg">
              {feature.amharic} — a full market walkthrough with current prices, honest commentary
              and everything you need before you buy.
            </p>

            <Rating value={4.5} size={20} />

            <div className="h-px w-full bg-border" />

            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="font-display text-sm font-semibold">Reviewed by the Saris TV team</p>
                <p className="micro-label mt-1 text-muted-foreground">Straight from the channel</p>
              </div>
              <a
                href={watchUrl(feature.id)}
                target="_blank"
                rel="noreferrer noopener"
                className="font-display inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.04]"
              >
                <Play size={14} className="fill-current" strokeWidth={0} />
                Watch Review
              </a>
            </div>
          </div>

          <div className="h-0.5 w-0 bg-primary transition-[width] duration-500 ease-out group-hover:w-full lg:col-span-2" />
        </article>
      </Reveal>
    </section>
  );
}