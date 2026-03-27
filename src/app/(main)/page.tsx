import HeroSection from "@/components/home/hero-section";
import ServicesPreview from "@/components/home/services-preview";
import AboutSection from "@/components/home/about-section";
import StatsSection from "@/components/home/stats-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CtaBanner from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <AboutSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
