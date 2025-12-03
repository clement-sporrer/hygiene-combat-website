import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-brand-black text-brand-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-brand-blue-dark/20" />
      
      <div className="container mx-auto relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue-dark/30 rounded-full text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Solution professionnelle
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Un produit pensé{" "}
                <span className="text-primary">PAR</span> les gens du combat{" "}
                <span className="text-primary">POUR</span> les gens du combat
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Nettoie, désinfecte et enlève les mauvaises odeurs en 5 minutes, 
                sans rendre les surfaces glissantes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-200">
              <Link to="/solution" className="btn-primary inline-flex items-center justify-center gap-2">
                Découvrir la solution
                <ArrowRight size={18} />
              </Link>
              <Link to="/devis" className="btn-outline-light inline-flex items-center justify-center gap-2">
                Demander un devis
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 animate-fade-up delay-300">
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">3-en-1</span>
                  <span>Biocide complet</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">5 min</span>
                  <span>Temps d'action</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-border" />
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">🇫🇷</span>
                  <span>Made in France</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Video */}
          <div className="relative animate-fade-up delay-100">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
              
              {/* Video container */}
              <div className="relative rounded-2xl overflow-hidden shadow-glow">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/product-showcase.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
