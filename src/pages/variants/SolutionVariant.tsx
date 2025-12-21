/**
 * SolutionVariant - Solution page with Theme Variants
 * Renders the solution page with different color schemes
 */

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
import { ThemeVariant, getThemeConfig, shouldUseLightText } from "@/lib/themeVariants";
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

interface SolutionVariantProps {
  variant: ThemeVariant;
}

const SolutionVariant = ({ variant }: SolutionVariantProps) => {
  const theme = getThemeConfig(variant);
  const useLightText = shouldUseLightText(variant);

  // Get background styles for dark sections
  const getDarkSectionStyle = () => {
    if (variant === 'gradient-clair-fonce') {
      return { background: 'linear-gradient(to bottom, #87a6bb, #384a54)' };
    }
    if (variant === 'gradient-fonce-clair') {
      return { background: 'linear-gradient(to bottom, #384a54, #87a6bb)' };
    }
    return {};
  };

  const getDarkSectionClass = () => {
    if (variant === 'noir') return 'bg-brand-black text-brand-white';
    if (variant === 'bleu-clair') return 'bg-[#87a6bb] text-brand-black';
    if (variant === 'bleu-fonce') return 'bg-[#384a54] text-brand-white';
    if (variant.startsWith('gradient')) return 'text-brand-white';
    return 'bg-brand-black text-brand-white';
  };

  const darkTextClass = useLightText ? 'text-brand-white' : 'text-brand-black';
  const darkMutedClass = useLightText ? 'text-white/70' : 'text-brand-black/70';

  return (
    <div className="min-h-screen bg-brand-white">
      <SEO
        title={`Solution - Variante ${theme.name} | Hygiène & Combat`}
        description="Biocide 3-en-1 pour salles de sport : nettoyage, désinfection et désodorisation en 5 minutes."
        path={`/solution-${variant}`}
      />
      <Header variant={useLightText ? "dark" : "light"} />
      
      <main>
        {/* Hero */}
        <section 
          className={cn(
            "py-16 sm:py-20 md:py-24 flex items-center",
            getDarkSectionClass()
          )}
          style={getDarkSectionStyle()}
        >
          <div className="container-narrow">
            <div className="hero-content">
              <h1 className={darkTextClass}>Notre solution d'hygiène</h1>
              <p className={cn("text-lg md:text-xl content-block", darkMutedClass)}>
                Biocide 3-en-1 professionnel pour tatamis, rings, machines et vestiaires.
              </p>
            </div>
          </div>
        </section>

        {/* 1. Bloc présentation du produit */}
        <Section variant="light" id="presentation-produit" size="wide">
          <div className="grid lg:grid-cols-3 grid-content items-center">
            <div className="space-y-6 order-2 lg:order-1 lg:col-span-2">
              <div className="space-y-4">
                <h2>Produit 3-en-1</h2>
                <p className="text-lg text-muted-foreground content-block">
                  Une seule solution pour nettoyer, désinfecter et désinfecter vos équipements en 5 minutes.
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
                    className="text-center p-6 card cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:shadow-md hover:border-primary/30"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                      <item.icon size={24} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-black mb-2">
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
        <section 
          className={cn(
            "py-16 sm:py-20 md:py-24 lg:py-32",
            getDarkSectionClass()
          )}
          style={getDarkSectionStyle()}
          id="mode-emploi"
        >
          <div className="container-content">
            <div className="section-header">
              <h2 className={darkTextClass}>Mode d'emploi</h2>
              <p className={cn("text-lg content-block", darkMutedClass)}>
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
                    <h3 className={cn("text-xl font-semibold mb-2", darkTextClass)}>
                      {item.title}
                    </h3>
                    <p className={cn("text-base leading-relaxed max-w-xs mx-auto", darkMutedClass)}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Bloc surfaces d'application */}
        <Section variant="light" id="surfaces-application" size="wide">
          <div className="grid lg:grid-cols-2 grid-content items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-4">
                <h2>Surfaces d'application</h2>
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
                    <h4 className="font-semibold text-lg mb-1">Temps de contact</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      5 minutes suffisent
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Droplets className="text-primary flex-shrink-0 mt-1" size={24} aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Sans alcool</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Ne dessèche pas les surfaces
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-primary flex-shrink-0 mt-1" size={24} aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">pH non acide</h4>
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
        <section 
          className={cn(
            "py-16 sm:py-20 md:py-24 lg:py-32",
            getDarkSectionClass()
          )}
          style={getDarkSectionStyle()}
          id="economique-simple"
        >
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 grid-content items-center">
              {/* Left - Visual stats */}
              <div className="order-2 lg:order-1 animate-fade-in delay-200">
                <div className={cn(
                  "p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl border",
                  useLightText 
                    ? "bg-gradient-to-br from-brand-blue-dark/30 to-brand-blue-dark/20 border-brand-blue-dark/30"
                    : "bg-white/20 border-white/30"
                )}>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    <div className={cn(
                      "text-center p-3 sm:p-4 md:p-6 rounded-xl shadow-sm",
                      useLightText ? "bg-brand-blue-dark/40" : "bg-white/30"
                    )}>
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                        5L
                      </div>
                      <p className={cn("text-xs sm:text-sm", darkMutedClass)}>
                        Bidon concentré
                      </p>
                    </div>
                    <div className={cn(
                      "text-center p-3 sm:p-4 md:p-6 rounded-xl shadow-sm",
                      useLightText ? "bg-brand-blue-dark/40" : "bg-white/30"
                    )}>
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                        =
                      </div>
                      <p className={cn("text-xs sm:text-sm", darkMutedClass)}>
                        équivaut à
                      </p>
                    </div>
                    <div className="col-span-2 text-center p-4 sm:p-5 md:p-6 bg-primary/10 rounded-xl">
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                        100L
                      </div>
                      <p className={cn("text-sm sm:text-base", darkMutedClass)}>
                        de solution prête à l'emploi
                      </p>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "mt-5 sm:mt-6 md:mt-8 pt-5 sm:pt-6 md:pt-8 border-t",
                    useLightText ? "border-brand-blue-dark/30" : "border-white/30"
                  )}>
                    <p className={cn("text-center text-xs sm:text-sm md:text-base leading-relaxed px-2", darkMutedClass)}>
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
                  <h2 className={cn("text-3xl md:text-4xl lg:text-5xl font-bold", darkTextClass)}>
                    Un produit concentré pour un usage quotidien économique
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Droplet className="text-primary" size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className={cn("font-semibold mb-2 text-base", darkTextClass)}>
                        Produit concentré
                      </h4>
                      <p className={cn("text-base leading-relaxed", darkMutedClass)}>
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
                      <h4 className={cn("font-semibold mb-2 text-base", darkTextClass)}>
                        Usage quotidien
                      </h4>
                      <p className={cn("text-base leading-relaxed", darkMutedClass)}>
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
                      <h4 className={cn("font-semibold mb-2 text-base", darkTextClass)}>
                        Coût maîtrisé
                      </h4>
                      <p className={cn("text-base leading-relaxed", darkMutedClass)}>
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

        {/* 5. Bloc Questions fréquentes */}
        <Section variant="light" id="questions-frequentes" size="narrow">
          <div className="section-header">
            <h2>Questions fréquentes</h2>
            <p className="text-lg text-muted-foreground content-block">
              Les questions que se posent souvent les gérants de salles.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="card p-6 md:p-8">
                <h3 className="flex items-start gap-3 font-semibold text-brand-black mb-4 text-lg md:text-xl">
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
        <section 
          className={cn(
            "py-16 sm:py-20 md:py-24 lg:py-32",
            getDarkSectionClass()
          )}
          style={getDarkSectionStyle()}
          id="cta-final"
        >
          <div className="container-narrow">
            <div className="section-header">
              <h2 className={darkTextClass}>Prêt à améliorer l'hygiène de votre salle ?</h2>
              <p className={cn("text-lg content-block", darkMutedClass)}>
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
                className="w-full sm:w-auto"
              >
                Demander un devis
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SolutionVariant;

