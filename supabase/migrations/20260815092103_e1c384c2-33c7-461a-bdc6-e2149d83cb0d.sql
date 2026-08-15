ALTER TABLE public.yt_config
  ADD COLUMN IF NOT EXISTS about_video_id text,
  ADD COLUMN IF NOT EXISTS promotion_markers text[] NOT NULL DEFAULT ARRAY['[PROMOTION]','[SPONSORED]','[ADVERTISEMENT]','#Promotion','#Sponsored']::text[];

CREATE TABLE IF NOT EXISTS public.promotion_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  product_or_service text NOT NULL,
  promotion_type text NOT NULL,
  campaign_description text NOT NULL,
  link text,
  preferred_contact text,
  additional_info text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, DELETE ON public.promotion_requests TO authenticated;
GRANT ALL ON public.promotion_requests TO service_role;

ALTER TABLE public.promotion_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team can read promotion requests" ON public.promotion_requests
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Team can manage promotion requests" ON public.promotion_requests
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);