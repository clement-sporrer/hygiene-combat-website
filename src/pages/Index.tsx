import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import ClientLogos from "@/components/home/ClientLogos";
import BenefitsSection from "@/components/home/BenefitsSection";
import CombatSection from "@/components/home/CombatSection";
import EconomySection from "@/components/home/EconomySection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Hygiène & Combat | Solution d'hygiène pour salles de sport de combat"
        description="Biocide 3-en-1 professionnel pour tatamis, rings et vestiaires. Nettoie, désinfecte et désodorise en 5 minutes. Sans alcool, pH non acide. Fabriqué en France."
        path="/"
      />
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
