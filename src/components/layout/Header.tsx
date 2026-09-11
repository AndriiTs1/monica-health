import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { HomeLink } from "./HomeLink";
import { MobileMenu } from "./MobileMenu";
import { navigation } from "@/data/navigation";
import { PHONE, PHONE_HREF, WHATSAPP_HREF } from "@/lib/constants";

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
          {/* Medium soft green — deliberately its own shade (not an
              opacity of --primary, which read as washed-out grey-green),
              lighter/more alive than Hero's dark "Chiama Monica" but still
              squarely in the site's green-and-cream palette. Secondary
              contact channel, not a second identical primary button. */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#3f6b54] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#345c48] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <WhatsAppIcon className="h-[18px] w-[18px] shrink-0" />
            WhatsApp
          </a>
        </div>

        <MobileMenu navigation={navigation} phone={PHONE} phoneHref={PHONE_HREF} />
      </Container>
    </header>
  );
}
