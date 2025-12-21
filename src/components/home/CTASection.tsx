import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import { ThemeVariant } from "@/lib/themeVariants";

interface CTASectionProps {
  themeVariant?: ThemeVariant;
}

const CTASection = ({ themeVariant }: CTASectionProps) => {
  return (
    <Section variant="light" id="cta-section" fullScreen size="narrow" className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue-dark rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center space-y-8 animate-fade-in">
        <div className="section-header">
          <h2>Parlez-nous de votre salle</h2>
          
          <p className="text-lg md:text-xl text-muted-foreground content-block">
            Chaque salle est différente. Contactez-nous pour une solution adaptée à votre 
            surface, votre fréquentation et vos besoins spécifiques.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asLink
            to="/devis"
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            Demander un devis
          </Button>
          <Button
            asLink
            to="/contact"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white"
            icon={MessageSquare}
            iconPosition="left"
          >
            Nous contacter
          </Button>
        </div>

        <div className="pt-8 flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span aria-hidden="true">✓</span>
            Réponse sous 24h
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true">✓</span>
            Livraison 48h
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true">✓</span>
            Fabriqué en France
          </span>
        </div>
      </div>
    </Section>
  );
};

export default CTASection;
