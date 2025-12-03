import { Link } from "react-router-dom";
import { AlertTriangle, Users, CheckCircle2 } from "lucide-react";

const CombatSection = () => {
  return (
    <section className="bg-brand-black text-brand-white py-20 md:py-28">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Pensé pour le combat
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Protégez vos adhérents des infections cutanées
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Dans les sports de combat, le contact peau à peau et le partage des surfaces 
                augmentent les risques d'infections. Un adhérent infecté, c'est plusieurs 
                semaines d'arrêt et une mauvaise image pour votre salle.
              </p>

              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 bg-brand-blue-dark/20 rounded-lg">
                  <AlertTriangle className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-brand-white mb-1">Risques courants</h4>
                    <p className="text-sm">
                      Herpès, teigne, impétigo, staphylocoque... Ces infections se propagent 
                      rapidement sur les surfaces mal entretenues.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-brand-blue-dark/20 rounded-lg">
                  <Users className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-brand-white mb-1">Rassurez vos pratiquants</h4>
                    <p className="text-sm">
                      Parents et adhérents veulent être sûrs que les tatamis sont propres. 
                      Une hygiène irréprochable renforce la confiance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/solution" className="btn-primary inline-flex items-center gap-2">
              En savoir plus
            </Link>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-brand-blue-dark to-secondary p-8 md:p-12 rounded-2xl">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Notre solution garantit :</h3>
                
                <ul className="space-y-4">
                  {[
                    "Désinfection conforme aux normes européennes",
                    "Action rapide en 5 minutes seulement",
                    "Sans alcool - n'abîme pas les surfaces",
                    "pH non acide - préserve les revêtements",
                    "Ne rend pas le sol glissant",
                    "Parfum eucalyptus agréable",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombatSection;
