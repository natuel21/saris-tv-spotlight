import type { SiteVideo } from "@/lib/youtube.functions";

export const UI_CATEGORIES = [
  "All",
  "Movies",
  "Music",
  "TV",
  "Creators",
  "Trends",
  "Culture",
  "Other",
] as const;

export type UiCategory = (typeof UI_CATEGORIES)[number];

// Matched against the real YouTube title + description — no invented content.
const RULES: Partial<Record<UiCategory, RegExp>> = {
  Movies: /(movie|film|cinema|trailer|ፊልም|ሲኒማ|drama series|actor|actress)/i,
  Music: /(music|song|album|singer|artist|ሙዚቃ|ዘፈን|ድምፃዊ|concert|beat)/i,
  TV: /(\btv\b|television|channel|show|episode|ቲቪ|ተከታታይ|broadcast)/i,
  Creators: /(creator|influencer|youtuber|tiktok|vlogger|content creator|social media|ዩቲዩብ|ቲክቶክ)/i,
  Trends: /(trend|viral|ሰሞኑን|popular|hype|challenge|talk of|buzz)/i,
  Culture: /(culture|tradition|ባህል|ceremony|coffee|ቡና|holiday|በዓል|festival|ethiopia|ኢትዮጵያ|addis|አዲስ አበባ|lifestyle)/i,
};

export function matchesCategory(video: SiteVideo, category: UiCategory) {
  if (category === "All") return true;
  const text = `${video.title}\n${video.description.slice(0, 600)}\n${video.category}`;
  if (category === "Other") {
    return !Object.values(RULES).some((re) => re.test(text));
  }
  const rule = RULES[category];
  return rule ? rule.test(text) : false;
}

export function filterByCategory(videos: SiteVideo[], category: UiCategory) {
  return videos.filter((v) => matchesCategory(v, category));
}