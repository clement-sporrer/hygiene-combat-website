import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import { 
  Sparkles, ShieldCheck, Wind, CheckCircle2, 
  Droplets, Clock, HelpCircle, ArrowRight,
  Calculator, Droplet
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
        title="Solution Désinfectant Tatami & Ring | Biocide 3-en-1 Professionnel"
        description="Biocide 3-en-1 pour salles de sport : nettoyage, désinfection et désodorisation en 5 minutes. Compatible tatamis puzzle, rings de boxe, cages MMA, sols musculation. Sans alcool, pH non acide."
        path="/solution"
        keywords="désinfectant tatami, désinfectant ring, biocide professionnel, nettoyant tatami puzzle, désinfectant cage MMA, solution hygiène vestiaire, biocide 3-en-1, désinfectant sol sportif"
      />
      <Header variant="light" />
      
      <main>
        {/* Hero - Compact */}
        <Section variant="dark" className="relative py-12 sm:py-14 md:py-16 flex items-center">
          <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-4 w-full pt-16 md:pt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Notre solution d'hygiène
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Biocide 3-en-1 professionnel pour tatamis, rings, machines et vestiaires.
            </p>
          </div>
        </Section>

        {/* 1. Bloc présentation du produit */}
        <Section variant="light" id="presentation-produit" className="relative overflow-x-hidden py-16 sm:py-20 md:py-24">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto w-full px-4 sm:px-6">
            <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1 lg:col-span-2">
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black leading-tight">
                Produit 3-en-1
              </h2>
              <p className="text-base sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Une seule solution pour nettoyer, désinfecter et désodoriser vos équipements en 5 minutes.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-4">
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
                  <div key={item.title} className="text-center p-4 bg-card rounded-lg border border-border">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 text-primary mb-3">
                      <item.icon size={20} className="md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-brand-black mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image du produit - utiliser la vidéo existante */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center lg:col-span-1">
              <div className="relative w-full max-w-xs">
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-glow">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label="Vidéo de présentation du biocide 3-en-1 Hygiène & Combat"
                    title="Biocide 3-en-1 Hygiène & Combat"
                  >
                    <source src="/videos/bidon h&c.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Bloc mode d'emploi */}
        <Section variant="dark" id="mode-emploi" className="relative overflow-x-hidden py-16 sm:py-20 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-4">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
              Mode d'emploi
            </h2>
            <p className="text-base sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Un mode d'emploi simple en 3 étapes.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {[
                { step: "1", title: "Diluer", desc: "Mélanger à 5% dans l'eau (50ml pour 1L)" },
                { step: "2", title: "Appliquer", desc: "Au pulvérisateur ou à la serpillière" },
                { step: "3", title: "Laisser agir", desc: "5 minutes, puis surface prête" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground text-xl md:text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl md:text-xl font-semibold text-brand-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 3. Bloc surfaces d'application */}
        <Section variant="light" id="surfaces-application" className="relative overflow-x-hidden py-16 sm:py-20 md:py-24">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto w-full px-4 sm:px-6">
            <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Surfaces d'application
              </h2>
              <p className="text-base sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Notre solution est conçue pour tous les équipements et surfaces 
                d'une salle de sport, en particulier les espaces à fort contact.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
                {surfaces.map((surface) => (
                  <li key={surface} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-base sm:text-base leading-relaxed">{surface}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-brand-blue-dark/30 p-5 sm:p-6 md:p-8 rounded-2xl order-1 lg:order-2">
              <div className="space-y-5 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <Clock className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg md:text-lg mb-1">Temps de contact</h4>
                    <p className="text-base md:text-base text-muted-foreground leading-relaxed">
                      5 minutes suffisent
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <Droplets className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg md:text-lg mb-1">Sans alcool</h4>
                    <p className="text-base md:text-base text-muted-foreground leading-relaxed">
                      Ne dessèche pas les surfaces
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <ShieldCheck className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg md:text-lg mb-1">pH non acide</h4>
                    <p className="text-base md:text-base text-muted-foreground leading-relaxed">
                      Préserve les revêtements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Bloc Économique et Simple */}
        <Section variant="dark" id="economique-simple" className="relative overflow-x-hidden py-16 sm:py-20 md:py-24">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto w-full px-4 sm:px-6">
            {/* Left - Visual stats */}
            <div className="order-2 lg:order-1 animate-fade-in delay-200">
              <div className="bg-gradient-to-br from-brand-blue-dark/30 to-brand-blue-dark/20 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl border border-brand-blue-dark/30">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  <div className="text-center p-3 sm:p-4 md:p-6 bg-brand-blue-dark/40 rounded-xl shadow-sm">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                      5L
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Bidon concentré
                    </p>
                  </div>
                  <div className="text-center p-3 sm:p-4 md:p-6 bg-brand-blue-dark/40 rounded-xl shadow-sm">
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
                
                <div className="mt-5 sm:mt-6 md:mt-8 pt-5 sm:pt-6 md:pt-8 border-t border-brand-blue-dark/30">
                  <p className="text-center text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed px-2">
                    Dilution à <span className="font-semibold">5%</span> = 
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
                <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Un produit concentré pour un usage quotidien économique
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Droplet className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1.5 text-base sm:text-base">
                      Produit concentré
                    </h4>
                    <p className="text-base sm:text-base text-muted-foreground leading-relaxed">
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
                    <h4 className="font-semibold mb-1.5 text-base sm:text-base">
                      Usage quotidien
                    </h4>
                    <p className="text-base sm:text-base text-muted-foreground leading-relaxed">
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
                    <h4 className="font-semibold mb-1.5 text-base sm:text-base">
                      Coût maîtrisé
                    </h4>
                    <p className="text-base sm:text-base text-muted-foreground leading-relaxed">
                      Un bidon de 5L dure plusieurs semaines selon la taille de votre salle. 
                      Livraison en 48h France métropolitaine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. Bloc Questions fréquentes */}
        <Section variant="light" id="questions-frequentes" className="relative py-16 sm:py-20 md:py-24 overflow-x-hidden">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-4">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-3 sm:mb-4 leading-tight">
              Questions fréquentes
            </h2>
            <p className="text-base sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              Les questions que se posent souvent les gérants de salles.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-brand-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="flex items-start gap-3 font-semibold text-brand-black mb-3 sm:mb-4 text-lg sm:text-lg md:text-xl">
                  <HelpCircle className="text-primary flex-shrink-0 mt-0.5" size={22} />
                  {faq.question}
                </h3>
                <p className="text-base sm:text-base md:text-lg text-muted-foreground pl-9 sm:pl-10 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. CTA final */}
        <Section variant="dark" id="cta-final" className="relative overflow-x-hidden py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6 md:space-y-8 px-4 sm:px-6">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Prêt à améliorer l'hygiène de votre salle ?
            </h2>
            <p className="text-base sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
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
              className="w-full sm:w-auto"
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
