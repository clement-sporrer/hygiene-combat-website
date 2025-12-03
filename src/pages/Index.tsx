import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ClientLogos from "@/components/home/ClientLogos";
import BenefitsSection from "@/components/home/BenefitsSection";
import CombatSection from "@/components/home/CombatSection";
import EconomySection from "@/components/home/EconomySection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header variant="dark" />
      <main>
        <HeroSection />
        <ClientLogos />
        <BenefitsSection />
        <CombatSection />
        <EconomySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
