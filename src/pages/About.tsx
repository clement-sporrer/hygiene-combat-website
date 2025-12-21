import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/button";
import { Target, Heart, MapPin, ArrowRight } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const About = () => {
  const { useLightText } = useTheme();
  
  const darkTextColor = useLightText ? "text-white" : "text-brand-black";
  const darkTextMuted = useLightText ? "text-white/70" : "text-brand-black/70";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="À Propos - Hygiène & Combat | Solution Hygiène Salle de Sport"
        description="Hygiène & Combat : solution d'hygiène professionnelle née du terrain pour les salles de sport de combat. Réduire les infections cutanées avec un produit adapté aux tatamis, rings et vestiaires."
        path="/a-propos"
        keywords="hygiène salle de sport, solution hygiène combat, produit hygiène professionnel, désinfectant salle sport combat"
      />
      <Header variant="light" />
      
      <main>
        {/* Hero */}
        <Section variant="dark" size="narrow" spacing="hero" className="flex items-center">
          <div className="hero-content">
            <h1 className={darkTextColor}>À propos</h1>
            <p className={cn("text-lg md:text-xl content-block", darkTextMuted)}>
              Une solution née du terrain, pour répondre à un vrai problème.
            </p>
          </div>
        </Section>

        {/* Bloc 1 : Origine, mission, philosophie */}
        <Section variant="light" id="origine-mission-philosophie" size="default">
          <div className="section-header">
            <h2 className="text-heading">Origine, mission et philosophie</h2>
          </div>
          
          <div className="grid md:grid-cols-2 grid-content mb-12 md:mb-16">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
                  <Heart size={24} aria-hidden="true" />
                </div>
                <h3 className="text-heading">L'origine</h3>
                <p className="text-lg text-muted-foreground content-block">
                  Hygiène & Combat est né d'un constat simple : trop d'infections, 
                  trop de surfaces mal entretenues, trop de produits inadaptés. 
                  Un pratiquant de sports de combat a voulu changer ça.
                </p>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
                  <Target size={24} aria-hidden="true" />
                </div>
                <h3 className="text-heading">Notre mission</h3>
                <p className="text-lg text-muted-foreground content-block">
                  Réduire les infections cutanées dans les clubs de sport de combat 
                  et améliorer les standards d'hygiène avec une solution simple, 
                  efficace et adaptée au terrain.
                </p>
              </div>
            </div>
            
            <div className="card p-8">
              <div className="section-header mb-8">
                <h3 className="text-heading">Notre philosophie</h3>
                <p className="text-lg text-muted-foreground content-block">
                  Les valeurs qui guident notre approche.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-tight">
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
                  <div key={value.title} className="text-center p-6">
                    <h4 className="text-xl font-semibold text-primary mb-3">
                      {value.title}
                    </h4>
                    <p className="text-base text-muted-foreground content-block">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
        </Section>

        {/* Bloc 2 : Distribution */}
        <Section variant="dark" id="distribution" size="narrow">
          <div className="section-header">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mx-auto">
              <MapPin size={24} aria-hidden="true" />
            </div>
            <h2 className={darkTextColor}>Distribution</h2>
            <p className={cn("text-lg content-block", darkTextMuted)}>
              Nous servons actuellement le marché francophone : France métropolitaine, Corse, Belgique. Livraison en 48h après facturation.
            </p>
            <p className={cn("text-sm", darkTextMuted)}>
              🇫🇷 Produit fabriqué en France
            </p>
          </div>
        </Section>

        {/* CTA */}
        <Section variant="light" id="cta-about" size="narrow">
          <div className="section-header">
            <h2 className="text-heading">Une question ? Un projet ?</h2>
            <p className="text-lg text-muted-foreground content-block">
              Nous sommes là pour vous accompagner dans l'amélioration de l'hygiène 
              de votre salle.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              className="btn-outline"
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

export default About;
