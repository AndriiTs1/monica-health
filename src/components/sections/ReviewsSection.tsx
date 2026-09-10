import { Container } from "@/components/ui/Container";
import { ReviewForm } from "@/components/sections/ReviewForm";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { createClient } from "@/lib/supabase/server";

type Review = {
  id: string;
  author_name: string;
  rating: number;
  content: string;
  published_at: string | null;
};

// Capped, not unbounded — comfortably covers real-world review volume
// (tens of reviews) without an unbounded query against a public table.
const MAX_REVIEWS = 60;

export async function ReviewsSection() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(MAX_REVIEWS);

  const reviews = (!error && data ? data : []) as Review[];

  if (reviews.length === 0) {
    return (
      <section
        id="recensioni"
        className="py-8 sm:py-10 lg:py-12"
        aria-labelledby="recensioni-eyebrow recensioni-heading"
      >
        <Container className="flex flex-col items-center gap-3 text-center">
          <span
            id="recensioni-eyebrow"
            className="text-sm font-semibold uppercase tracking-wide text-primary"
          >
            Recensioni
          </span>
          <p
            id="recensioni-heading"
            className="text-base font-medium text-foreground"
          >
            Sii tra i primi a lasciare una recensione.
          </p>
          <ReviewForm />
        </Container>
      </section>
    );
  }

  return (
    <section
      id="recensioni"
      className="py-10 sm:py-16 lg:py-20"
      aria-labelledby="recensioni-heading"
    >
      <Container className="flex flex-col gap-6 lg:gap-8">
        <ReviewsCarousel reviews={reviews} />
        <div className="flex justify-center lg:justify-start">
          <ReviewForm />
        </div>
      </Container>
    </section>
  );
}
