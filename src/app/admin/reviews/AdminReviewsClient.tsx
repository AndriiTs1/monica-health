"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import type { AdminReview, ReviewStatus } from "./page";
import {
  deleteReview,
  hideReview,
  publishReview,
  type ReviewActionResult,
} from "./actions";

const TABS: { key: ReviewStatus; label: string }[] = [
  { key: "pending", label: "Da verificare" },
  { key: "published", label: "Pubblicate" },
  { key: "hidden", label: "Nascoste" },
];

const DATE_FORMATTER = new Intl.DateTimeFormat("it-CH", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function AdminReviewsClient({
  initialReviews,
}: {
  initialReviews: AdminReview[];
}) {
  const [activeTab, setActiveTab] = useState<ReviewStatus>("pending");

  const counts = useMemo(
    () => ({
      pending: initialReviews.filter((r) => r.status === "pending").length,
      published: initialReviews.filter((r) => r.status === "published").length,
      hidden: initialReviews.filter((r) => r.status === "hidden").length,
    }),
    [initialReviews],
  );

  const visibleReviews = initialReviews.filter((r) => r.status === activeTab);

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Filtra recensioni per stato"
        className="flex flex-wrap gap-2"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              activeTab === tab.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-foreground hover:bg-accent/40"
            }`}
          >
            {tab.label} ({counts[tab.key]})
          </button>
        ))}
      </div>

      {visibleReviews.length === 0 ? (
        <p className="rounded-lg border border-border bg-surface p-6 text-sm text-muted">
          Nessuna recensione in questa categoria.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {visibleReviews.map((review) => (
            <ReviewRow key={review.id} review={review} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ReviewRow({ review }: { review: AdminReview }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function runAction(action: () => Promise<ReviewActionResult>) {
    setActionError(null);
    startTransition(async () => {
      const result = await action();
      if (result.error) {
        setActionError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">
            {review.author_name}
          </span>
          <span
            className="flex gap-0.5"
            aria-label={`${review.rating} stelle su 5`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-3.5 w-3.5 ${
                  index < review.rating
                    ? "fill-current text-primary"
                    : "text-border"
                }`}
                aria-hidden="true"
              />
            ))}
          </span>
        </div>
        <span className="text-xs text-muted">
          {DATE_FORMATTER.format(new Date(review.created_at))}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-muted">{review.content}</p>

      <div aria-live="polite" role="status">
        {actionError ? (
          <p className="text-sm text-primary">{actionError}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {review.status !== "published" ? (
          <button
            type="button"
            disabled={isPending}
            onClick={() => runAction(() => publishReview(review.id))}
            className="inline-flex min-h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
          >
            Pubblica
          </button>
        ) : null}

        {review.status !== "hidden" ? (
          <button
            type="button"
            disabled={isPending}
            onClick={() => runAction(() => hideReview(review.id))}
            className="inline-flex min-h-9 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
          >
            Nascondi
          </button>
        ) : null}

        <button
          type="button"
          disabled={isPending}
          onClick={() => setConfirmingDelete(true)}
          className="inline-flex min-h-9 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          Elimina
        </button>
      </div>

      {confirmingDelete ? (
        <DeleteConfirmDialog
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={() => {
            setConfirmingDelete(false);
            runAction(() => deleteReview(review.id));
          }}
        />
      ) : null}
    </li>
  );
}

function DeleteConfirmDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="delete-confirm-title"
      onClose={onCancel}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onCancel();
        }
      }}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl border border-border bg-surface p-6 text-foreground shadow-lg backdrop:bg-foreground/50"
    >
      <h2
        id="delete-confirm-title"
        className="text-lg font-semibold text-foreground"
      >
        Eliminare questa recensione?
      </h2>
      <p className="mt-2 text-sm text-muted">
        Questa azione è permanente e non può essere annullata.
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Annulla
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Elimina definitivamente
        </button>
      </div>
    </dialog>
  );
}
