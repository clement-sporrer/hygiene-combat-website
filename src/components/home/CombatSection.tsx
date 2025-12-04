import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { AlertTriangle, Users, CheckCircle2, ArrowRight } from "lucide-react";

const CombatSection = () => {
  return (
    <Section variant="dark" id="protegez-vos-adherents" fullScreen className="relative">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto">
        {/* Left - Content */}
        <div className="space-y-6 md:space-y-8 animate-fade-in">
          <div className="space-y-4">
            <span className="inline-block text-primary text-xs md:text-sm font-medium uppercase tracking-wider">
              Pensé pour le combat
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Protégez vos adhérents des infections cutanées
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Dans les sports de combat, le contact peau à peau et le partage des surfaces 
              augmentent les risques d'infections. Un adhérent infecté, c'est plusieurs 
              semaines d'arrêt et une mauvaise image pour votre salle.
            </p>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-brand-blue-dark/20 rounded-lg">
                <AlertTriangle className="text-primary flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-brand-white mb-1.5 text-sm md:text-base">
                    Risques courants
                  </h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Herpès, teigne, impétigo, staphylocoque... Ces infections se propagent 
                    rapidement sur les surfaces mal entretenues.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-brand-blue-dark/20 rounded-lg">
                <Users className="text-primary flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-brand-white mb-1.5 text-sm md:text-base">
                    Rassurez vos pratiquants
                  </h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Parents et adhérents veulent être sûrs que les tatamis sont propres. 
                    Une hygiène irréprochable renforce la confiance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            asLink
            to="/solution"
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
          >
            En savoir plus
          </Button>
        </div>

        {/* Right - Visual */}
        <div className="relative order-first lg:order-last animate-fade-in delay-200">
          <div className="bg-gradient-to-br from-brand-blue-dark to-secondary p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl">
            <div className="space-y-5 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold">
                Notre solution garantit :
              </h3>
              
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Désinfection conforme aux normes européennes",
                  "Action rapide en 5 minutes seulement",
                  "Sans alcool - n'abîme pas les surfaces",
                  "pH non acide - préserve les revêtements",
                  "Ne rend pas le sol glissant",
                  "Parfum eucalyptus agréable",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll arrow */}
      <ScrollArrow targetId="economie-usage" variant="dark" />
    </Section>
  );
};

export default CombatSection;
