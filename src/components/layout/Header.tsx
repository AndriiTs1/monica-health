import Image from "next/image";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HomeLink } from "./HomeLink";
import { MobileMenu } from "./MobileMenu";
import { navigation } from "@/data/navigation";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container className="relative flex min-h-20 items-center justify-between gap-4">
        <HomeLink className="flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-11 shrink-0 rounded-md object-cover"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-foreground">
              Monica Ceruolo
            </span>
            <span className="text-xs text-muted">Infermiera indipendente</span>
          </span>
        </HomeLink>

        <nav aria-label="Navigazione principale" className="hidden lg:flex lg:items-center lg:gap-8">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-sm text-sm font-medium whitespace-nowrap text-foreground/80 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={PHONE_HREF} variant="primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Chiama ora
          </ButtonLink>
        </div>

        <MobileMenu navigation={navigation} phone={PHONE} phoneHref={PHONE_HREF} />
      </Container>
    </header>
  );
}
