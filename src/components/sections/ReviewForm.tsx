"use client";

import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Star, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAME_MIN = 2;
const NAME_MAX = 80;
const CONTENT_MIN = 10;
const CONTENT_MAX = 1000;

type Status = "idle" | "submitting" | "success" | "error";

type FormErrors = {
  name?: string;
  rating?: string;
  content?: string;
  consent?: string;
};

const initialValues = {
  name: "",
  rating: 0,
  content: "",
  consent: false,
  website: "", // honeypot — real users never see or fill this
};

const SUCCESS_MESSAGE =
  "Grazie. La recensione è stata inviata e sarà pubblicata dopo la verifica.";

export function ReviewForm() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const firstRatingRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const titleId = useId();
  const nameId = useId();
  const contentId = useId();
  const consentId = useId();
  const warningId = useId();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
    setStatusMessage("");
  }

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleBackdropClick(event: ReactMouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      closeDialog();
    }
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    const trimmedName = values.name.trim();
    const trimmedContent = values.content.trim();

    if (trimmedName.length < NAME_MIN || trimmedName.length > NAME_MAX) {
      nextErrors.name = `Inserisci il tuo nome (${NAME_MIN}-${NAME_MAX} caratteri).`;
    }
    if (values.rating < 1 || values.rating > 5) {
      nextErrors.rating = "Seleziona una valutazione da 1 a 5 stelle.";
    }
    if (
      trimmedContent.length < CONTENT_MIN ||
      trimmedContent.length > CONTENT_MAX
    ) {
      nextErrors.content = `La recensione deve contenere tra ${CONTENT_MIN} e ${CONTENT_MAX} caratteri.`;
    }
    if (!values.consent) {
      nextErrors.consent =
        "Devi accettare la pubblicazione per inviare la recensione.";
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    // Honeypot: real users never fill this hidden field. If it has a
    // value, silently drop the submission without touching Supabase,
    // but still show success so the bot has no signal to react to.
    if (values.website.trim() !== "") {
      setValues(initialValues);
      setErrors({});
      setStatus("success");
      setStatusMessage(SUCCESS_MESSAGE);
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Controlla i campi evidenziati e riprova.");
      if (nextErrors.name) {
        nameInputRef.current?.focus();
      } else if (nextErrors.rating) {
        firstRatingRef.current?.focus();
      } else if (nextErrors.content) {
        contentRef.current?.focus();
      } else if (nextErrors.consent) {
        consentRef.current?.focus();
      }
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    const supabase = createClient();
    const { error } = await supabase.from("reviews").insert({
      author_name: values.name.trim(),
      rating: values.rating,
      content: values.content.trim(),
      consent: true,
      status: "pending",
    });

    if (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage(
        "Si è verificato un problema durante l'invio. Riprova più tardi.",
      );
      return;
    }

    setValues(initialValues);
    setErrors({});
    setStatus("success");
    setStatusMessage(SUCCESS_MESSAGE);
  }

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";
  const contentDescribedBy = [
    warningId,
    errors.content ? `${contentId}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Lascia una recensione
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={handleBackdropClick}
        onClose={resetForm}
        className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border border-border bg-surface p-0 text-foreground shadow-lg backdrop:bg-foreground/50"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="text-xl font-semibold text-foreground">
              Lascia una recensione
            </h2>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Chiudi"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted hover:bg-accent/40 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div aria-live="polite" role="status">
            {statusMessage ? (
              <p className="mt-4 rounded-md border border-border bg-background p-3 text-sm text-foreground">
                {statusMessage}
              </p>
            ) : null}
          </div>

          {!isSuccess ? (
            <form
              className="mt-4 flex flex-col gap-4"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="hidden" aria-hidden="true">
                <label htmlFor="review-website">Non compilare questo campo</label>
                <input
                  type="text"
                  id="review-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      website: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={nameId}
                  className="text-sm font-medium text-foreground"
                >
                  Nome
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  id={nameId}
                  name="author_name"
                  required
                  minLength={NAME_MIN}
                  maxLength={NAME_MAX}
                  value={values.name}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${nameId}-error` : undefined}
                  className="min-h-11 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                {errors.name ? (
                  <p id={`${nameId}-error`} className="text-sm text-primary">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <fieldset className="flex flex-col gap-1.5">
                <legend className="text-sm font-medium text-foreground">
                  Valutazione
                </legend>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label
                      key={star}
                      className="cursor-pointer rounded-sm focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary"
                    >
                      <input
                        ref={star === 1 ? firstRatingRef : undefined}
                        type="radio"
                        name="rating"
                        value={star}
                        required
                        checked={values.rating === star}
                        onChange={() =>
                          setValues((current) => ({ ...current, rating: star }))
                        }
                        aria-label={`${star} ${star === 1 ? "stella" : "stelle"}`}
                        className="sr-only"
                      />
                      <Star
                        className={`h-7 w-7 ${
                          star <= values.rating
                            ? "fill-current text-primary"
                            : "text-border"
                        }`}
                        aria-hidden="true"
                      />
                    </label>
                  ))}
                </div>
                {errors.rating ? (
                  <p className="text-sm text-primary">{errors.rating}</p>
                ) : null}
              </fieldset>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={contentId}
                  className="text-sm font-medium text-foreground"
                >
                  Recensione
                </label>
                <textarea
                  ref={contentRef}
                  id={contentId}
                  name="content"
                  required
                  minLength={CONTENT_MIN}
                  maxLength={CONTENT_MAX}
                  rows={4}
                  value={values.content}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      content: event.target.value,
                    }))
                  }
                  aria-invalid={Boolean(errors.content)}
                  aria-describedby={contentDescribedBy}
                  className="rounded-md border border-border bg-background px-3 py-2 text-base text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                <p id={warningId} className="text-xs text-muted">
                  Per favore, non inserire informazioni mediche o dati sensibili.
                </p>
                {errors.content ? (
                  <p id={`${contentId}-error`} className="text-sm text-primary">
                    {errors.content}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-start gap-2.5">
                  <input
                    ref={consentRef}
                    type="checkbox"
                    id={consentId}
                    name="consent"
                    required
                    checked={values.consent}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        consent: event.target.checked,
                      }))
                    }
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={
                      errors.consent ? `${consentId}-error` : undefined
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-border accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                  <label htmlFor={consentId} className="text-sm text-muted">
                    Acconsento alla pubblicazione di questa recensione sul sito.
                  </label>
                </div>
                {errors.consent ? (
                  <p id={`${consentId}-error`} className="text-sm text-primary">
                    {errors.consent}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Invio..." : "Invia recensione"}
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={closeDialog}
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Chiudi
            </button>
          )}
        </div>
      </dialog>
    </>
  );
}
