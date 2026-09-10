"use server";

import { revalidatePath } from "next/cache";
import { requireReviewAdmin } from "@/lib/reviews/admin-guard";

export type ReviewActionResult = { error: string | null };

const GENERIC_ERROR = "Si è verificato un problema. Riprova.";

function revalidateAfterModeration() {
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

/**
 * Every action below re-runs requireReviewAdmin() from scratch — it never
 * trusts that the id it was given came from a legitimate moderation UI.
 * None of them accept a "status" value from the caller; each performs
 * exactly one, explicitly-named transition.
 */

export async function publishReview(id: string): Promise<ReviewActionResult> {
  const { supabase } = await requireReviewAdmin();

  const { error } = await supabase
    .from("reviews")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error(error);
    return { error: GENERIC_ERROR };
  }

  revalidateAfterModeration();
  return { error: null };
}

export async function hideReview(id: string): Promise<ReviewActionResult> {
  const { supabase } = await requireReviewAdmin();

  const { error } = await supabase
    .from("reviews")
    .update({ status: "hidden", published_at: null })
    .eq("id", id);

  if (error) {
    console.error(error);
    return { error: GENERIC_ERROR };
  }

  revalidateAfterModeration();
  return { error: null };
}

export async function deleteReview(id: string): Promise<ReviewActionResult> {
  const { supabase } = await requireReviewAdmin();

  const { error } = await supabase.from("reviews").delete().eq("id", id);

  if (error) {
    console.error(error);
    return { error: GENERIC_ERROR };
  }

  revalidateAfterModeration();
  return { error: null };
}
