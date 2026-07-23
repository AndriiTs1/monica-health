import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="bg-surface py-16 sm:py-20 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading id="faq-heading" eyebrow="FAQ" title="Domande frequenti" />
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 lg:mx-0 lg:max-w-none">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-border bg-background p-5"
            >
              <summary className="cursor-pointer list-none text-base font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
