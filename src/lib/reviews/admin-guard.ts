import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export type ReviewAdminContext = {
  supabase: SupabaseServerClient;
  userId: string;
};

/**
 * The single place that queries public.review_admins. Both
 * requireReviewAdmin() below and the login page's "already an admin"
 * redirect share this, so there is exactly one code path deciding admin
 * membership — never two independent, potentially-diverging checks.
 */
async function isReviewAdmin(
  supabase: SupabaseServerClient,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("review_admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  return !error && Boolean(data);
}

async function getAuthenticatedUserId(
  supabase: SupabaseServerClient,
): Promise<string | null> {
  const { data, error } = await supabase.auth.getClaims();
  return !error ? (data?.claims?.sub ?? null) : null;
}

/**
 * Confirms the current request belongs to a signed-in user who is also
 * listed in public.review_admins, and returns a ready-to-use Supabase
 * client for them. Redirects away otherwise.
 *
 * This is the single source of truth for "is this an admin" — the
 * /admin/reviews page and every moderation Server Action (publish/hide/
 * delete) call this independently and from scratch. Nothing here trusts
 * that the UI only shows moderation buttons to admins: a non-admin who
 * somehow calls a Server Action directly still gets re-checked here,
 * and even if this check had a bug, the RLS policies in
 * supabase/review-admin.sql are the actual last line of defense at the
 * database level.
 */
export async function requireReviewAdmin(): Promise<ReviewAdminContext> {
  const supabase = await createClient();
  const userId = await getAuthenticatedUserId(supabase);

  if (!userId) {
    redirect("/admin/login");
  }

  if (!(await isReviewAdmin(supabase, userId))) {
    redirect("/admin/access-denied");
  }

  return { supabase, userId };
}

/**
 * Non-redirecting variant used only by the login page, to decide whether
 * to bounce an already-signed-in admin straight to /admin/reviews.
 */
export async function checkReviewAdminSession(): Promise<{
  isAdmin: boolean;
}> {
  const supabase = await createClient();
  const userId = await getAuthenticatedUserId(supabase);
  const isAdmin = userId ? await isReviewAdmin(supabase, userId) : false;
  return { isAdmin };
}
