import { MapPin, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADDRESS_LINE1, ADDRESS_LINE2 } from "@/lib/constants";

export function InsuranceAreaSection() {
  return (
    <section
      id="casse-malati"
      className="bg-surface py-10 sm:py-16 lg:py-20"
      aria-labelledby="casse-malati-heading"
    >
      <Container className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:gap-5 lg:text-left">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-primary">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <SectionHeading
            id="casse-malati-heading"
            title="Prestazioni riconosciute dalle casse malati"
            description="Monica Ceruolo è riconosciuta da tutte le casse malati. La copertura delle prestazioni dipende dalla prescrizione medica, dal tipo di intervento e dalle condizioni previste dall'assicurazione: per maggiori dettagli è consigliabile verificare con la propria cassa malati."
          />
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <dl>
              <dt className="text-sm font-medium text-muted">Zona di attività</dt>
              <dd className="text-base font-medium text-foreground">
                Figino, regione di Lugano e zone vicine
              </dd>
              <dd className="mt-1 text-sm text-muted">
                {ADDRESS_LINE1}, {ADDRESS_LINE2}
              </dd>
            </dl>
          </div>
        </div>

        <div className="relative mx-auto flex aspect-[4/3] w-full max-w-[240px] items-center justify-center rounded-xl border border-border bg-background p-6 sm:max-w-xs lg:mx-0 lg:max-w-none lg:p-8">
          <div
            className="absolute h-24 w-24 rounded-full border border-dashed border-primary/40"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-center gap-4 lg:gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-foreground">Figino</span>
            </div>
            <div className="h-8 w-px bg-border lg:h-10" aria-hidden="true" />
            <div className="flex flex-col items-center gap-1">
              <span
                className="h-3 w-3 rounded-full bg-accent ring-2 ring-primary/30"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-foreground">Lugano</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
