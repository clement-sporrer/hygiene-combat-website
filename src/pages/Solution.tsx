import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      <Header variant="light" />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-black">
                Notre solution d'hygiène
              </h1>
              <p className="text-xl text-muted-foreground">
                Biocide 3-en-1 professionnel pour tatamis, rings, machines et vestiaires.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-brand-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-brand-black text-center mb-16">
              Comment ça agit
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
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
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Surfaces */}
        <section className="py-20 bg-brand-black text-brand-white">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Pour quelles surfaces ?</h2>
                <p className="text-muted-foreground text-lg">
                  Notre solution est conçue pour tous les équipements et surfaces 
                  d'une salle de sport, en particulier les espaces à fort contact.
                </p>
                
                <ul className="grid grid-cols-2 gap-4 pt-4">
                  {surfaces.map((surface) => (
                    <li key={surface} className="flex items-center gap-2">
                      <CheckCircle2 className="text-primary flex-shrink-0" size={18} />
                      <span>{surface}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-brand-blue-dark/30 p-8 rounded-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Clock className="text-primary" size={32} />
                    <div>
                      <h4 className="font-semibold text-lg">Temps de contact</h4>
                      <p className="text-muted-foreground">5 minutes suffisent</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Droplets className="text-primary" size={32} />
                    <div>
                      <h4 className="font-semibold text-lg">Sans alcool</h4>
                      <p className="text-muted-foreground">Ne dessèche pas les surfaces</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <ShieldCheck className="text-primary" size={32} />
                    <div>
                      <h4 className="font-semibold text-lg">pH non acide</h4>
                      <p className="text-muted-foreground">Préserve les revêtements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mode d'emploi */}
        <section className="py-20 bg-brand-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-brand-black text-center mb-16">
              Mode d'emploi
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: "1", title: "Diluer", desc: "Mélanger à 5% dans l'eau (50ml pour 1L)" },
                  { step: "2", title: "Appliquer", desc: "Au pulvérisateur ou à la serpillière" },
                  { step: "3", title: "Laisser agir", desc: "5 minutes, puis surface prête" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-brand-black mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-brand-black text-center mb-16">
              Questions fréquentes
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-brand-white p-6 rounded-xl border border-border">
                  <h3 className="flex items-start gap-3 font-semibold text-brand-black mb-3">
                    <HelpCircle className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground pl-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-brand-black text-brand-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à améliorer l'hygiène de votre salle ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Demandez un devis personnalisé en fonction de la taille de votre salle 
              et de vos besoins.
            </p>
            <Link to="/devis" className="btn-primary inline-flex items-center gap-2">
              Demander un devis
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Solution;
