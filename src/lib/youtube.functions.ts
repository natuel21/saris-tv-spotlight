import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type SiteVideo = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  durationSeconds: number;
  type: string;
  liveStatus: string | null;
  views: number;
  likes: number | null;
  comments: number | null;
  category: string;
  score: number;
  viewsPerHour: number;
  viewsPerDay: number;
  recentGain: number;
  badge: string | null;
  url: string;
};

export type SiteContent = {
  featured: SiteVideo | null;
  latest: SiteVideo[];
  trending: SiteVideo[];
  shorts: SiteVideo[];
  more: SiteVideo[];
  lastUpdated: string | null;
  lastError: string | null;
  refreshSeconds: number;
  totalVideos: number;
};

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

type Row = Database["public"]["Tables"]["yt_videos"]["Row"];

function toVideo(r: Row): SiteVideo {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    thumbnail: r.thumbnail_url,
    publishedAt: r.published_at,
    durationSeconds: r.duration_seconds,
    type: r.video_type,
    liveStatus: r.live_status,
    views: Number(r.view_count),
    likes: r.like_count === null ? null : Number(r.like_count),
    comments: r.comment_count === null ? null : Number(r.comment_count),
    category: r.category,
    score: Number(r.trending_score),
    viewsPerHour: Number(r.views_per_hour),
    viewsPerDay: Number(r.views_per_day),
    recentGain: Number(r.recent_view_gain),
    badge: r.trending_badge,
    url: `https://www.youtube.com/watch?v=${r.id}`,
  };
}

/** Reads the cached channel content, refreshing from YouTube first when the cache is stale. */
export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => {
    const supabase = publicClient();

    const [{ data: cfg }, { data: state }] = await Promise.all([
      supabase.from("yt_config").select("*").eq("id", true).maybeSingle(),
      supabase.from("yt_sync_state").select("*").eq("id", true).maybeSingle(),
    ]);

    const refreshSeconds = cfg?.refresh_seconds ?? 120;
    const lastSuccess = state?.last_success_at ? new Date(state.last_success_at).getTime() : 0;
    const stale = Date.now() - lastSuccess > refreshSeconds * 1000;

    if (stale && process.env["YOUTUBE_API_KEY"]) {
      const { syncChannel } = await import("@/lib/youtube.server");
      await syncChannel();
    }

    const [{ data: videos }, { data: freshState }] = await Promise.all([
      supabase.from("yt_videos").select("*").order("published_at", { ascending: false }),
      supabase.from("yt_sync_state").select("*").eq("id", true).maybeSingle(),
    ]);

    const all = (videos ?? []).map(toVideo);
    const longForm = all.filter((v) => v.type !== "short");
    const shorts = all.filter((v) => v.type === "short");

    const windowMs = (cfg?.trending_window_days ?? 30) * 86_400_000;
    const trending = [...all]
      .filter((v) => Date.now() - new Date(v.publishedAt).getTime() <= windowMs)
      .sort((a, b) => b.score - a.score)
      .slice(0, cfg?.trending_count ?? 8);

    const latest = longForm.slice(0, cfg?.latest_count ?? 9);

    let featured: SiteVideo | null = null;
    if (cfg?.featured_mode === "manual" && cfg.featured_video_id) {
      featured = all.find((v) => v.id === cfg.featured_video_id) ?? null;
    }
    if (!featured) featured = trending[0] ?? longForm[0] ?? all[0] ?? null;

    const shown = new Set([featured?.id, ...latest.map((v) => v.id)].filter(Boolean));

    return {
      featured,
      latest,
      trending,
      shorts: shorts.slice(0, cfg?.shorts_count ?? 8),
      more: longForm.filter((v) => !shown.has(v.id)).slice(0, 6),
      lastUpdated: freshState?.last_success_at ?? null,
      lastError: freshState?.last_error ?? null,
      refreshSeconds,
      totalVideos: all.length,
    };
  },
);

/** Full-text-ish search across the cached Saris TV catalogue. */
export const searchVideos = createServerFn({ method: "GET" })
  .inputValidator((data: { q: string }) => ({ q: String(data?.q ?? "").slice(0, 120) }))
  .handler(async ({ data }): Promise<SiteVideo[]> => {
    const q = data.q.trim();
    if (!q) return [];
    const supabase = publicClient();
    const escaped = q.replace(/[%,]/g, " ");
    const { data: rows } = await supabase
      .from("yt_videos")
      .select("*")
      .or(`title.ilike.%${escaped}%,description.ilike.%${escaped}%,category.ilike.%${escaped}%`)
      .order("published_at", { ascending: false })
      .limit(24);
    return (rows ?? []).map(toVideo);
  });

export const getConfig = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data } = await supabase.from("yt_config").select("*").eq("id", true).maybeSingle();
  return data;
});

export type ConfigInput = Partial<{
  refresh_seconds: number;
  latest_count: number;
  trending_count: number;
  shorts_count: number;
  featured_mode: string;
  featured_video_id: string | null;
  min_trending_score: number;
  weight_recency: number;
  weight_velocity: number;
  weight_engagement: number;
  weight_growth: number;
  weight_popularity: number;
  trending_window_days: number;
}>;

/** Owner-only settings update (signed-in users of this project only). */
export const updateConfig = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: ConfigInput) => data)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("yt_config")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", true);
    if (error) throw new Error(error.message);
    return { ok: true };
  });