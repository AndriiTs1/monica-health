import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16 renamed middleware.ts to proxy.ts (same mechanism, new file
// convention). Scoped to /admin/* only, so the public landing, the review
// form's insert, and every other public route never invoke Supabase or
// touch cookies here at all.
export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
