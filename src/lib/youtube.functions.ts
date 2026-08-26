import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getConfigData, getSiteContentData, searchVideoData } from "@/lib/youtube-data.server";

export type SiteVideo = {
  id: string;
  channelId: string;
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
  isPromotion: boolean;
  brand: string | null;
};

export type SiteContent = {
  featured: SiteVideo | null;
  all: SiteVideo[];
  latest: SiteVideo[];
  trending: SiteVideo[];
  shorts: SiteVideo[];
  more: SiteVideo[];
  promotions: SiteVideo[];
  aboutVideoId: string | null;
  aboutVideo: SiteVideo | null;
  promotionMarkers: string[];
  lastUpdated: string | null;
  lastError: string | null;
  refreshSeconds: number;
  totalVideos: number;
};

/** Reads the cached channel content, refreshing from YouTube first when the cache is stale. */
export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => getSiteContentData(),
);

/** Full-text-ish search across the cached Saris TV catalogue. */
export const searchVideos = createServerFn({ method: "GET" })
  .inputValidator((data: { q: string }) => ({ q: String(data?.q ?? "").slice(0, 120) }))
  .handler(async ({ data }): Promise<SiteVideo[]> => {
    const q = data.q.trim();
    if (!q) return [];
    return searchVideoData(q);
  });

export const getConfig = createServerFn({ method: "GET" }).handler(async () => getConfigData());

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
  about_video_id: string | null;
  promotion_markers: string[];
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

export type PromotionRequestInput = {
  business_name: string;
  contact_person: string;
  email: string;
  phone: string;
  product_or_service: string;
  promotion_type: string;
  campaign_description: string;
  link?: string;
  budget_campaign_info?: string;
  preferred_contact?: string;
  additional_info?: string;
};

/** Public promotion enquiry: validated server-side, then stored for the Saris TV team. */
export const submitPromotionRequest = createServerFn({ method: "POST" })
  .inputValidator((data: PromotionRequestInput) => {
    const s = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
    const parsed = {
      business_name: s(data?.business_name, 120),
      contact_person: s(data?.contact_person, 120),
      email: s(data?.email, 200),
      phone: s(data?.phone, 40),
      product_or_service: s(data?.product_or_service, 200),
      promotion_type: s(data?.promotion_type, 60),
      campaign_description: s(data?.campaign_description, 2000),
      link: s(data?.link, 300),
      budget_campaign_info: s(data?.budget_campaign_info, 1000),
      preferred_contact: s(data?.preferred_contact, 40),
      additional_info: s(data?.additional_info, 2000),
    };
    const required: Array<keyof typeof parsed> = [
      "business_name",
      "contact_person",
      "email",
      "phone",
      "product_or_service",
      "promotion_type",
      "campaign_description",
    ];
    for (const key of required) {
      if (!parsed[key]) throw new Error(`Missing required field: ${key.replace(/_/g, " ")}`);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(parsed.email)) throw new Error("Invalid email address");
    return parsed;
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("promotion_requests")
      .insert(data)
      .select("id")
      .single();
    if (error) throw new Error(error.message);

    // Deliver the full request to the Saris TV team inbox. The request is
    // already stored; email failures are reported so the UI can react.
    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      const result = await sendTemplateEmail("promotion-request", "saristvethiopia@gmail.com", {
        from: "Saris TV Promotions <promotions@sarismultimedia.com>",
        replyTo: data.email,
        idempotencyKey: `promotion-request-${row.id}`,
        templateData: {
          businessName: data.business_name,
          contactPerson: data.contact_person,
          email: data.email,
          phone: data.phone,
          productOrService: data.product_or_service,
          promotionType: data.promotion_type,
          campaignDescription: data.campaign_description,
          link: data.link,
          budgetInfo: data.budget_campaign_info,
          preferredContact: data.preferred_contact,
          additionalInfo: data.additional_info,
          timestamp: new Date().toISOString(),
        },
      });
      if (!result.sent) {
        return { ok: true as const, emailed: false as const, reason: result.reason };
      }
      return { ok: true as const, emailed: true as const };
    } catch (e) {
      console.error("Promotion request email failed", e);
      return {
        ok: true as const,
        emailed: false as const,
        reason: e instanceof Error ? e.message : "Email delivery failed",
      };
    }
  });