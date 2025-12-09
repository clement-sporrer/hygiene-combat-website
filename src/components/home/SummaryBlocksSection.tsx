import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { ArrowRight, Sparkles, Info, Mail } from "lucide-react";

const SummaryBlocksSection = () => {
  return (
    <Section variant="light" id="summary-blocks" fullScreen className="relative overflow-x-hidden pb-20 sm:pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* Bloc 1: Notre solution */}
          <div className="bg-card p-6 sm:p-7 md:p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 text-primary mb-4 sm:mb-5">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-brand-black mb-3 sm:mb-4">
              Notre solution
            </h3>
            <p className="text-base sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
              Biocide 3-en-1 professionnel pour nettoyer, désinfecter et désodoriser vos équipements en 5 minutes.
            </p>
            <Button
              asLink
              to="/solution"
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Découvrir
            </Button>
          </div>

          {/* Bloc 2: A propos */}
          <div className="bg-card p-6 sm:p-7 md:p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 text-primary mb-4 sm:mb-5">
              <Info size={24} />
            </div>
            <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-brand-black mb-3 sm:mb-4">
              À propos
            </h3>
            <p className="text-base sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
              Une solution née du terrain, pensée par les gens du combat pour répondre à un vrai problème d'hygiène.
            </p>
            <Button
              asLink
              to="/a-propos"
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              En savoir plus
            </Button>
          </div>

          {/* Bloc 3: Contact */}
          <div className="bg-card p-6 sm:p-7 md:p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 text-primary mb-4 sm:mb-5">
              <Mail size={24} />
            </div>
            <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-brand-black mb-3 sm:mb-4">
              Contact
            </h3>
            <p className="text-base sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
              Une question ? Besoin d'informations ? Nous sommes là pour vous aider et répondre à vos besoins.
            </p>
            <Button
              asLink
              to="/contact"
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
      
      <ScrollArrow targetId="cta-section" variant="light" />
    </Section>
  );
};

export default SummaryBlocksSection;

