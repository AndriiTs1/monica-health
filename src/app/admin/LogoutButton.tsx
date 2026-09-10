"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Deliberately dumb: plain useState, one awaited call, then a FULL
 * browser navigation (window.location.replace) — see LoginForm.tsx for
 * why. No router.refresh/replace, no Server Action, no useTransition.
 */
export function LogoutButton({ className }: { className?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signOutError } = await supabase.auth.signOut({
      scope: "local",
    });

    if (signOutError) {
      console.error(signOutError);
      setError("Non è stato possibile disconnettersi. Riprova.");
      setIsLoading(false);
      return;
    }

    // No setIsLoading(false) here on purpose — the full navigation
    // below tears down this component and the whole document with it.
    window.location.replace("/");
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isLoading}
        className={
          className ??
          "inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
        }
      >
        {isLoading ? "Uscita in corso..." : "Esci"}
      </button>
      {error ? (
        <p role="alert" className="text-xs text-primary">
          {error}
        </p>
      ) : null}
    </div>
  );
}
