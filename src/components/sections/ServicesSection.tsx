import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section
      id="servizi"
      className="py-10 sm:py-16 lg:py-20"
      aria-labelledby="servizi-heading"
    >
      <Container className="flex flex-col gap-8 lg:gap-10">
        <SectionHeading
          id="servizi-heading"
          eyebrow="Servizi"
          title="Assistenza pensata per le esigenze di ogni giorno"
          description="Un supporto professionale e umano per favorire sicurezza, autonomia e serenità nella propria casa."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        <p className="mx-auto max-w-xl text-center text-sm text-muted lg:mx-0 lg:max-w-none lg:text-left">
          Le prestazioni vengono definite in base alle necessità della persona
          e alle indicazioni del medico.
        </p>
      </Container>
    </section>
  );
}
