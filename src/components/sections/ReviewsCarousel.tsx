"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Review = {
  id: string;
  author_name: string;
  rating: number;
  content: string;
};

interface ReviewsCarouselProps {
  reviews: Review[];
}

const HEADING_ID = "recensioni-heading";

function cardWidthClass(count: number): string {
  if (count === 1) return "w-full sm:w-[70%] lg:w-[45%]";
  if (count === 2) return "w-[85%] sm:w-[54%] lg:w-[45%]";
  return "w-[85%] sm:w-[54%] lg:w-[calc((100%-3rem)/3)]";
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [progress, setProgress] = useState({ ratio: 1, offset: 0 });

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const scrollable = maxScrollLeft > 1;

    setIsScrollable(scrollable);
    setCanScrollPrev(scrollable && track.scrollLeft > 1);
    setCanScrollNext(scrollable && track.scrollLeft < maxScrollLeft - 1);
    setProgress({
      ratio: scrollable ? track.clientWidth / track.scrollWidth : 1,
      offset: scrollable ? track.scrollLeft / track.scrollWidth : 0,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();

    const handleScroll = () => requestAnimationFrame(updateScrollState);
    track.addEventListener("scroll", handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => updateScrollState());
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scrollByDirection = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-review-card]");
    if (!firstCard) return;

    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const target = Math.min(
      Math.max(track.scrollLeft + step * direction, 0),
      maxScrollLeft,
    );

    track.scrollTo({
      left: target,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Recensioni
          </span>
          <h2
            id={HEADING_ID}
            className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
          >
            Cosa dicono i pazienti
          </h2>
        </div>

        {isScrollable ? (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByDirection(-1)}
              disabled={!canScrollPrev}
              aria-label="Recensione precedente"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors enabled:hover:bg-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByDirection(1)}
              disabled={!canScrollNext}
              aria-label="Recensione successiva"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors enabled:hover:bg-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={HEADING_ID}
      >
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <li
              key={review.id}
              data-review-card
              aria-roledescription="diapositiva"
              aria-label={`Recensione di ${review.author_name}`}
              className={`flex shrink-0 snap-start ${cardWidthClass(reviews.length)}`}
            >
              <article className="flex h-full w-full flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-sm lg:p-6">
                <div className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < review.rating
                          ? "fill-current text-primary"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="sr-only">{review.rating} su 5</span>
                <p className="text-base leading-relaxed text-muted">
                  &ldquo;{review.content}&rdquo;
                </p>
                <p className="mt-auto text-sm font-medium text-foreground">
                  {review.author_name}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {isScrollable ? (
        <div
          className="relative h-1 w-full max-w-[220px] overflow-hidden rounded-full bg-border"
          aria-hidden="true"
        >
          <div
            className="absolute inset-y-0 rounded-full bg-primary transition-[left,width] duration-300 ease-out"
            style={{
              width: `${Math.max(progress.ratio * 100, 8)}%`,
              left: `${progress.offset * 100}%`,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
