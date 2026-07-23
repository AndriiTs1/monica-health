import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  ADDRESS_LINE1,
  ADDRESS_LINE2,
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
} from "@/lib/constants";

export function ContactSection() {
  return (
    <section
      id="contatti"
      className="py-16 sm:py-20 lg:py-24"
      aria-labelledby="contatti-heading"
    >
      <Container className="flex flex-col gap-10 lg:max-w-3xl">
        <SectionHeading
          id="contatti-heading"
          eyebrow="Contatti"
          title="Parliamo delle tue necessità"
          description="Per informazioni o per organizzare un primo contatto, puoi chiamare o scrivere direttamente a Monica."
        />
        <div className="mx-auto grid w-full max-w-md gap-6 sm:max-w-xl sm:grid-cols-2 lg:mx-0 lg:max-w-none">
          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <dl>
              <dt className="text-sm font-medium text-muted">Telefono</dt>
              <dd>
                <a
                  href={PHONE_HREF}
                  className="rounded-sm text-base font-medium text-foreground hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {PHONE}
                </a>
              </dd>
            </dl>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <dl>
              <dt className="text-sm font-medium text-muted">Email</dt>
              <dd>
                <a
                  href={EMAIL_HREF}
                  className="rounded-sm text-base font-medium text-foreground hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {EMAIL}
                </a>
              </dd>
            </dl>
          </div>
          <div className="flex items-start gap-3 sm:col-span-2">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <dl>
              <dt className="text-sm font-medium text-muted">Indirizzo</dt>
              <dd>
                <address className="text-base font-medium text-foreground not-italic">
                  {ADDRESS_LINE1}, {ADDRESS_LINE2}
                </address>
              </dd>
            </dl>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-xs flex-col gap-3 sm:max-w-2xl sm:flex-row lg:mx-0 lg:w-auto lg:max-w-none">
          <ButtonLink
            href={PHONE_HREF}
            variant="primary"
            className="w-full sm:flex-1 lg:w-auto lg:flex-none"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Chiama {PHONE}
          </ButtonLink>
          <ButtonLink
            href={EMAIL_HREF}
            variant="secondary"
            className="w-full sm:flex-1 lg:w-auto lg:flex-none"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Scrivi un’e-mail
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
