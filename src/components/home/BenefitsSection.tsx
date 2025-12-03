import { Sparkles, ShieldCheck, Wind } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Nettoie en profondeur",
    description:
      "Élimine saleté, sueur et résidus pour des surfaces impeccables après chaque entraînement.",
  },
  {
    icon: ShieldCheck,
    title: "Désinfecte efficacement",
    description:
      "Détruit bactéries, champignons et virus responsables des infections cutanées (herpès, teigne, staphylocoque).",
  },
  {
    icon: Wind,
    title: "Supprime les odeurs",
    description:
      "Neutralise les mauvaises odeurs de transpiration et laisse un parfum frais d'eucalyptus.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="bg-brand-white py-20 md:py-28">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Une solution 3-en-1 complète
          </h2>
          <p className="text-lg text-muted-foreground">
            Un seul produit pour nettoyer, désinfecter et désodoriser vos équipements.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group card-feature text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <benefit.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-brand-black mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
