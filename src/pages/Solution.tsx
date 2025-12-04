import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import { 
  Sparkles, ShieldCheck, Wind, CheckCircle2, 
  Droplets, Clock, HelpCircle, ArrowRight 
} from "lucide-react";

const surfaces = [
  "Tatamis (puzzle, vinyle, canvas)",
  "Rings de boxe",
  "Cages MMA",
  "Sols de musculation",
  "Zones de cross training",
  "Vestiaires et douches",
  "Bancs et équipements",
  "Machines de fitness",
];

const faqs = [
  {
    question: "Est-ce que ça rend le sol glissant ?",
    answer: "Non, notre formule ne laisse aucun résidu glissant. Les surfaces restent sûres pour l'entraînement immédiatement après séchage.",
  },
  {
    question: "Est-ce compatible avec tous les types de tatamis ?",
    answer: "Oui, le produit est compatible avec tous types de surfaces : tatamis puzzle, vinyle, canvas, parquet, sols synthétiques. Le pH non acide préserve les revêtements.",
  },
  {
    question: "Faut-il rincer après application ?",
    answer: "Non, aucun rinçage nécessaire. Appliquez, laissez agir 5 minutes, et la surface est prête à l'usage.",
  },
  {
    question: "Peut-on l'utiliser tous les jours ?",
    answer: "Absolument. La formule sans alcool permet un usage quotidien sans abîmer les surfaces ni les assécher.",
  },
  {
    question: "Existe-t-il des échantillons ?",
    answer: "Nous ne proposons pas d'échantillons, mais le bidon de 5L permet de tester le produit à grande échelle sur votre salle.",
  },
];

const Solution = () => {
  return (
    <div className="min-h-screen bg-brand-white">
      <SEO
        title="Notre solution d'hygiène | Hygiène & Combat"
        description="Découvrez notre biocide 3-en-1 professionnel : nettoyage, désinfection et désodorisation en 5 minutes. Compatible avec tous types de surfaces (tatamis, rings, machines)."
        path="/solution"
      />
      <Header variant="light" />
      
      <main className="pt-20">
        {/* Hero */}
        <Section variant="muted" className="py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black">
              Notre solution d'hygiène
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Biocide 3-en-1 professionnel pour tatamis, rings, machines et vestiaires.
            </p>
          </div>
        </Section>

        {/* How it works */}
        <Section variant="light" id="comment-ca-agit">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-black mb-4 md:mb-6">
              Comment ça agit
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Trois actions en une seule solution pour un nettoyage complet.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Sparkles,
                title: "Nettoie",
                description: "Élimine saleté, sueur et résidus organiques en profondeur.",
              },
              {
                icon: ShieldCheck,
                title: "Désinfecte",
                description: "Détruit les microbes responsables des infections cutanées (bactéries, champignons, virus).",
              },
              {
                icon: Wind,
                title: "Désodorise",
                description: "Supprime les odeurs de transpiration et laisse un parfum frais d'eucalyptus.",
              },
            ].map((item) => (
              <div key={item.title} className="card-feature text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 text-primary mb-4 md:mb-6">
                  <item.icon size={24} className="md:w-7 md:h-7" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-brand-black mb-3">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Surfaces */}
        <Section variant="dark" id="sur-quelles-surfaces">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Sur quelles surfaces ?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Notre solution est conçue pour tous les équipements et surfaces 
                d'une salle de sport, en particulier les espaces à fort contact.
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-3 md:gap-4 pt-4">
                {surfaces.map((surface) => (
                  <li key={surface} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-sm md:text-base leading-relaxed">{surface}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-brand-blue-dark/30 p-6 md:p-8 rounded-2xl">
              <div className="space-y-5 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <Clock className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-1">Temps de contact</h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      5 minutes suffisent
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <Droplets className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-1">Sans alcool</h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Ne dessèche pas les surfaces
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <ShieldCheck className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-1">pH non acide</h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Préserve les revêtements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Mode d'emploi */}
        <Section variant="light" id="mode-emploi">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-black mb-4 md:mb-6">
              Comment l'utiliser
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Un mode d'emploi simple en 3 étapes.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { step: "1", title: "Diluer", desc: "Mélanger à 5% dans l'eau (50ml pour 1L)" },
                { step: "2", title: "Appliquer", desc: "Au pulvérisateur ou à la serpillière" },
                { step: "3", title: "Laisser agir", desc: "5 minutes, puis surface prête" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground text-xl md:text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-brand-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section variant="muted" id="questions-frequentes">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-black mb-4 md:mb-6">
              Questions fréquentes
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Les questions que se posent souvent les gérants de salles.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-brand-white p-5 md:p-6 rounded-xl border border-border">
                <h3 className="flex items-start gap-3 font-semibold text-brand-black mb-3 text-base md:text-lg">
                  <HelpCircle className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  {faq.question}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground pl-8 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section variant="dark">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Prêt à améliorer l'hygiène de votre salle ?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Demandez un devis personnalisé en fonction de la taille de votre salle 
              et de vos besoins.
            </p>
            <Button
              asLink
              to="/devis"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              Demander un devis
            </Button>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default Solution;
