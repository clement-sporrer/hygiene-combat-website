/**
 * IndexVariant - Homepage with Theme Variants
 * Renders the homepage with different color schemes
 */

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SolutionSummarySection from "@/components/home/SolutionSummarySection";
import AboutSummarySection from "@/components/home/AboutSummarySection";
import CTASection from "@/components/home/CTASection";
import { ThemeVariant, getThemeConfig, shouldUseLightText } from "@/lib/themeVariants";
import HeroSectionVariant from "@/components/home/HeroSectionVariant";

interface IndexVariantProps {
  variant: ThemeVariant;
}

const IndexVariant = ({ variant }: IndexVariantProps) => {
  const theme = getThemeConfig(variant);
  const useLightText = shouldUseLightText(variant);

  useEffect(() => {
    document.documentElement.classList.add("home-page");
    return () => {
      document.documentElement.classList.remove("home-page");
    };
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title={`Accueil - Variante ${theme.name} | Hygiène & Combat`}
        description="Solution d'hygiène professionnelle pour salles de sport de combat."
        path={`/accueil-${variant}`}
      />
      <Header variant={useLightText ? "dark" : "light"} />
      <main>
        <HeroSectionVariant variant={variant} />
        <SolutionSummarySection themeVariant={variant} />
        <AboutSummarySection themeVariant={variant} />
        <CTASection themeVariant={variant} />
      </main>
      <Footer />
    </div>
  );
};

export default IndexVariant;

