CREATE TABLE public.yt_videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT NOT NULL DEFAULT '',
  published_at TIMESTAMPTZ NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  video_type TEXT NOT NULL DEFAULT 'video',
  live_status TEXT,
  view_count BIGINT NOT NULL DEFAULT 0,
  like_count BIGINT,
  comment_count BIGINT,
  category TEXT NOT NULL DEFAULT 'Saris TV',
  trending_score NUMERIC NOT NULL DEFAULT 0,
  views_per_hour NUMERIC NOT NULL DEFAULT 0,
  views_per_day NUMERIC NOT NULL DEFAULT 0,
  recent_view_gain BIGINT NOT NULL DEFAULT 0,
  trending_badge TEXT,
  stats_updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX yt_videos_published_at_idx ON public.yt_videos (published_at DESC);
CREATE INDEX yt_videos_trending_idx ON public.yt_videos (trending_score DESC);
GRANT SELECT ON public.yt_videos TO anon, authenticated;
GRANT ALL ON public.yt_videos TO service_role;
ALTER TABLE public.yt_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read Saris TV videos" ON public.yt_videos FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.yt_stats_snapshots (
  id BIGSERIAL PRIMARY KEY,
  video_id TEXT NOT NULL REFERENCES public.yt_videos(id) ON DELETE CASCADE,
  view_count BIGINT NOT NULL DEFAULT 0,
  like_count BIGINT,
  comment_count BIGINT,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX yt_stats_snapshots_video_idx ON public.yt_stats_snapshots (video_id, captured_at DESC);
GRANT SELECT ON public.yt_stats_snapshots TO anon, authenticated;
GRANT ALL ON public.yt_stats_snapshots TO service_role;
ALTER TABLE public.yt_stats_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read stats history" ON public.yt_stats_snapshots FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.yt_sync_state (
  id BOOLEAN PRIMARY KEY DEFAULT true CHECK (id),
  channel_id TEXT NOT NULL DEFAULT 'UCAkXYb7vzhJbIe7HLSR4n2A',
  uploads_playlist_id TEXT,
  last_attempt_at TIMESTAMPTZ,
  last_success_at TIMESTAMPTZ,
  last_error TEXT,
  video_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.yt_sync_state TO anon, authenticated;
GRANT ALL ON public.yt_sync_state TO service_role;
ALTER TABLE public.yt_sync_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read sync state" ON public.yt_sync_state FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.yt_sync_state (id) VALUES (true);

CREATE TABLE public.yt_config (
  id BOOLEAN PRIMARY KEY DEFAULT true CHECK (id),
  refresh_seconds INTEGER NOT NULL DEFAULT 120,
  latest_count INTEGER NOT NULL DEFAULT 9,
  trending_count INTEGER NOT NULL DEFAULT 8,
  shorts_count INTEGER NOT NULL DEFAULT 8,
  featured_mode TEXT NOT NULL DEFAULT 'auto',
  featured_video_id TEXT,
  min_trending_score NUMERIC NOT NULL DEFAULT 20,
  weight_recency NUMERIC NOT NULL DEFAULT 1,
  weight_velocity NUMERIC NOT NULL DEFAULT 1,
  weight_engagement NUMERIC NOT NULL DEFAULT 1,
  weight_growth NUMERIC NOT NULL DEFAULT 1,
  weight_popularity NUMERIC NOT NULL DEFAULT 1,
  trending_window_days INTEGER NOT NULL DEFAULT 30,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.yt_config TO anon, authenticated;
GRANT ALL ON public.yt_config TO service_role;
ALTER TABLE public.yt_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site settings" ON public.yt_config FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.yt_config (id) VALUES (true);