import Image from "next/image";
import { Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PHONE_HREF, RCC } from "@/lib/constants";

const trustNotes = ["Contatto diretto e personale"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-8 sm:py-14 lg:py-16 xl:py-24">
      <Container className="grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-12">
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

        <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-3 lg:mx-0 lg:max-w-none lg:items-start">
          <div className="relative aspect-[4/5] w-full max-w-[168px] overflow-hidden rounded-xl border border-border bg-surface sm:max-w-[240px] lg:max-w-[280px] xl:max-w-[320px]">
            <Image
              src="/images/monica.png"
              alt="Monica Ceruolo, infermiera indipendente"
              fill
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 640px) 240px, 168px"
              priority
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col items-center gap-1 text-center lg:items-start lg:text-left">
            <span className="text-lg font-semibold text-foreground">
              Monica Ceruolo
            </span>
            <span className="text-sm text-muted">
              Infermiera indipendente · RCC {RCC}
            </span>
            <span className="text-sm text-muted">
              Lugano · Assistenza a domicilio
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              Riconosciuta dalle casse malati
            </span>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted">
              Assistenza costruita sull’ascolto, sulla fiducia e sulla
              continuità delle cure.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
