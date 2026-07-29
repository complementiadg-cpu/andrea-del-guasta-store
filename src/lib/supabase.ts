import { createClient } from "@supabase/supabase-js";

// Publishable (anon) key — safe to expose client-side.
const SUPABASE_URL = "https://hccocbtdculxepukbxrc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FHBt2CRG6DMt5mQ8hrkviQ_2Jc0UOrg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
