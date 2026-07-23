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
      <Container className="flex flex-col items-center gap-6 py-12 text-center text-sm text-muted lg:items-start lg:text-left">
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-foreground">{NAME}</span>
          <span>{ROLE}</span>
        </div>
        <address className="flex flex-col gap-1 not-italic">
          <span>{ADDRESS_LINE1}</span>
          <span>{ADDRESS_LINE2}</span>
          <a
            href={PHONE_HREF}
            className="w-fit rounded-sm hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {PHONE}
          </a>
          <a
            href={EMAIL_HREF}
            className="w-fit rounded-sm hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {EMAIL}
          </a>
          <span>RCC {RCC}</span>
        </address>
        <div className="flex flex-col gap-2 border-t border-border pt-6 text-xs">
          <p>
            Le informazioni presenti sul sito non sostituiscono una valutazione
            medica.
          </p>
          <p>
            &copy; {year} {NAME}. Tutti i diritti riservati.
          </p>
        </div>
      </Container>
    </footer>
  );
}
