import Section from "@/components/layout/Section";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { Droplet, Calculator, Clock } from "lucide-react";

const EconomySection = () => {
  return (
    <Section variant="light" id="economie-usage" className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex flex-col justify-center relative">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto">
        {/* Left - Visual stats */}
        <div className="order-2 lg:order-1 animate-fade-in delay-200">
          <div className="bg-gradient-to-br from-muted to-background p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl border border-border">
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div className="text-center p-4 md:p-6 bg-brand-white rounded-xl shadow-sm">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                  5L
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Bidon concentré
                </p>
              </div>
              <div className="text-center p-4 md:p-6 bg-brand-white rounded-xl shadow-sm">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                  =
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  équivaut à
                </p>
              </div>
              <div className="col-span-2 text-center p-4 md:p-6 bg-primary/10 rounded-xl">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-2">
                  100L
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  de solution prête à l'emploi
                </p>
              </div>
            </div>
            
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border">
              <p className="text-center text-sm md:text-base text-muted-foreground leading-relaxed">
                Dilution à <span className="font-semibold text-brand-black">5%</span> = 
                économie maximale pour un usage quotidien
              </p>
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="order-1 lg:order-2 space-y-6 md:space-y-8 animate-fade-in">
          <div className="space-y-3 md:space-y-4">
            <span className="inline-block text-primary text-xs md:text-sm font-medium uppercase tracking-wider">
              Économique et simple
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-black leading-tight">
              Un produit concentré pour un usage quotidien économique
            </h2>
          </div>

          <div className="space-y-5 md:space-y-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Droplet className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-brand-black mb-1.5 text-sm md:text-base">
                  Produit concentré
                </h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Diluer à 5% dans l'eau pour obtenir une solution prête à l'emploi. 
                  Simple et économique.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-brand-black mb-1.5 text-sm md:text-base">
                  Usage quotidien
                </h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Utilisation possible tous les jours sans risque pour vos surfaces. 
                  Idéal pour les salles à forte fréquentation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calculator className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-brand-black mb-1.5 text-sm md:text-base">
                  Coût maîtrisé
                </h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
