import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewForm } from "@/components/sections/ReviewForm";
import { createClient } from "@/lib/supabase/server";

type Review = {
  id: string;
  author_name: string;
  rating: number;
  content: string;
  published_at: string | null;
};

export async function ReviewsSection() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3);

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
      <Container className="flex flex-col gap-8 lg:gap-10">
        <SectionHeading
          id="recensioni-heading"
          eyebrow="Recensioni"
          title="Cosa dicono i pazienti"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-sm lg:p-6"
            >
              <div
                className="flex gap-1"
                aria-label={`${review.rating} stelle su 5`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < review.rating
                        ? "fill-current text-primary"
                        : "text-border"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-base leading-relaxed text-muted">
                &ldquo;{review.content}&rdquo;
              </p>
              <p className="text-sm font-medium text-foreground">
                {review.author_name}
              </p>
            </article>
          ))}
        </div>
        <div className="flex justify-center lg:justify-start">
          <ReviewForm />
        </div>
      </Container>
    </section>
  );
}
