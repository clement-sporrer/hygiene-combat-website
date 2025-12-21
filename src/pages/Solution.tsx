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
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

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
  const { useLightText } = useTheme();
  
  // Theme-aware text classes for dark sections
  const darkTextColor = useLightText ? "text-white" : "text-brand-black";
  const darkTextMuted = useLightText ? "text-white/70" : "text-brand-black/70";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Solution Désinfectant Tatami & Ring | Biocide 3-en-1 Professionnel"
        description="Biocide 3-en-1 pour salles de sport : nettoyage, désinfection et désodorisation en 5 minutes. Compatible tatamis puzzle, rings de boxe, cages MMA, sols musculation. Sans alcool, pH non acide."
        path="/solution"
        keywords="désinfectant tatami, désinfectant ring, biocide professionnel, nettoyant tatami puzzle, désinfectant cage MMA, solution hygiène vestiaire, biocide 3-en-1, désinfectant sol sportif"
      />
      <Header variant="light" />
      
      <main>
        {/* Hero */}
        <Section variant="dark" size="narrow" spacing="hero" className="flex items-center">
          <div className="hero-content">
            <h1 className={darkTextColor}>Notre solution d'hygiène</h1>
            <p className={cn("text-lg md:text-xl content-block", darkTextMuted)}>
              Biocide 3-en-1 professionnel pour tatamis, rings, machines et vestiaires.
            </p>
          </div>
        </Section>

        {/* 1. Bloc présentation du produit */}
        <Section variant="light" id="presentation-produit" size="wide">
          <div className="grid lg:grid-cols-3 grid-content items-center">
            <div className="space-y-6 order-2 lg:order-1 lg:col-span-2">
              <div className="space-y-4">
                <h2 className="text-heading">Produit 3-en-1</h2>
                <p className="text-lg text-muted-foreground content-block">
                  Une seule solution pour nettoyer, désinfecter et désodoriser vos équipements en 5 minutes.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 grid-tight pt-4">
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
                  <div 
                    key={item.title} 
                    className="card-interactive text-center p-6"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                      <item.icon size={24} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-heading mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image du produit - Image statique */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center lg:col-span-1">
              <div className="relative w-full max-w-xs">
                <img
                  src="/images/bidon_avant.PNG"
                  alt="Bidon 5L Hygiène & Combat - Biocide 3-en-1"
                  className="w-full h-auto rounded-2xl object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Bloc mode d'emploi */}
        <Section variant="dark" id="mode-emploi" size="default">
          <div className="section-header">
            <h2 className={darkTextColor}>Mode d'emploi</h2>
            <p className={cn("text-lg content-block", darkTextMuted)}>
              Un mode d'emploi simple en 3 étapes.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-content">
              {[
                { step: "1", title: "Diluer", desc: "Mélanger à 5% dans l'eau (50ml pour 1L)" },
                { step: "2", title: "Appliquer", desc: "Au pulvérisateur ou à la serpillière" },
                { step: "3", title: "Laisser agir", desc: "5 minutes, puis surface prête" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className={cn("text-xl font-semibold mb-2", darkTextColor)}>
                    {item.title}
                  </h3>
                  <p className={cn("text-base leading-relaxed max-w-xs mx-auto", darkTextMuted)}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 3. Bloc surfaces d'application */}
        <Section variant="light" id="surfaces-application" size="wide">
          <div className="grid lg:grid-cols-2 grid-content items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-heading">Surfaces d'application</h2>
                <p className="text-lg text-muted-foreground content-block">
                  Notre solution est conçue pour tous les équipements et surfaces 
                  d'une salle de sport, en particulier les espaces à fort contact.
                </p>
              </div>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 grid-tight pt-4">
                {surfaces.map((surface) => (
                  <li key={surface} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
                    <span className="text-base leading-relaxed">{surface}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="card p-8 order-1 lg:order-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="text-primary flex-shrink-0 mt-1" size={24} aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-heading">Temps de contact</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      5 minutes suffisent
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Droplets className="text-primary flex-shrink-0 mt-1" size={24} aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-heading">Sans alcool</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Ne dessèche pas les surfaces
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-primary flex-shrink-0 mt-1" size={24} aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-heading">pH non acide</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Préserve les revêtements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Bloc Économique et Simple */}
        <Section variant="dark" id="economique-simple" size="wide">
          <div className="grid lg:grid-cols-2 grid-content items-center">
            {/* Left - Visual stats */}
            <div className="order-2 lg:order-1 animate-fade-in delay-200">
              <div className="bg-secondary/30 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl border border-secondary/30">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  <div className="text-center p-3 sm:p-4 md:p-6 bg-secondary/40 rounded-xl shadow-sm">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                      5L
                    </div>
                    <p className={cn("text-xs sm:text-sm", darkTextMuted)}>
                      Bidon concentré
                    </p>
                  </div>
                  <div className="text-center p-3 sm:p-4 md:p-6 bg-secondary/40 rounded-xl shadow-sm">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                      =
                    </div>
                    <p className={cn("text-xs sm:text-sm", darkTextMuted)}>
                      équivaut à
                    </p>
                  </div>
                  <div className="col-span-2 text-center p-4 sm:p-5 md:p-6 bg-primary/10 rounded-xl">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                      100L
                    </div>
                    <p className={cn("text-sm sm:text-base", darkTextMuted)}>
                      de solution prête à l'emploi
                    </p>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 md:mt-8 pt-5 sm:pt-6 md:pt-8 border-t border-secondary/30">
                  <p className={cn("text-center text-xs sm:text-sm md:text-base leading-relaxed px-2", darkTextMuted)}>
                    Dilution à <span className="font-semibold">5%</span> = 
                    économie maximale pour un usage quotidien
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2 space-y-8 animate-fade-in">
              <div className="space-y-4">
                <span className="inline-block text-primary text-sm font-medium uppercase tracking-wider">
                  Économique et simple
                </span>
                <h2 className={cn("text-3xl md:text-4xl lg:text-5xl font-bold", darkTextColor)}>
                  Un produit concentré pour un usage quotidien économique
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Droplet className="text-primary" size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className={cn("font-semibold mb-2 text-base", darkTextColor)}>
                      Produit concentré
                    </h4>
                    <p className={cn("text-base leading-relaxed", darkTextMuted)}>
                      Diluer à 5% dans l'eau pour obtenir une solution prête à l'emploi. 
                      Simple et économique.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary" size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className={cn("font-semibold mb-2 text-base", darkTextColor)}>
                      Usage quotidien
                    </h4>
                    <p className={cn("text-base leading-relaxed", darkTextMuted)}>
                      Utilisation possible tous les jours sans risque pour vos surfaces. 
                      Idéal pour les salles à forte fréquentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calculator className="text-primary" size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className={cn("font-semibold mb-2 text-base", darkTextColor)}>
                      Coût maîtrisé
                    </h4>
                    <p className={cn("text-base leading-relaxed", darkTextMuted)}>
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
        <Section variant="light" id="questions-frequentes" size="narrow">
          <div className="section-header">
            <h2 className="text-heading">Questions fréquentes</h2>
            <p className="text-lg text-muted-foreground content-block">
              Les questions que se posent souvent les gérants de salles.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="card p-6 md:p-8">
                <h3 className="flex items-start gap-3 font-semibold text-heading mb-4 text-lg md:text-xl">
                  <HelpCircle className="text-primary flex-shrink-0 mt-0.5" size={22} aria-hidden="true" />
                  {faq.question}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground pl-9 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. CTA final */}
        <Section variant="dark" id="cta-final" size="narrow">
          <div className="section-header">
            <h2 className={darkTextColor}>Prêt à améliorer l'hygiène de votre salle ?</h2>
            <p className={cn("text-lg content-block", darkTextMuted)}>
              Demandez un devis personnalisé en fonction de la taille de votre salle 
              et de vos besoins.
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              asLink
              to="/devis"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto btn-cta"
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
