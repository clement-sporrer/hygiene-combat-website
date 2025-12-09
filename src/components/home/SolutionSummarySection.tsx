import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { Sparkles, ShieldCheck, Wind, ArrowRight } from "lucide-react";

const SolutionSummarySection = () => {
  return (
    <Section variant="light" id="solution-summary" fullScreen className="relative overflow-x-hidden pb-20 sm:pb-16 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-3 sm:mb-4 leading-tight">
            Notre solution
          </h2>
          <p className="text-base sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Biocide 3-en-1 professionnel pour nettoyer, désinfecter et désodoriser vos équipements en 5 minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 lg:gap-8 max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
          {[
            {
              icon: Sparkles,
              title: "Nettoie",
              description: "Élimine saleté, sueur et résidus organiques en profondeur.",
            },
            {
              icon: ShieldCheck,
              title: "Désinfecte",
              description: "Détruit les microbes responsables des infections cutanées (bactéries, champignons, virus).",
            },
            {
              icon: Wind,
              title: "Désodorise",
              description: "Supprime les odeurs de transpiration et laisse un parfum frais d'eucalyptus.",
            },
          ].map((item) => (
            <div key={item.title} className="card-feature text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 text-primary mb-4 md:mb-6">
                <item.icon size={24} className="md:w-7 md:h-7" />
              </div>
              <h3 className="text-xl md:text-xl font-semibold text-brand-black mb-3">
                {item.title}
              </h3>
              <p className="text-base md:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asLink
            to="/solution"
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            Découvrir la solution
          </Button>
        </div>
      </div>
      
      <ScrollArrow targetId="about-summary" variant="light" />
    </Section>
  );
};

export default SolutionSummarySection;

