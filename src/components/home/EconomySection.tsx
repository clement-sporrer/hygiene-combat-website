import Section from "@/components/layout/Section";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { Droplet, Calculator, Clock } from "lucide-react";

const EconomySection = () => {
  return (
    <Section variant="light" id="economie-usage" fullScreen className="relative">
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto w-full px-4 sm:px-6 -mt-8 sm:-mt-10 md:-mt-12">
        {/* Left - Visual stats */}
        <div className="order-2 lg:order-1 animate-fade-in delay-200">
          <div className="bg-gradient-to-br from-muted to-background p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl border border-border">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              <div className="text-center p-3 sm:p-4 md:p-6 bg-brand-white rounded-xl shadow-sm">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  5L
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Bidon concentré
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 md:p-6 bg-brand-white rounded-xl shadow-sm">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  =
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  équivaut à
                </p>
              </div>
              <div className="col-span-2 text-center p-4 sm:p-5 md:p-6 bg-primary/10 rounded-xl">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                  100L
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  de solution prête à l'emploi
                </p>
              </div>
            </div>
            
            <div className="mt-5 sm:mt-6 md:mt-8 pt-5 sm:pt-6 md:pt-8 border-t border-border">
              <p className="text-center text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed px-2">
                Dilution à <span className="font-semibold text-brand-black">5%</span> = 
                économie maximale pour un usage quotidien
              </p>
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="order-1 lg:order-2 space-y-5 sm:space-y-6 md:space-y-8 animate-fade-in">
          <div className="space-y-3 sm:space-y-4">
            <span className="inline-block text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">
              Économique et simple
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black leading-tight">
              Un produit concentré pour un usage quotidien économique
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Droplet className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-brand-black mb-1.5 text-sm sm:text-base">
                  Produit concentré
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Diluer à 5% dans l'eau pour obtenir une solution prête à l'emploi. 
                  Simple et économique.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-brand-black mb-1.5 text-sm sm:text-base">
                  Usage quotidien
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Utilisation possible tous les jours sans risque pour vos surfaces. 
                  Idéal pour les salles à forte fréquentation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calculator className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-brand-black mb-1.5 text-sm sm:text-base">
                  Coût maîtrisé
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Un bidon de 5L dure plusieurs semaines selon la taille de votre salle. 
                  Livraison en 48h France métropolitaine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll arrow */}
      <ScrollArrow targetId="cta-section" variant="light" />
    </Section>
  );
};

export default EconomySection;
