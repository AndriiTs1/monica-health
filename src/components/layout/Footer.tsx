import { MapPin, ShieldCheck } from "lucide-react";
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
  ROLE,
} from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-9 lg:py-10">
        <div className="grid gap-7 text-center text-sm text-muted sm:grid-cols-3 sm:gap-8 sm:text-left">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-base font-semibold text-foreground">
              {NAME}
            </span>
            <span>{ROLE}</span>
            <span>RCC {RCC}</span>
          </div>

          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-sm font-semibold text-foreground">
              Contatti
            </span>
            <a
              href={PHONE_HREF}
              className="rounded-sm hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {PHONE}
            </a>
            <a
              href={EMAIL_HREF}
              className="rounded-sm hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {EMAIL}
            </a>
            <address className="not-italic">
              {ADDRESS_LINE1}, {ADDRESS_LINE2}
            </address>
          </div>

          <div className="flex flex-col items-center gap-1.5 sm:items-start">
            <span className="text-sm font-semibold text-foreground">
              Assistenza
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              Riconosciuta dalle casse malati
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin
                className="h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              Figino · regione di Lugano e zone vicine
            </span>
          </div>
        </div>

        <div className="mt-7 flex flex-col items-center gap-2 border-t border-border pt-5 text-center text-xs text-muted sm:items-start sm:text-left">
          <p>
            La copertura delle prestazioni dipende dalla prescrizione medica,
            dal tipo di intervento e dalle condizioni previste
            dall&rsquo;assicurazione.
          </p>
          <p>
            Le informazioni presenti sul sito non sostituiscono una
            valutazione medica.
          </p>
          <p>
            &copy; {year} {NAME}. Tutti i diritti riservati.
          </p>
        </div>
      </Container>
    </footer>
  );
}
