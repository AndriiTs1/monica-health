import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADDRESS_LINE1, ADDRESS_LINE2 } from "@/lib/constants";

export function ServiceAreaSection() {
  return (
    <section
      id="zona"
      className="py-16 sm:py-20 lg:py-24"
      aria-labelledby="zona-heading"
    >
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <SectionHeading
            id="zona-heading"
            eyebrow="Zona di attività"
            title="Assistenza infermieristica a domicilio nella regione di Lugano"
            description="Il servizio è rivolto alle persone che necessitano di cure infermieristiche a domicilio a Figino, nella regione di Lugano e nelle zone vicine del Canton Ticino."
          />
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <address className="text-sm text-muted not-italic">
              <p>{ADDRESS_LINE1}</p>
              <p>{ADDRESS_LINE2}</p>
            </address>
          </div>
        </div>

        <div className="relative flex aspect-[4/3] w-full items-center justify-center rounded-xl border border-border bg-surface p-8">
          <div
            className="absolute h-24 w-24 rounded-full border border-dashed border-primary/40"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-foreground">Figino</span>
            </div>
            <div className="h-10 w-px bg-border" aria-hidden="true" />
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
