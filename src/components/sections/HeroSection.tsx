import { HeartPulse, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PHONE_HREF, RCC } from "@/lib/constants";

const trustNotes = [
  "Riconosciuta da tutte le casse malati",
  "Assistenza nella regione di Lugano",
  "Contatto diretto e personale",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-8 sm:py-14 lg:py-24">
      <Container className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-1.5 text-sm font-semibold tracking-wide text-primary uppercase">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            Assistenza infermieristica a domicilio
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            Cure professionali, direttamente a casa tua.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Assistenza infermieristica personalizzata a domicilio, con
            attenzione, continuità e rispetto per ogni persona.
          </p>
          <div className="mx-auto flex w-full max-w-xs flex-col gap-3 sm:max-w-md sm:flex-row lg:mx-0 lg:w-auto lg:max-w-none">
            <ButtonLink
              href={PHONE_HREF}
              variant="primary"
              className="w-full sm:flex-1 lg:w-auto lg:flex-none"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Chiama Monica
            </ButtonLink>
            <ButtonLink
              href="#servizi"
              variant="secondary"
              className="w-full sm:flex-1 lg:w-auto lg:flex-none"
            >
              Scopri i servizi
            </ButtonLink>
          </div>
          <ul className="mt-4 flex flex-col gap-3 text-base text-muted">
            {trustNotes.map((note) => (
              <li key={note} className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
          <div
            className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_25%_20%,rgba(231,220,207,0.55),transparent_60%),radial-gradient(circle_at_80%_85%,rgba(47,74,63,0.10),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative flex w-full flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm lg:gap-6 lg:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <HeartPulse className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                RCC {RCC}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
              <span className="text-sm font-medium text-muted">
                Assistenza a domicilio
              </span>
              <span className="text-2xl font-semibold text-foreground">
                Cura, presenza, fiducia
              </span>
            </div>
            <div className="h-px w-full bg-border" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-4 text-sm text-muted">
              <div className="flex flex-col items-center gap-1 text-center lg:items-start lg:text-left">
                <span className="text-xs uppercase tracking-wide text-primary">
                  Zona
                </span>
                <span>Lugano</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center lg:items-start lg:text-left">
                <span className="text-xs uppercase tracking-wide text-primary">
                  Presenza
                </span>
                <span>Diretta</span>
              </div>
            </div>
            <div className="h-px w-full bg-border" aria-hidden="true" />
            <div className="flex items-center justify-center gap-2 text-center text-sm font-medium text-foreground lg:justify-start lg:text-left">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              Riconosciuta dalle casse malati
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
