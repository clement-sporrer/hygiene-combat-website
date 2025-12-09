import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { Target, Heart, ArrowRight } from "lucide-react";

const AboutSummarySection = () => {
  return (
    <Section variant="dark" id="about-summary" fullScreen className="relative overflow-x-hidden pb-20 sm:pb-16 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            À propos
          </h2>
          <p className="text-base sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Une solution née du terrain, pour répondre à un vrai problème d'hygiène.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 max-w-5xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <div className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 text-primary">
              <Heart size={24} className="md:w-7 md:h-7" />
            </div>
            <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold">
              L'origine
            </h3>
            <p className="text-lg md:text-lg text-muted-foreground leading-relaxed">
              Hygiène & Combat est né d'un constat simple : trop d'infections, 
              trop de surfaces mal entretenues, trop de produits inadaptés. 
              Un pratiquant de sports de combat a voulu changer ça.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 text-primary">
              <Target size={24} className="md:w-7 md:h-7" />
            </div>
            <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold">
              Notre mission
            </h3>
            <p className="text-lg md:text-lg text-muted-foreground leading-relaxed">
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
      </div>
      
      <ScrollArrow targetId="cta-section" variant="dark" />
    </Section>
  );
};

export default AboutSummarySection;

