import { HeartHandshake, House, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const trustItems = [
  { icon: ShieldCheck, label: "Riconosciuta dalle casse malati" },
  { icon: House, label: "Assistenza professionale a domicilio" },
  { icon: HeartHandshake, label: "Presenza diretta e continuità nelle cure" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-surface" aria-label="Punti di fiducia">
      <Container className="grid gap-8 py-10 sm:grid-cols-3 sm:gap-6 lg:py-8">
        {trustItems.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-center lg:gap-3 lg:text-left"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-foreground">{label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}
