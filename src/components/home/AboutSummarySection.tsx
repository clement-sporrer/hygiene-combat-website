import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { Target, Heart, ArrowRight } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const AboutSummarySection = () => {
  const { useLightText } = useTheme();
  
  const textColor = useLightText ? "text-white" : "text-brand-black";
  const textMuted = useLightText ? "text-white/70" : "text-brand-black/70";

  return (
    <Section variant="dark" id="about-summary" fullScreen size="default">
      <div className="section-header">
        <h2 className={textColor}>À propos</h2>
        <p className={cn("text-lg content-block", textMuted)}>
          Une solution née du terrain, pour répondre à un vrai problème d'hygiène.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 grid-content max-w-5xl mx-auto mb-12 md:mb-16">
        <div className="space-y-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
            <Heart size={24} aria-hidden="true" />
          </div>
          <h3 className={cn("text-2xl md:text-3xl font-bold", textColor)}>
            L'origine
          </h3>
          <p className={cn("text-lg leading-relaxed", textMuted)}>
            Hygiène & Combat est né d'un constat simple : trop d'infections, 
            trop de surfaces mal entretenues, trop de produits inadaptés. 
            Un pratiquant de sports de combat a voulu changer ça.
          </p>
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
            <Target size={24} aria-hidden="true" />
          </div>
          <h3 className={cn("text-2xl md:text-3xl font-bold", textColor)}>
            Notre mission
          </h3>
          <p className={cn("text-lg leading-relaxed", textMuted)}>
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
      
      <ScrollArrow targetId="cta-section" variant={useLightText ? "dark" : "light"} />
    </Section>
  );
};

export default AboutSummarySection;
