import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen bg-brand-black text-brand-white overflow-hidden flex items-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-brand-blue-dark/20" />
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center h-full">
          {/* Left content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left animate-fade-in">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-brand-blue-dark/30 rounded-full text-xs md:text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Solution professionnelle
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl mx-auto lg:mx-0">
                Un produit pensé{" "}
                <span className="text-primary">par</span> les gens du combat{" "}
                <span className="text-primary">pour</span> les gens du combat
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Nettoie, désinfecte et enlève les mauvaises odeurs en 5 minutes, 
                sans rendre les surfaces glissantes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                asLink
                to="/solution"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                Découvrir la solution
              </Button>
              <Button
                asLink
                to="/devis"
                variant="outline"
                size="lg"
                className="border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black"
              >
                Demander un devis
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-6 md:pt-8">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 lg:gap-8 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl font-bold text-primary">3-en-1</span>
                  <span>Biocide complet</span>
                </div>
                <div className="hidden sm:block w-px h-6 md:h-8 bg-border/50" />
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl font-bold text-primary">5 min</span>
                  <span>Temps d'action</span>
                </div>
                <div className="hidden md:block w-px h-8 bg-border/50" />
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl font-bold text-primary">🇫🇷</span>
                  <span>Made in France</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Video */}
          <div className="relative order-first lg:order-last flex items-center justify-center h-full animate-fade-in delay-200">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl flex items-center justify-center">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
              
              {/* Video container - aspect ratio vertical pour meilleur alignement */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-glow">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="Présentation du produit Hygiène & Combat"
                >
                  <source src="/videos/product-showcase.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <ScrollArrow targetId="client-logos" variant="dark" />
    </section>
  );
};

export default HeroSection;
