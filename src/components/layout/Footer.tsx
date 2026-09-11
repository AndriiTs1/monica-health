import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  ADDRESS_LINE1,
  ADDRESS_LINE2,
  EMAIL,
  EMAIL_HREF,
  NAME,
  PHONE,
  PHONE_HREF,
  RCC,
} from "@/lib/constants";

const contactLinkClass =
  "inline-flex items-center gap-2 rounded-sm text-base text-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-8 py-10 lg:gap-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT — identity + plain contact information (no buttons) */}
          <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
            <div>
              <p className="text-xl font-semibold text-foreground">{NAME}</p>
              <p className="text-sm text-muted">
                Infermiera indipendente · RCC {RCC}
              </p>
            </div>
            <p className="max-w-sm text-base text-muted">
              Assistenza infermieristica a domicilio a Figino e nella regione
              di Lugano.
            </p>
            <div className="flex flex-col items-center gap-2 lg:items-start">
              <a href={PHONE_HREF} className={contactLinkClass}>
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {PHONE}
              </a>
              <a href={EMAIL_HREF} className={contactLinkClass}>
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {EMAIL}
              </a>
            </div>
          </div>

          {/* RIGHT — two typography-only groups, anchored to the same
              right edge as the Header/main container (not stretched full
              track width, so short lines don't read as floating/centered). */}
          <div className="flex w-full flex-col items-center gap-5 text-center lg:items-end lg:text-left">
            <div className="flex w-[325px] flex-col items-end gap-1.5 text-right">
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                Dove lavoro
              </span>
              <p className="flex w-fit items-start gap-2 text-right text-sm text-muted">
                <MapPin className="translate-x-8 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="flex flex-col">
                  <span className="block">Assistenza a domicilio a Figino,</span>
                  <span className="block">nella regione di Lugano e zone vicine.</span>
                </span>
              </p>
              <p className="flex justify-end gap-2 text-right text-sm font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                Riconosciuta dalle casse malati
              </p>
            </div>

            <div className="flex w-[325px] flex-col items-end gap-1.5 text-right">
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                Studio
              </span>
              <address className="text-base text-foreground not-italic">
                {ADDRESS_LINE1}
                <br />
                {ADDRESS_LINE2}
              </address>
            </div>
          </div>
        </div>

        <div className="border-t border-border/70 pt-5 text-center lg:text-left">
          <p className="text-sm font-medium text-muted">
            &copy; {year} {NAME}. Tutti i diritti riservati.
          </p>
        </div>
      </Container>
    </footer>
  );
}
