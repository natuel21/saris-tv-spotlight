import { supabaseAdmin } from "@/integrations/supabase/client.server";

const API = "https://www.googleapis.com/youtube/v3";
export const CHANNEL_ID = "UCAkXYb7vzhJbIe7HLSR4n2A";

type Cfg = {
  refresh_seconds: number;
  trending_window_days: number;
  min_trending_score: number;
  weight_recency: number;
  weight_velocity: number;
  weight_engagement: number;
  weight_growth: number;
  weight_popularity: number;
};

function apiKey() {
  const key = process.env["YOUTUBE_API_KEY"];
  if (!key) throw new Error("YOUTUBE_API_KEY is not configured");
  return key;
}

async function yt<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${API}/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set("key", apiKey());
  const res = await fetch(url.toString());
  const body = await res.text();
  if (!res.ok) throw new Error(`YouTube API ${path} failed [${res.status}]: ${body}`);
  return JSON.parse(body) as T;
}

export function parseDuration(iso: string): number {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso ?? "");
  if (!m) return 0;
  const [, d, h, mi, s] = m;
  return (
    Number(d ?? 0) * 86400 + Number(h ?? 0) * 3600 + Number(mi ?? 0) * 60 + Number(s ?? 0)
  );
}

const CATEGORY_RULES: Array<[string, RegExp]> = [
  ["Currency", /(currency|exchange rate|ምንዛሬ|ዶላር|dollar|birr rate|forex)/i],
  ["Property", /(apartment|real estate|villa|property|ቤት|አፓርታማ|ኮንዶ|land|rent)/i],
  ["Hotels", /(hotel|resort|lodge|ሆቴል|guest house)/i],
  ["Food", /(food|restaurant|cafe|ምግብ|coffee|ቡና|menu|recipe)/i],
  ["Travel", /(travel|tour|trip|ጉዞ|destination)/i],
  ["Business", /(business|price|ዋጋ|market|shop|invest|ንግድ|cost|birr)/i],
  ["News", /(news|breaking|ዜና|update|announce)/i],
  ["Interviews", /(interview|ቃለ|conversation|talk with)/i],
  ["Entertainment", /(music|movie|film|drama|artist|entertainment|ሙዚቃ|ፊልም)/i],
  ["Addis Ababa", /(addis ababa|አዲስ አበባ|piassa|bole|ሳርቤት|sarbet)/i],
  ["Lifestyle", /(lifestyle|beauty|makeup|fashion|health|clinic|ጤና|ውበት)/i],
  ["Reviews", /(review|ግምገማ|tour of|we tried)/i],
];

export function detectCategory(title: string, description: string, isShort: boolean) {
  if (isShort) return "Shorts";
  const text = `${title}\n${description.slice(0, 500)}`;
  for (const [cat, re] of CATEGORY_RULES) if (re.test(text)) return cat;
  return "Saris TV";
}

export type ScoreInput = {
  publishedAt: string;
  views: number;
  likes: number | null;
  comments: number | null;
  recentGain: number;
  recentHours: number;
  isShort: boolean;
};

/** Blended trending score: recency + view velocity + engagement + recent growth + popularity. */
export function calculateTrendingScore(v: ScoreInput, cfg: Cfg) {
  const ageHours = Math.max(
    0.5,
    (Date.now() - new Date(v.publishedAt).getTime()) / 3_600_000,
  );
  const viewsPerHour = v.views / ageHours;
  const viewsPerDay = viewsPerHour * 24;

  // Time decay: strong boost in the first 24h, tapering with a ~7 day half-life.
  const newBoost = ageHours <= 24 ? 1 + (24 - ageHours) / 24 : 1;
  const recency = 100 * Math.exp(-ageHours / 168) * newBoost;

  // Velocity across recent windows (falls back to lifetime rate when no snapshot yet).
  const measured = v.recentHours > 0 ? v.recentGain / v.recentHours : viewsPerHour;
  const velocity = 18 * Math.log10(1 + Math.max(measured, 0)) * (v.isShort ? 1.1 : 1);

  const engagementRate = v.views > 0 ? ((v.likes ?? 0) + (v.comments ?? 0) * 2) / v.views : 0;
  const engagement = Math.min(engagementRate * 800, 60);

  const growth = 14 * Math.log10(1 + Math.max(v.recentGain, 0));
  const popularity = 8 * Math.log10(1 + v.views);

  const score =
    cfg.weight_recency * recency +
    cfg.weight_velocity * velocity +
    cfg.weight_engagement * engagement +
    cfg.weight_growth * growth +
    cfg.weight_popularity * popularity;

  return {
    score: Math.round(score * 100) / 100,
    viewsPerHour: Math.round(viewsPerHour * 100) / 100,
    viewsPerDay: Math.round(viewsPerDay * 100) / 100,
  };
}

export function badgeFor(
  score: number,
  rank: number,
  ageHours: number,
  viewsPerHour: number,
  minScore: number,
): string | null {
  if (ageHours <= 48) return "NEW";
  if (score < minScore) return null;
  if (rank === 0 || viewsPerHour > 300) return "TRENDING";
  if (rank < 3) return "RISING";
  return "POPULAR";
}

type PlaylistItems = {
  items: Array<{ contentDetails: { videoId: string; videoPublishedAt?: string } }>;
  nextPageToken?: string;
};
type VideoList = {
  items: Array<{
    id: string;
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      liveBroadcastContent?: string;
      thumbnails: Record<string, { url: string; width: number }>;
    };
    contentDetails: { duration: string };
    statistics: { viewCount?: string; likeCount?: string; commentCount?: string };
  }>;
};

async function getUploadsPlaylistId(current: string | null) {
  if (current) return current;
  const data = await yt<{ items: Array<{ contentDetails: { relatedPlaylists: { uploads: string } } }> }>(
    "channels",
    { part: "contentDetails", id: CHANNEL_ID },
  );
  const uploads = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error("Could not resolve uploads playlist for the Saris TV channel");
  return uploads;
}

/** Refreshes the local cache from the channel's uploads playlist. Returns the sync state row. */
export async function syncChannel(options: { maxVideos?: number } = {}) {
  const maxVideos = options.maxVideos ?? 50;
  const { data: stateRow } = await supabaseAdmin
    .from("yt_sync_state")
    .select("*")
    .eq("id", true)
    .maybeSingle();
  const { data: cfgRow } = await supabaseAdmin
    .from("yt_config")
    .select("*")
    .eq("id", true)
    .maybeSingle();
  const cfg = cfgRow as unknown as Cfg;

  await supabaseAdmin
    .from("yt_sync_state")
    .update({ last_attempt_at: new Date().toISOString() })
    .eq("id", true);

  try {
    const uploads = await getUploadsPlaylistId(stateRow?.uploads_playlist_id ?? null);

    const ids: string[] = [];
    let pageToken: string | undefined;
    while (ids.length < maxVideos) {
      const page: PlaylistItems = await yt("playlistItems", {
        part: "contentDetails",
        playlistId: uploads,
        maxResults: String(Math.min(50, maxVideos - ids.length)),
        ...(pageToken ? { pageToken } : {}),
      });
      ids.push(...page.items.map((i) => i.contentDetails.videoId));
      if (!page.nextPageToken) break;
      pageToken = page.nextPageToken;
    }

    const details: VideoList["items"] = [];
    for (let i = 0; i < ids.length; i += 50) {
      const chunk = ids.slice(i, i + 50);
      const page = await yt<VideoList>("videos", {
        part: "snippet,contentDetails,statistics",
        id: chunk.join(","),
      });
      details.push(...page.items);
    }

    const { data: previous } = await supabaseAdmin
      .from("yt_videos")
      .select("id, view_count, stats_updated_at");
    const prevMap = new Map((previous ?? []).map((p) => [p.id, p]));

    const now = Date.now();
    const rows = details.map((v) => {
      const duration = parseDuration(v.contentDetails?.duration ?? "");
      const live = v.snippet.liveBroadcastContent;
      const isShort = duration > 0 && duration <= 60;
      const views = Number(v.statistics?.viewCount ?? 0);
      const likes = v.statistics?.likeCount ? Number(v.statistics.likeCount) : null;
      const comments = v.statistics?.commentCount ? Number(v.statistics.commentCount) : null;
      const prev = prevMap.get(v.id);
      const recentGain = prev ? Math.max(views - Number(prev.view_count), 0) : 0;
      const recentHours = prev
        ? Math.max((now - new Date(prev.stats_updated_at).getTime()) / 3_600_000, 0)
        : 0;
      const thumbs = v.snippet.thumbnails ?? {};
      const thumb =
        thumbs["maxres"]?.url ?? thumbs["standard"]?.url ?? thumbs["high"]?.url ?? thumbs["medium"]?.url ?? "";

      const { score, viewsPerHour, viewsPerDay } = calculateTrendingScore(
        {
          publishedAt: v.snippet.publishedAt,
          views,
          likes,
          comments,
          recentGain,
          recentHours,
          isShort,
        },
        cfg,
      );

      return {
        id: v.id,
        title: v.snippet.title,
        description: v.snippet.description ?? "",
        thumbnail_url: thumb,
        published_at: v.snippet.publishedAt,
        duration_seconds: duration,
        video_type: isShort ? "short" : "video",
        live_status: live && live !== "none" ? live : null,
        view_count: views,
        like_count: likes,
        comment_count: comments,
        category: detectCategory(v.snippet.title, v.snippet.description ?? "", isShort),
        trending_score: score,
        views_per_hour: viewsPerHour,
        views_per_day: viewsPerDay,
        recent_view_gain: recentGain,
        stats_updated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });

    // Rank inside the configured trending window, then assign badges.
    const windowMs = (cfg?.trending_window_days ?? 30) * 86_400_000;
    const ranked = [...rows]
      .filter((r) => now - new Date(r.published_at).getTime() <= windowMs)
      .sort((a, b) => b.trending_score - a.trending_score);
    const rankMap = new Map(ranked.map((r, i) => [r.id, i]));
    const finalRows = rows.map((r) => {
      const ageHours = (now - new Date(r.published_at).getTime()) / 3_600_000;
      const rank = rankMap.get(r.id);
      return {
        ...r,
        trending_badge:
          rank === undefined
            ? null
            : badgeFor(r.trending_score, rank, ageHours, r.views_per_hour, cfg?.min_trending_score ?? 20),
      };
    });

    if (finalRows.length > 0) {
      const { error } = await supabaseAdmin.from("yt_videos").upsert(finalRows, { onConflict: "id" });
      if (error) throw new Error(error.message);
      await supabaseAdmin.from("yt_stats_snapshots").insert(
        finalRows.map((r) => ({
          video_id: r.id,
          view_count: r.view_count,
          like_count: r.like_count,
          comment_count: r.comment_count,
        })),
      );
      // Keep the snapshot table small: drop anything older than 14 days.
      await supabaseAdmin
        .from("yt_stats_snapshots")
        .delete()
        .lt("captured_at", new Date(now - 14 * 86_400_000).toISOString());
    }

    await supabaseAdmin
      .from("yt_sync_state")
      .update({
        uploads_playlist_id: uploads,
        last_success_at: new Date().toISOString(),
        last_error: null,
        video_count: finalRows.length,
        updated_at: new Date().toISOString(),
      })
      .eq("id", true);

    return { ok: true as const, synced: finalRows.length };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[youtube sync]", message);
    await supabaseAdmin
      .from("yt_sync_state")
      .update({ last_error: message, updated_at: new Date().toISOString() })
      .eq("id", true);
    return { ok: false as const, error: message };
  }
}