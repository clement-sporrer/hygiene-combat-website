import { Droplet, Calculator, Clock } from "lucide-react";

const EconomySection = () => {
  return (
    <section className="bg-brand-white py-20 md:py-28">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual stats */}
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-muted to-background p-8 md:p-12 rounded-2xl border border-border">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-6 bg-brand-white rounded-xl shadow-sm">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5L</div>
                  <p className="text-sm text-muted-foreground">Bidon concentré</p>
                </div>
                <div className="text-center p-6 bg-brand-white rounded-xl shadow-sm">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">=</div>
                  <p className="text-sm text-muted-foreground">équivaut à</p>
                </div>
                <div className="col-span-2 text-center p-6 bg-primary/10 rounded-xl">
                  <div className="text-5xl md:text-6xl font-bold text-primary mb-2">100L</div>
                  <p className="text-muted-foreground">de solution prête à l'emploi</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-center text-muted-foreground">
                  Dilution à <span className="font-semibold text-brand-black">5%</span> = 
                  économie maximale pour un usage quotidien
                </p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Économique et simple
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-black leading-tight">
                Un produit concentré pour un usage quotidien économique
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Droplet className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-black mb-1">Produit concentré</h4>
                  <p className="text-muted-foreground">
                    Diluer à 5% dans l'eau pour obtenir une solution prête à l'emploi. 
                    Simple et économique.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-black mb-1">Usage quotidien</h4>
                  <p className="text-muted-foreground">
                    Utilisation possible tous les jours sans risque pour vos surfaces. 
                    Idéal pour les salles à forte fréquentation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calculator className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-black mb-1">Coût maîtrisé</h4>
                  <p className="text-muted-foreground">
                    Un bidon de 5L dure plusieurs semaines selon la taille de votre salle. 
                    Livraison en 48h France métropolitaine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EconomySection;
