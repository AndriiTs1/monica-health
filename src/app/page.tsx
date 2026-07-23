import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InsuranceSection } from "@/components/sections/InsuranceSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { StructuredData } from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <main id="contenuto" className="flex-1">
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <InsuranceSection />
        <ServiceAreaSection />
        <FaqSection />
        <ContactSection />
      </main>
    </>
  );
}
