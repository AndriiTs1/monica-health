import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session cookies on every /admin/* request.
 * Server Components cannot reliably write cookies themselves (see the
 * try/catch in src/lib/supabase/server.ts), so this proxy is the only
 * place a near-expiry access token actually gets refreshed and persisted
 * back to the browser before /admin/login or /admin/reviews render.
 *
 * This is the ONLY thing proxy does. It has no opinion about who is
 * authenticated or who is an admin, and it never redirects. That
 * decision belongs entirely — and only — to requireReviewAdmin() in
 * src/lib/reviews/admin-guard.ts. Two independent systems each deciding
 * where to send a request (proxy redirecting on session presence, the
 * page redirecting on admin membership) is exactly the kind of
 * split-brain that made this auth flow fragile before; there is now a
 * single authoritative server guard.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getClaims() verifies the JWT locally and, if it's close to expiry,
  // refreshes it — which triggers setAll() above and persists the new
  // cookies onto the response before the page ever renders.
  await supabase.auth.getClaims();

  return response;
}
