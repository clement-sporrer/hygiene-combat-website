import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { Target, Heart, ArrowRight } from "lucide-react";

const AboutSummarySection = () => {
  return (
    <Section variant="dark" id="about-summary" fullScreen size="default">
      <div className="section-header">
        <h2>À propos</h2>
        <p className="text-lg text-muted-foreground content-block">
          Une solution née du terrain, pour répondre à un vrai problème d'hygiène.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 grid-content max-w-5xl mx-auto mb-12 md:mb-16">
        <div className="space-y-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
            <Heart size={24} aria-hidden="true" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold">
            L'origine
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Hygiène & Combat est né d'un constat simple : trop d'infections, 
            trop de surfaces mal entretenues, trop de produits inadaptés. 
            Un pratiquant de sports de combat a voulu changer ça.
          </p>
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
            <Target size={24} aria-hidden="true" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold">
            Notre mission
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Réduire les infections cutanées dans les clubs de sport de combat 
            et améliorer les standards d'hygiène avec une solution simple, 
            efficace et adaptée au terrain.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Button
          asLink
          to="/a-propos"
          variant="primary"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          className="w-full sm:w-auto"
        >
          En savoir plus
        </Button>
      </div>
      
      <ScrollArrow targetId="cta-section" variant="dark" />
    </Section>
  );
};

export default AboutSummarySection;

