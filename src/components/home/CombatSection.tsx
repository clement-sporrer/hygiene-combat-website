import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { AlertTriangle, Users, CheckCircle2, ArrowRight } from "lucide-react";

const CombatSection = () => {
  return (
    <Section variant="dark" id="protegez-vos-adherents" fullScreen className="relative">
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start max-w-7xl mx-auto w-full px-4 sm:px-6 -mt-8 sm:-mt-12 md:-mt-16">
        {/* Left - Content (ordre logique) - Plus haut */}
        <div className="space-y-3 sm:space-y-4 md:space-y-5 animate-fade-in">
          <div className="space-y-2 sm:space-y-3">
            <span className="inline-block text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">
              Pensé pour le combat
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Protégez vos adhérents des infections cutanées
            </h2>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            Dans les sports, le contact peau à peau et le partage des surfaces 
            augmentent les risques d'infections. Un adhérent infecté, c'est plusieurs 
            semaines d'arrêt et une mauvaise image pour votre salle.
          </p>

          {/* Cards côte à côte sur desktop pour gagner de l'espace */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
            <div className="flex items-start gap-2 p-3 sm:p-4 bg-brand-blue-dark/20 rounded-md border border-brand-blue-dark/30">
              <AlertTriangle className="text-primary flex-shrink-0 mt-0.5" size={14} />
              <div>
                <h4 className="font-semibold text-brand-white mb-0.5 text-xs sm:text-sm">
                  Risques courants
                </h4>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                  Herpès, teigne, impétigo, staphylocoque... Ces infections se propagent 
                  rapidement sur les surfaces mal entretenues.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 sm:p-4 bg-brand-blue-dark/20 rounded-md border border-brand-blue-dark/30">
              <Users className="text-primary flex-shrink-0 mt-0.5" size={14} />
              <div>
                <h4 className="font-semibold text-brand-white mb-0.5 text-xs sm:text-sm">
                  Rassurez vos pratiquants
                </h4>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                  Parents et adhérents veulent être sûrs que les tatamis sont propres. 
                  Une hygiène irréprochable renforce la confiance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Solution garantit + bouton - Plus bas */}
        <div className="relative animate-fade-in delay-200 flex flex-col space-y-4 sm:space-y-5 pt-6 sm:pt-8 md:pt-10">
          <div className="bg-gradient-to-br from-brand-blue-dark to-secondary p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl shadow-lg border border-brand-blue-dark/20">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-brand-white mb-3 sm:mb-4">
              Notre solution garantit :
            </h3>
            
            <ul className="space-y-2.5 sm:space-y-3">
              {[
                "Désinfection conforme aux normes européennes",
                "Action rapide en 5 minutes seulement",
                "Sans alcool - n'abîme pas les surfaces",
                "pH non acide - préserve les revêtements",
                "Ne rend pas le sol glissant",
                "Parfum eucalyptus agréable",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-xs sm:text-sm leading-relaxed text-brand-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            asLink
            to="/solution"
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            className="min-h-[44px] w-full sm:w-auto"
          >
            En savoir plus
          </Button>
        </div>
      </div>
      
      {/* Scroll arrow */}
      <ScrollArrow targetId="economie-usage" variant="dark" />
    </Section>
  );
};

export default CombatSection;
