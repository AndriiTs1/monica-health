import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RCC } from "@/lib/constants";

const badges = ["Infermiera indipendente", `RCC ${RCC}`];

export function AboutSection() {
  return (
    <section
      id="chi-sono"
      className="bg-surface py-10 sm:py-16 lg:py-20"
      aria-labelledby="chi-sono-heading"
    >
      <Container className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="order-2 flex flex-col items-center gap-5 text-center lg:order-1 lg:items-start lg:gap-6 lg:text-left">
          <SectionHeading
            id="chi-sono-heading"
            eyebrow="Chi sono"
            title="Una presenza professionale, vicina e affidabile"
          />
          <p className="text-center text-base leading-relaxed text-muted lg:text-left">
            Mi chiamo Monica Ceruolo e lavoro come infermiera indipendente.
            Offro assistenza direttamente a domicilio, costruendo un rapporto
            basato sull’ascolto, sulla fiducia e sulla continuità delle cure.
          </p>
          <p className="text-center text-base leading-relaxed text-muted lg:text-left">
            Ogni intervento viene organizzato con attenzione alle condizioni
            della persona, alle indicazioni mediche e alle esigenze della
            famiglia.
          </p>
          <ul className="flex flex-wrap justify-center gap-3 lg:justify-start">
            {badges.map((badge) => (
              <li
                key={badge}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground"
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 mx-auto flex w-full max-w-[220px] items-center justify-center sm:max-w-sm lg:order-2">
          <div className="flex aspect-[4/5] w-full items-center justify-center rounded-xl border border-border bg-background">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
              MC
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
