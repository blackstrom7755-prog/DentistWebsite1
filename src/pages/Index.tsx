import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import TechnologyGrid from "@/components/TechnologyGrid";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import TrustSections from "@/components/TrustSections";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import FloatingCallButton from "@/components/FloatingCallButton";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import FloatingBookButton from "@/components/FloatingBookButton";
import { RevealSection } from "@/hooks/useScrollReveal";

const Index = () => (
  <div className="bg-[#0a0a0a] text-white min-h-screen">
    <main>
      <Navbar />
      <HeroSection />
      <RevealSection>
        <ServicesSection />
      </RevealSection>
      <RevealSection>
        <TrustSections />
      </RevealSection>
      <RevealSection>
        <BeforeAfterSlider />
      </RevealSection>
      <RevealSection>
        <TechnologyGrid />
      </RevealSection>
      <RevealSection>
        <FAQSection />
      </RevealSection>
      <RevealSection>
        <ContactSection />
      </RevealSection>
      <RevealSection>
        <MapSection />
      </RevealSection>
      <Footer />
      <AIChatWidget />
      <FloatingCallButton />
      <FloatingWhatsAppButton />
      <FloatingBookButton />
    </main>
  </div>
);

export default Index;
