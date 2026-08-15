/** Default, configurable markers that flag a Saris TV upload as promotional content. */
export const PROMOTION_MARKERS = [
  "[PROMOTION]",
  "[SPONSORED]",
  "[ADVERTISEMENT]",
  "#Promotion",
  "#Sponsored",
] as const;

type PromoLike = { title: string; description: string };

/** True when the YouTube title or description carries an explicit promotion marker. */
export function isPromotionalVideo(
  video: PromoLike,
  markers: readonly string[] = PROMOTION_MARKERS,
): boolean {
  const text = `${video.title ?? ""}\n${video.description ?? ""}`.toLowerCase();
  return markers.some((m) => m && text.includes(m.toLowerCase()));
}

/** Best-effort business/brand name: the title with the marker stripped, up to the separator. */
export function brandFromTitle(
  title: string,
  markers: readonly string[] = PROMOTION_MARKERS,
): string | null {
  let cleaned = title ?? "";
  for (const m of markers) {
    cleaned = cleaned.replace(new RegExp(m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), " ");
  }
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  const brand = cleaned.split(/\s[—–|-]\s/)[0]?.trim() ?? "";
  if (!brand || brand.length > 60) return null;
  return brand;
}

export const PROMOTION_FILTERS = [
  "All",
  "Products",
  "Services",
  "Businesses",
  "Events",
  "Sponsored",
  "Featured",
] as const;

export type PromotionFilter = (typeof PROMOTION_FILTERS)[number];

const FILTER_RULES: Record<Exclude<PromotionFilter, "All">, RegExp> = {
  Products: /(product|ምርት|device|phone|car|gadget|launch|review of|buy|shop|store)/i,
  Services: /(service|clinic|salon|agency|consult|repair|delivery|logistics|ኣገልግሎት|አገልግሎት|school|training)/i,
  Businesses: /(business|company|ንግድ|enterprise|plc|s\.?c\.?|shop|hotel|restaurant|cafe|bank)/i,
  Events: /(event|expo|exhibition|launch event|conference|festival|bazaar|ኤግዚቢሽን|ፌስቲቫል|opening)/i,
  Sponsored: /(\[sponsored\]|#sponsored|sponsor)/i,
  Featured: /(feature|featured|spotlight|introduc)/i,
};

export function matchesPromotionFilter(
  video: { title: string; description: string },
  filter: PromotionFilter,
): boolean {
  if (filter === "All") return true;
  const text = `${video.title}\n${(video.description ?? "").slice(0, 600)}`;
  return FILTER_RULES[filter].test(text);
}
