import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-[16px] bg-surface py-10 sm:py-16 lg:scroll-mt-[32px] lg:py-20"
      aria-labelledby="faq-heading"
    >
      <Container className="flex flex-col gap-8 lg:gap-10">
        <SectionHeading id="faq-heading" eyebrow="FAQ" title="Domande frequenti" />
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 lg:mx-0 lg:max-w-none lg:gap-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-border bg-background p-4 lg:p-5"
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
