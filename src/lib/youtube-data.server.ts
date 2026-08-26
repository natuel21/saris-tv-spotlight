import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { PROMOTION_MARKERS, brandFromTitle, isPromotionalVideo } from "@/lib/promotions";
import type { SiteContent, SiteVideo } from "@/lib/youtube.functions";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  const url = process.env["SUPABASE_URL"];
  if (!key || !url) throw new Error("Backend configuration is unavailable");
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

type Row = Database["public"]["Tables"]["yt_videos"]["Row"];

function toVideo(row: Row, markers: readonly string[] = PROMOTION_MARKERS): SiteVideo {
  const promotion = isPromotionalVideo(
    { title: row.title, description: row.description },
    markers,
  );
  return {
    id: row.id,
    channelId: row.channel_id,
    title: row.title,
    description: row.description,
    thumbnail: row.thumbnail_url,
    publishedAt: row.published_at,
    durationSeconds: row.duration_seconds,
    type: row.video_type,
    liveStatus: row.live_status,
    views: Number(row.view_count),
    likes: row.like_count === null ? null : Number(row.like_count),
    comments: row.comment_count === null ? null : Number(row.comment_count),
    category: row.category,
    score: Number(row.trending_score),
    viewsPerHour: Number(row.views_per_hour),
    viewsPerDay: Number(row.views_per_day),
    recentGain: Number(row.recent_view_gain),
    badge: row.trending_badge,
    url: `https://www.youtube.com/watch?v=${row.id}`,
    isPromotion: promotion,
    brand: promotion ? brandFromTitle(row.title, markers) : null,
  };
}

export async function getSiteContentData(): Promise<SiteContent> {
  const backend = publicClient();
  const [{ data: cfg }, { data: state }] = await Promise.all([
    backend.from("yt_config").select("*").eq("id", true).maybeSingle(),
    backend.from("yt_sync_state").select("*").eq("id", true).maybeSingle(),
  ]);
  const refreshSeconds = cfg?.refresh_seconds ?? 120;
  const markers = (cfg?.promotion_markers as string[] | null) ?? [...PROMOTION_MARKERS];
  const lastSuccess = state?.last_success_at ? new Date(state.last_success_at).getTime() : 0;
  if (Date.now() - lastSuccess > refreshSeconds * 1000 && process.env["YOUTUBE_API_KEY"]) {
    const { syncChannel } = await import("@/lib/youtube.server");
    await syncChannel();
  }
  const [{ data: videos }, { data: freshState }] = await Promise.all([
    backend.from("yt_videos").select("*").order("published_at", { ascending: false }),
    backend.from("yt_sync_state").select("*").eq("id", true).maybeSingle(),
  ]);
  const all = (videos ?? [])
    .map((row) => toVideo(row, markers))
    .filter((video) => video.channelId === "UCAkXYb7vzhJbIe7HLSR4n2A" && video.id && video.title && video.publishedAt);
  const longForm = all.filter((video) => video.type !== "short");
  const shorts = all.filter((video) => video.type === "short");
  const windowMs = (cfg?.trending_window_days ?? 30) * 86_400_000;
  const trending = [...all]
    .filter((video) => Date.now() - new Date(video.publishedAt).getTime() <= windowMs)
    .sort((a, b) => b.score - a.score)
    .slice(0, cfg?.trending_count ?? 8);
  const latest = longForm.slice(0, cfg?.latest_count ?? 9);
  let featured = cfg?.featured_mode === "manual" && cfg.featured_video_id
    ? all.find((video) => video.id === cfg.featured_video_id) ?? null
    : null;
  if (!featured) featured = trending[0] ?? longForm[0] ?? all[0] ?? null;
  const shown = new Set([featured?.id, ...latest.map((video) => video.id)].filter(Boolean));
  const aboutVideoId = cfg?.about_video_id ?? null;
  return {
    featured,
    all,
    latest,
    trending,
    shorts: shorts.slice(0, cfg?.shorts_count ?? 8),
    more: longForm.filter((video) => !shown.has(video.id)).slice(0, 6),
    promotions: all.filter((video) => video.isPromotion),
    aboutVideoId,
    aboutVideo: aboutVideoId ? all.find((video) => video.id === aboutVideoId) ?? null : null,
    promotionMarkers: markers,
    lastUpdated: freshState?.last_success_at ?? null,
    lastError: freshState?.last_error ?? null,
    refreshSeconds,
    totalVideos: all.length,
  };
}

export async function searchVideoData(query: string): Promise<SiteVideo[]> {
  const backend = publicClient();
  const escaped = query.replace(/[%,]/g, " ");
  const { data } = await backend
    .from("yt_videos")
    .select("*")
    .or(`title.ilike.%${escaped}%,description.ilike.%${escaped}%,category.ilike.%${escaped}%`)
    .order("published_at", { ascending: false })
    .limit(24);
  return (data ?? []).map((row) => toVideo(row));
}

export async function getConfigData() {
  const backend = publicClient();
  const { data } = await backend.from("yt_config").select("*").eq("id", true).maybeSingle();
  return data;
}