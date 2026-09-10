import Image from "next/image";
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
      <Container className="grid gap-6 lg:relative lg:grid-cols-2 lg:items-center lg:gap-x-12 lg:gap-y-6">
        <div className="lg:col-start-1 lg:row-start-1">
          <SectionHeading
            id="chi-sono-heading"
            eyebrow="Chi sono"
            title="Una presenza professionale, vicina e affidabile"
          />
        </div>

        {/*
          lg:absolute + lg:inset-0 deliberately takes this out of grid
          track sizing at desktop: without it, this item's row-span-2
          forces rows 1/2 to grow tall enough for the photo, which pushed
          the heading and text apart with a much bigger gap than
          lg:gap-y-6 actually specifies. Positioned this way, it still
          fills exactly the same col-start-2/row-span-2 area (that's what
          grid-column/grid-row still do for an absolutely positioned grid
          item), but no longer influences how tall rows 1 and 2 are.
        */}
        <div className="mx-auto flex w-full max-w-[220px] items-center justify-center sm:max-w-sm lg:absolute lg:inset-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-background">
            <Image
              src="/images/monica.png"
              alt="Monica Ceruolo, infermiera indipendente"
              fill
              sizes="(min-width: 640px) 384px, 220px"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 text-center lg:col-start-1 lg:row-start-2 lg:items-start lg:gap-6 lg:text-left">
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
      </Container>
    </section>
  );
}
