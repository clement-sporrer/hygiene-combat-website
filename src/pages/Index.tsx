import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import SolutionSummarySection from "@/components/home/SolutionSummarySection";
import AboutSummarySection from "@/components/home/AboutSummarySection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  useEffect(() => {
    // Add scroll snap class to html element
    document.documentElement.classList.add("home-page");
    
    return () => {
      // Remove class when component unmounts
      document.documentElement.classList.remove("home-page");
    };
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Désinfectant Salle de Sport & Tatami | Hygiène & Combat - Biocide 3-en-1"
        description="Solution d'hygiène professionnelle pour salles de sport de combat. Désinfectant tatami, ring et vestiaires. Nettoie, désinfecte et désodorise en 5 minutes. Sans alcool, pH non acide. Fabriqué en France."
        path="/"
        keywords="désinfectant salle de sport, désinfectant tatami, nettoyant sports de combat, solution hygiène salle de sport, désinfectant ring, biocide tatami, nettoyant MMA, produit hygiène combat, désinfection ring boxe, désinfectant parquet sportif"
      />
      <Header variant="dark" />
      <main>
        <HeroSection />
        <SolutionSummarySection />
        <AboutSummarySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
