import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhatsInForYouSection } from "@/components/sections/WhatsInForYouSection";
import { ExpectedOutcomesSection } from "@/components/sections/ExpectedOutcomesSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { CTASection } from "@/components/sections/CTASection";
import { RegulatoryLinksSection } from "@/components/sections/RegulatoryLinksSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <ServicesSection />
        <WhatsInForYouSection />
        <ExpectedOutcomesSection />
        <ApproachSection />
        <ClientsSection />
        <CTASection />
        <RegulatoryLinksSection />
      </main>
      <Footer />
    </div>
  );
}
