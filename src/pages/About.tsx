import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import { Target, Heart, MapPin, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-brand-white">
      <SEO
        title="À Propos - Hygiène & Combat | Solution Hygiène Salle de Sport"
        description="Hygiène & Combat : solution d'hygiène professionnelle née du terrain pour les salles de sport de combat. Réduire les infections cutanées avec un produit adapté aux tatamis, rings et vestiaires."
        path="/a-propos"
        keywords="hygiène salle de sport, solution hygiène combat, produit hygiène professionnel, désinfectant salle sport combat"
      />
      <Header variant="light" />
      
      <main>
        {/* Hero - Compact */}
        <Section variant="dark" className="relative py-12 sm:py-14 md:py-16 flex items-center">
          <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-4 w-full pt-16 md:pt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              À propos
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Une solution née du terrain, pour répondre à un vrai problème.
            </p>
          </div>
        </Section>

        {/* Bloc 1 : Origine, mission, philosophie */}
        <Section variant="light" id="origine-mission-philosophie" className="relative py-16 sm:py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-3 sm:mb-4">
                Origine, mission et philosophie
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mb-10 md:mb-12">
              <div className="space-y-4 md:space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 text-primary">
                  <Heart size={24} className="md:w-7 md:h-7" />
                </div>
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-brand-black">
                  L'origine
                </h3>
                <p className="text-lg md:text-lg text-muted-foreground leading-relaxed">
                  Hygiène & Combat est né d'un constat simple : trop d'infections, 
                  trop de surfaces mal entretenues, trop de produits inadaptés. 
                  Un pratiquant de sports de combat a voulu changer ça.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 text-primary">
                  <Target size={24} className="md:w-7 md:h-7" />
                </div>
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-brand-black">
                  Notre mission
                </h3>
                <p className="text-lg md:text-lg text-muted-foreground leading-relaxed">
                  Réduire les infections cutanées dans les clubs de sport de combat 
                  et améliorer les standards d'hygiène avec une solution simple, 
                  efficace et adaptée au terrain.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 p-6 sm:p-7 md:p-8 rounded-xl border border-border">
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-brand-black mb-3 md:mb-4">
                  Notre philosophie
                </h3>
                <p className="text-lg md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Les valeurs qui guident notre approche.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
                {[
                  {
                    title: "Simplicité",
                    desc: "Une seule solution claire plutôt qu'un catalogue confus de produits.",
                  },
                  {
                    title: "Efficacité",
                    desc: "Un produit qui fait vraiment ce qu'il promet, testé sur le terrain.",
                  },
                  {
                    title: "Transparence",
                    desc: "Pas de jargon marketing, on explique ce que fait le produit simplement.",
                  },
                ].map((value) => (
                  <div key={value.title} className="text-center p-5 md:p-6">
                    <h4 className="text-xl md:text-xl font-semibold text-primary mb-3">
                      {value.title}
                    </h4>
                    <p className="text-base md:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Bloc 2 : Distribution */}
        <Section variant="dark" id="distribution" className="relative py-16 sm:py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-4 md:space-y-5">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 text-primary mx-auto">
                <MapPin size={24} className="md:w-7 md:h-7" />
              </div>
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Distribution
              </h2>
              <p className="text-lg md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Nous servons actuellement le marché francophone : France métropolitaine, Corse, Belgique. Livraison en 48h après facturation.
              </p>
              <p className="text-sm md:text-base text-muted-foreground text-center mx-auto">
                🇫🇷 Produit fabriqué en France
              </p>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section variant="light" id="cta-about" className="relative py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-5 md:space-y-6 px-4 sm:px-6">
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-brand-black">
              Une question ? Un projet ?
            </h2>
            <p className="text-lg md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Nous sommes là pour vous accompagner dans l'amélioration de l'hygiène 
              de votre salle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                asLink
                to="/contact"
                variant="secondary"
                size="lg"
              >
                Nous contacter
              </Button>
              <Button
                asLink
                to="/devis"
                variant="outline"
                size="lg"
                className="border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white"
                icon={ArrowRight}
                iconPosition="right"
              >
                Demander un devis
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
