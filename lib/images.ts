import { getSupabaseClient } from "./supabase";

export type ImageInsert = {
  source_type: string;
  original_filename: string | null;
  file_size: number | null;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  exif_available: boolean;
  taken_at: string | null;
  camera_make: string | null;
  camera_model: string | null;
  software: string | null;
  exif_data: Record<string, unknown> | null;
  phash: string | null;
  storage_key: string | null;
  source_url: string | null;
  first_seen_at: string;
};

export type SaveImageResult = { ok: true } | { ok: false; reason: string };

export async function saveImageRecord(record: ImageInsert): Promise<SaveImageResult> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const reason =
      "NEXT_PUBLIC_SUPABASE_URL 또는 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 환경변수가 없습니다.";
    console.error("[images] insert skipped:", reason);
    return { ok: false, reason };
  }

  // RLS 정책 때문에 insert가 거부될 수 있으므로 에러를 그대로 남긴다.
  const { error } = await supabase.from("images").insert(record);

  if (error) {
    console.error("[images] insert failed:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return { ok: false, reason: error.message };
  }

  return { ok: true };
}
