import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Target, Heart, MapPin, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-brand-white">
      <SEO
        title="À propos | Hygiène & Combat"
        description="Hygiène & Combat est né d'un constat simple : trop d'infections, trop de surfaces mal entretenues. Une solution pensée par les gens du combat pour les gens du combat."
        path="/a-propos"
      />
      <Header variant="light" />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-black">
                À propos
              </h1>
              <p className="text-xl text-muted-foreground">
                Une solution née du terrain, pour répondre à un vrai problème.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-brand-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary">
                    <Target size={28} />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-black">Notre mission</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Réduire les infections cutanées dans les clubs de sport de combat 
                    et améliorer les standards d'hygiène avec une solution simple, 
                    efficace et adaptée au terrain.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary">
                    <Heart size={28} />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-black">L'origine</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Hygiène & Combat est né d'un constat simple : trop d'infections, 
                    trop de surfaces mal entretenues, trop de produits inadaptés. 
                    Un pratiquant de sports de combat a voulu changer ça.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-brand-black text-brand-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-16">Notre philosophie</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
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
                    <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Zone */}
        <section className="py-20 bg-brand-white">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto">
                <MapPin size={28} />
              </div>
              <h2 className="text-3xl font-bold text-brand-black">Zone de distribution</h2>
              <p className="text-muted-foreground text-lg">
                Nous servons actuellement le marché francophone : France métropolitaine, 
                Corse, Belgique et Suisse. Livraison en 48h après facturation.
              </p>
              <p className="text-sm text-muted-foreground">
                🇫🇷 Produit fabriqué en France
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-black mb-6">
              Une question ? Un projet ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Nous sommes là pour vous accompagner dans l'amélioration de l'hygiène 
              de votre salle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center gap-2">
                Nous contacter
              </Link>
              <Link to="/devis" className="btn-outline-dark inline-flex items-center justify-center gap-2">
                Demander un devis
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
