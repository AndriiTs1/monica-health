import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export function ProcessSection() {
  return (
    <section
      id="come-funziona"
      className="scroll-mt-[16px] py-10 sm:py-16 lg:scroll-mt-[32px] lg:py-20"
      aria-labelledby="come-funziona-heading"
    >
      <Container className="flex flex-col gap-8 lg:gap-10">
        <SectionHeading
          id="come-funziona-heading"
          eyebrow="Come funziona"
          title="Ricevere assistenza è semplice"
        />
        <ol className="grid gap-5 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {processSteps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-5 text-center transition-colors hover:border-primary/40 lg:items-start lg:p-6 lg:text-left"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
