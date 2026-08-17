import { useMemo, useState } from "react";
import { Megaphone } from "lucide-react";
import { Reveal } from "./Section";
import { PromotionCard } from "./PromotionCard";
import { CardSkeleton } from "./VideoBits";
import { PROMOTION_FILTERS, matchesPromotionFilter, type PromotionFilter } from "@/lib/promotions";
import type { SiteContent } from "@/lib/youtube.functions";

export function Promotions({
  content,
  isLoading,
  onRequest,
}: {
  content: SiteContent | undefined;
  isLoading: boolean;
  onRequest: () => void;
}) {
  const [filter, setFilter] = useState<PromotionFilter>("All");
  const promos = content?.promotions ?? [];

  // Only surface filters that actually match real Saris TV content.
  const filters = useMemo(
    () => PROMOTION_FILTERS.filter((f) => f === "All" || promos.some((v) => matchesPromotionFilter(v, f))),
    [promos],
  );
  const active = filters.includes(filter) ? filter : "All";
  const shown = promos.filter((v) => matchesPromotionFilter(v, active));

  return (
    <section id="promotions" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <div className="border-t border-border pt-8">
          <p className="micro-label mb-3 text-primary">Featured by Saris TV</p>
          <h2 className="text-[2.25rem] leading-[1.05] font-bold text-primary sm:text-5xl">
            SARIS TV PROMOTIONS
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Discover businesses, products, services, and opportunities featured by Saris TV.
          </p>
        </div>
      </Reveal>

      {promos.length > 1 ? (
        <Reveal className="mt-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`font-display shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
      ) : null}

      {isLoading ? (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : shown.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((v, i) => (
            <Reveal key={v.id} delay={i * 80}>
              <PromotionCard video={v} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mt-10">
          <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-dashed border-border bg-surface px-6 py-16 text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Megaphone size={24} />
            </span>
            <h3 className="text-xl font-bold text-primary md:text-2xl">
              No promotions published yet
            </h3>
            <p className="max-w-xl text-sm text-muted-foreground md:text-base">
              Promotional videos published on the official Saris TV channel with a
              <span className="font-semibold text-primary"> [PROMOTION]</span> or
              <span className="font-semibold text-primary"> [SPONSORED]</span> marker appear here
              automatically at the next synchronisation.
            </p>
            <button
              type="button"
              onClick={onRequest}
              className="font-display rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              Request a Promotion
            </button>
          </div>
        </Reveal>
      )}
    </section>
  );
}
