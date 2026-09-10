"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Deliberately dumb: plain useState, one awaited call, then a FULL
 * browser navigation (window.location.replace) — never router.replace/
 * refresh, never a Server Action. After signInWithPassword() succeeds,
 * we want a brand new HTTP request, a brand new session check and a
 * brand new React tree, not whatever the App Router's client-side
 * Router Cache happens to still be holding onto. That cache (and the
 * leftover Supabase client instance / auto-refresh timer from a
 * previous sign-in) is what made a second login/logout cycle in the
 * same tab unreliable.
 */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    if (!email.trim() || !password) {
      setError("Inserisci email e password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      console.error(signInError);
      setError("Email o password non corretti.");
      setIsLoading(false);
      return;
    }

    // No setIsLoading(false) here on purpose — the full navigation
    // below tears down this component and the whole document with it.
    window.location.replace("/admin/reviews");
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h1 className="text-xl font-semibold text-foreground">Monica Ceruolo</h1>
      <p className="mt-1 text-sm text-muted">Accesso amministrazione recensioni</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-11 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="min-h-11 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </div>

        <div aria-live="polite" role="status">
          {error ? (
            <p className="rounded-md border border-border bg-background p-3 text-sm text-primary">
              {error}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Accesso in corso..." : "Accedi"}
        </button>
      </form>
    </div>
  );
}
