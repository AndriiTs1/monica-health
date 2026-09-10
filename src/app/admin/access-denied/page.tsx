import type { Metadata } from "next";
import { LogoutButton } from "@/app/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Accesso non autorizzato",
};

export default function AccessDeniedPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-xl font-semibold text-foreground">
        Accesso non autorizzato
      </h1>
      <p className="max-w-sm text-sm text-muted">
        Il tuo account non ha i permessi per gestire le recensioni.
      </p>
      <LogoutButton className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70" />
    </main>
  );
}
