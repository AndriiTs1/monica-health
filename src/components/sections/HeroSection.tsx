import Image from "next/image";
import { ArrowRight, Mail, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EMAIL_HREF, PHONE_HREF, RCC } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-8 sm:py-14 lg:py-14 xl:py-24">
      <Container className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-stretch lg:gap-12">
        <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:justify-between lg:gap-2 lg:text-left xl:gap-6">
          {/* TOP GROUP */}
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:gap-2 lg:text-left xl:gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-1.5 text-sm font-semibold tracking-wide text-primary uppercase">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              Assistenza infermieristica a domicilio
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              Cure professionali, direttamente a casa tua.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted">
              Assistenza infermieristica personalizzata a domicilio, con
              attenzione, continuità e rispetto per ogni persona.
            </p>
          </div>

          {/* Mobile/tablet CTA: direct call is the strongest action here —
              the header's own contact button only appears at lg+, so on
              small screens this is the only always-visible phone action.
              Unchanged from the previous approved layout. */}
          <div className="mx-auto flex w-full max-w-xs flex-col gap-3 sm:max-w-md sm:flex-row lg:hidden">
            <ButtonLink
              href={PHONE_HREF}
              variant="primary"
              className="w-full sm:flex-1"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Chiama Monica
            </ButtonLink>
            <ButtonLink
              href={EMAIL_HREF}
              variant="secondary"
              className="w-full sm:flex-1"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Scrivi un’email
            </ButtonLink>
          </div>

          {/* MIDDLE / ACTION GROUP — desktop only. Two real actions (call,
              email — the header covers WhatsApp separately) plus a light
              tertiary link to Services, not a third identical button. */}
          <div className="hidden lg:flex lg:flex-col lg:items-start lg:gap-1.5 xl:gap-3">
            <div className="flex gap-3">
              <ButtonLink
                href={PHONE_HREF}
                variant="primary"
                className="lg:w-auto lg:flex-none"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Chiama Monica
              </ButtonLink>
              <ButtonLink
                href={EMAIL_HREF}
                variant="secondary"
                className="lg:w-auto lg:flex-none"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Scrivi un’email
              </ButtonLink>
            </div>
            <a
              href="#servizi"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary transition-colors hover:text-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Scopri i servizi
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* BOTTOM GROUP — desktop-only compact credentials area. A third
              flex child alongside TOP and MIDDLE under the column's own
              justify-between, so the leftover vertical space (column
              stretched to the photo's height) splits into two moderate
              gaps instead of one large one, while this block's own foot
              still lands flush with the photo's bottom edge. */}
          <div className="hidden lg:flex lg:w-full lg:flex-col lg:items-start lg:gap-1 lg:text-left">
            <span className="text-base font-semibold text-foreground">
              Monica Ceruolo
            </span>
            <span className="text-sm text-muted">
              Infermiera indipendente · RCC {RCC} · Lugano
            </span>
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                Riconosciuta dalle casse malati
              </span>
              <span className="text-muted" aria-hidden="true">
                ·
              </span>
              <span className="text-muted">Contatto diretto e personale</span>
            </span>
          </div>
        </div>

        <div className="-mt-3 mx-auto flex w-full max-w-xs flex-col items-center gap-3 sm:mt-0 lg:mx-0 lg:max-w-none lg:items-end">
          <div className="relative aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-xl border border-border bg-surface sm:max-w-[288px] lg:max-w-[332px] xl:max-w-[376px]">
            <Image
              src="/images/monica.png"
              alt="Monica Ceruolo, infermiera indipendente"
              fill
              sizes="(min-width: 1280px) 376px, (min-width: 1024px) 332px, (min-width: 640px) 288px, 200px"
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Mobile/tablet-only identity caption near the photo. Desktop
              hides this — the same information lives in the credentials
              block on the left instead. */}
          <div className="flex flex-col items-center gap-1 text-center lg:hidden">
            <span className="text-lg font-semibold text-foreground">
              Monica Ceruolo
            </span>
            <span className="text-sm text-muted">
              Infermiera indipendente · RCC {RCC} · Lugano
            </span>
            <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              Riconosciuta dalle casse malati
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
