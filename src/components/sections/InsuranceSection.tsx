import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InsuranceSection() {
  return (
    <section
      id="casse-malati"
      className="bg-surface py-16 sm:py-20 lg:py-24"
      aria-labelledby="casse-malati-heading"
    >
      <Container className="flex flex-col items-center gap-6 text-center lg:max-w-3xl lg:items-start lg:text-left">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-primary">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </span>
        <SectionHeading
          id="casse-malati-heading"
          title="Prestazioni riconosciute dalle casse malati"
          description="Monica Ceruolo è riconosciuta da tutte le casse malati. La copertura delle prestazioni dipende dalla prescrizione medica, dal tipo di intervento e dalle condizioni previste dall'assicurazione."
        />
        <p className="w-full max-w-xl rounded-lg border border-border bg-background p-4 text-left text-sm text-muted lg:max-w-2xl">
          Per informazioni precise sulla copertura, è consigliabile
          verificare la propria situazione con la cassa malati.
        </p>
      </Container>
    </section>
  );
}
