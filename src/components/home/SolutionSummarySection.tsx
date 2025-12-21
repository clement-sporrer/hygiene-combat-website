import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { Sparkles, ShieldCheck, Wind, ArrowRight } from "lucide-react";

const SolutionSummarySection = () => {
  return (
    <Section variant="light" id="solution-summary" fullScreen size="default">
      <div className="section-header">
        <h2>Notre solution</h2>
        <p className="text-lg text-muted-foreground content-block">
          Biocide 3-en-1 professionnel pour nettoyer, désinfecter et désodoriser vos équipements en 5 minutes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-content max-w-6xl mx-auto mb-12 md:mb-16">
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
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
              <item.icon size={24} aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-brand-black mb-3">
              {item.title}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
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
      
      <ScrollArrow targetId="about-summary" variant="light" />
    </Section>
  );
};

export default SolutionSummarySection;

