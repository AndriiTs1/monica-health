import type { Metadata } from "next";
import { requireReviewAdmin } from "@/lib/reviews/admin-guard";
import { LogoutButton } from "@/app/admin/LogoutButton";
import { AdminReviewsClient } from "./AdminReviewsClient";

export const metadata: Metadata = {
  title: "Gestione recensioni",
};

export type ReviewStatus = "pending" | "published" | "hidden";

export type AdminReview = {
  id: string;
  author_name: string;
  rating: number;
  content: string;
  status: ReviewStatus;
  created_at: string;
};

export default async function AdminReviewsPage() {
  const { supabase } = await requireReviewAdmin();

  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  const reviews = (data ?? []) as AdminReview[];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
      <header className="flex flex-col items-start justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Monica Ceruolo
          </h1>
          <p className="text-sm text-muted">Gestione recensioni</p>
        </div>
        <LogoutButton />
      </header>

      <AdminReviewsClient initialReviews={reviews} />
    </main>
  );
}
