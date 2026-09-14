import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// 브라우저에 노출되는 publishable(anon) 키만 사용한다. service_role 키는 절대 사용하지 않는다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabasePublishableKey) return null;

  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabasePublishableKey, {
      auth: { persistSession: false },
    });
  }

  return cachedClient;
}
