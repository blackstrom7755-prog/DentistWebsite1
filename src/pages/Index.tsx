import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import TechnologyGrid from "@/components/TechnologyGrid";
import DoctorSection from "@/components/DoctorSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import FloatingCallButton from "@/components/FloatingCallButton";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { RevealSection } from "@/hooks/useScrollReveal";

const Index = () => (
  <main>
    <Navbar />
    <HeroSection />
    <RevealSection>
      <ServicesSection />
    </RevealSection>
    <RevealSection>
      <BeforeAfterSlider />
    </RevealSection>
    <RevealSection>
      <TechnologyGrid />
    </RevealSection>
    <RevealSection>
      <DoctorSection />
    </RevealSection>
    <RevealSection>
      <ReviewsSection />
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
  </main>
);

export default Index;
