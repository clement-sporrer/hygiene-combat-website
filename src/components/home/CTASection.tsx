import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { ArrowRight, MessageSquare } from "lucide-react";

const CTASection = () => {
  return (
    <Section variant="dark" id="cta-section" fullScreen className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue-dark rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center px-4 sm:px-6 -mt-8 sm:-mt-10 md:-mt-12">
        <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 animate-fade-in w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Parlez-nous de votre salle
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Chaque salle est différente. Contactez-nous pour une solution adaptée à votre 
            surface, votre fréquentation et vos besoins spécifiques.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
            <Button
              asLink
              to="/devis"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="min-h-[44px]"
            >
              Demander un devis
            </Button>
            <Button
              asLink
              to="/contact"
              variant="outline"
              size="lg"
              className="border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black min-h-[44px]"
              icon={MessageSquare}
              iconPosition="left"
            >
              Nous contacter
            </Button>
          </div>

          <div className="pt-5 sm:pt-6 md:pt-8 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              ✓ Réponse sous 24h
            </span>
            <span className="flex items-center gap-2">
              ✓ Livraison 48h
            </span>
            <span className="flex items-center gap-2">
              ✓ Fabriqué en France
            </span>
          </div>
        </div>
      </div>

      {/* Scroll arrow (optional on last section but good for consistency if footer is considered next "step") */}
      {/* Usually last section doesn't need arrow to footer, but request says "TOUTES les sections" */}
      <ScrollArrow className="hidden md:flex" /> 
    </Section>
  );
};

export default CTASection;
