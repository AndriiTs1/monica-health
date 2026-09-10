import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InsuranceAreaSection } from "@/components/sections/InsuranceAreaSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StructuredData } from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <main id="contenuto" className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <InsuranceAreaSection />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
      </main>
    </>
  );
}
